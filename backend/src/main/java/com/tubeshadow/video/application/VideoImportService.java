package com.tubeshadow.video.application;

import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.video.domain.TranscriptSegment;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.infrastructure.NoTranscriptAvailableException;
import com.tubeshadow.video.infrastructure.YoutubeMetadataClient;
import com.tubeshadow.video.infrastructure.YoutubeProbe;
import com.tubeshadow.video.infrastructure.YoutubeTranscriptClient;
import com.tubeshadow.video.repository.VideoRepository;
import com.tubeshadow.video.util.YoutubeUrlParser;
import org.springframework.dao.DataIntegrityViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class VideoImportService {

    private static final Logger log = LoggerFactory.getLogger(VideoImportService.class);

    private final VideoRepository videoRepository;
    private final YoutubeMetadataClient metadataClient;
    private final YoutubeTranscriptClient transcriptClient;
    private final YoutubeProbe probe;

    public VideoImportService(VideoRepository videoRepository,
                              YoutubeMetadataClient metadataClient,
                              YoutubeTranscriptClient transcriptClient,
                              YoutubeProbe probe) {
        this.videoRepository = videoRepository;
        this.metadataClient = metadataClient;
        this.transcriptClient = transcriptClient;
        this.probe = probe;
    }

    /**
     * Deliberately NOT {@code @Transactional}: this method makes 2–3 blocking HTTP calls
     * (oEmbed metadata, yt-dlp probe, transcript fetch) that can take seconds. Wrapping them
     * in a transaction would pin a Hikari connection for the whole network round-trip. Instead
     * the network work runs with no transaction, and each {@code videoRepository} find/save
     * runs in its own short transaction (Spring Data manages them). Video has no lazy
     * associations (transcript is a JSONB column), so the detached entity returned by
     * {@code findByYoutubeId} is safe to mutate and re-save in {@link #recoverIfNeeded}.
     * Do not add {@code @Transactional} back here.
     */
    public Video importByUrl(String urlOrId) {
        return importByUrl(urlOrId, null, null);
    }

    /**
     * @param clientSegments transcript fetched on the user's DEVICE (mobile). When present we use
     *   it directly and skip yt-dlp — this is how the mobile app bypasses YouTube's datacenter-IP
     *   block (the phone fetches on a residential IP; the server, on AWS, gets blocked). Web passes null.
     * @param clientTitle    title the device read off the watch page; used only if oEmbed fails.
     */
    public Video importByUrl(String urlOrId, List<TranscriptSegment> clientSegments, String clientTitle) {
        String videoId = YoutubeUrlParser.extractVideoId(urlOrId)
                .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST,
                        "INVALID_YOUTUBE_URL", "유효한 YouTube URL이 아닙니다"));

        return videoRepository.findByYoutubeId(videoId)
                .map(existing -> recoverIfNeeded(existing, clientSegments))
                .orElseGet(() -> fetchAndPersistRaceSafe(videoId, clientSegments, clientTitle));
    }

    /**
     * Cache-fill that survives a concurrent first import. {@code videos.youtube_id} is globally
     * UNIQUE (the table is a shared cache, not per-user), so if two users import the same NEW video
     * at the same moment both miss the cache and both try to insert — the loser hits a unique
     * violation. Instead of 500-ing, we re-read the row the winner just wrote and heal it. At 10M
     * users on a popular video this race is routine, not exceptional.
     */
    private Video fetchAndPersistRaceSafe(String videoId, List<TranscriptSegment> clientSegments, String clientTitle) {
        try {
            return fetchAndPersist(videoId, clientSegments, clientTitle);
        } catch (DataIntegrityViolationException raceLost) {
            log.info("Concurrent import race for {} — reusing the row the other request inserted", videoId);
            return videoRepository.findByYoutubeId(videoId)
                    .map(existing -> recoverIfNeeded(existing, clientSegments))
                    .orElseThrow(() -> raceLost); // unique violation but no row = a different constraint; surface it
        }
    }

    /**
     * Same URL re-import = self-heal:
     *  - missing transcript → try fetch
     *  - missing dimensions → run probe
     * Neither call touches metadata (oEmbed) — that's set once at first import.
     */
    private Video recoverIfNeeded(Video existing, List<TranscriptSegment> clientSegments) {
        boolean changed = false;
        if (existing.getTranscriptStatus() != Video.TranscriptStatus.READY) {
            if (clientSegments != null && !clientSegments.isEmpty()) {
                // A device (mobile, residential IP) always gets to heal the cache — it can fetch
                // captions the server can't, even for a row we'd marked UNAVAILABLE from AWS.
                existing.attachTranscript(clientSegments);
                log.info("Attached client transcript for {} ({} segments)",
                        existing.getYoutubeId(), clientSegments.size());
                changed = true;
            } else if (existing.getTranscriptStatus() == Video.TranscriptStatus.PENDING) {
                // Only server-scrape when we've NEVER resolved this video. A row already marked
                // UNAVAILABLE means we tried and YouTube had no captions (or blocked us) — re-scraping
                // it on every re-import would hammer YouTube and invite rate-limits. At 10M users a
                // popular no-caption video would otherwise be re-scraped endlessly.
                try {
                    List<TranscriptSegment> segments = transcriptClient.fetch(existing.getYoutubeId());
                    if (!segments.isEmpty()) {
                        existing.attachTranscript(segments);
                        log.info("Recovered transcript for {} ({} segments)", existing.getYoutubeId(), segments.size());
                        changed = true;
                    } else {
                        existing.markTranscriptUnavailable();
                        changed = true;
                    }
                } catch (NoTranscriptAvailableException ex) {
                    log.debug("First server fetch found no transcript for {}", existing.getYoutubeId());
                    existing.markTranscriptUnavailable();
                    changed = true;
                }
            }
        }
        if (existing.getWidthPx() == null || existing.getHeightPx() == null) {
            var maybeMeta = probe.probe(existing.getYoutubeId());
            if (maybeMeta.isPresent()) {
                var meta = maybeMeta.get();
                existing.applyDimensions(meta.widthPx(), meta.heightPx(), meta.durationSeconds());
                log.info("Recovered dimensions for {}: {}×{}",
                        existing.getYoutubeId(), meta.widthPx(), meta.heightPx());
                changed = true;
            }
        }
        return changed ? videoRepository.save(existing) : existing;
    }

    private Video fetchAndPersist(String youtubeId, List<TranscriptSegment> clientSegments, String clientTitle) {
        // Assigned once (so the lambda below can capture it as effectively final).
        Video video = createWithMetadata(youtubeId, clientTitle);

        // Probe is best-effort; if it fails the video still saves with unknown orientation.
        probe.probe(youtubeId).ifPresent(m ->
                video.applyDimensions(m.widthPx(), m.heightPx(), m.durationSeconds()));

        if (clientSegments != null && !clientSegments.isEmpty()) {
            // Device-fetched transcript (mobile, residential IP) — store it, skip yt-dlp.
            video.attachTranscript(clientSegments);
            log.info("Imported {} with client transcript ({} segments)", youtubeId, clientSegments.size());
        } else {
            try {
                List<TranscriptSegment> segments = transcriptClient.fetch(youtubeId);
                if (segments.isEmpty()) {
                    video.markTranscriptUnavailable();
                } else {
                    video.attachTranscript(segments);
                }
            } catch (NoTranscriptAvailableException ex) {
                log.info("No transcript for {}: {}", youtubeId, ex.getMessage());
                video.markTranscriptUnavailable();
            }
        }

        return videoRepository.save(video);
    }

    /**
     * Build the Video shell with metadata. oEmbed (title/thumbnail) is a light public endpoint that
     * usually works even from AWS; if it fails and the device supplied a title, fall back to that
     * rather than aborting the whole import.
     */
    private Video createWithMetadata(String youtubeId, String clientTitle) {
        try {
            YoutubeMetadataClient.YoutubeMetadata meta = metadataClient.fetch(youtubeId);
            Video video = Video.createNew(youtubeId, meta.title());
            video.applyMetadata(meta.authorName(), null, meta.thumbnailUrl());
            return video;
        } catch (RuntimeException ex) {
            if (clientTitle != null && !clientTitle.isBlank()) {
                log.info("oEmbed failed for {} ({}); using device-provided title", youtubeId, ex.getMessage());
                return Video.createNew(youtubeId, clientTitle);
            }
            throw ex;
        }
    }

    @Transactional(readOnly = true)
    public Video getOrThrow(UUID id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "VIDEO_NOT_FOUND", "영상이 없습니다"));
    }
}
