package com.tubeshadow.video.application;

import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.video.domain.TranscriptSegment;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.infrastructure.NoTranscriptAvailableException;
import com.tubeshadow.video.infrastructure.YoutubeMetadataClient;
import com.tubeshadow.video.infrastructure.YoutubeTranscriptClient;
import com.tubeshadow.video.repository.VideoRepository;
import com.tubeshadow.video.util.YoutubeUrlParser;
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

    public VideoImportService(VideoRepository videoRepository,
                              YoutubeMetadataClient metadataClient,
                              YoutubeTranscriptClient transcriptClient) {
        this.videoRepository = videoRepository;
        this.metadataClient = metadataClient;
        this.transcriptClient = transcriptClient;
    }

    @Transactional
    public Video importByUrl(String urlOrId) {
        String videoId = YoutubeUrlParser.extractVideoId(urlOrId)
                .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST,
                        "INVALID_YOUTUBE_URL", "유효한 YouTube URL이 아닙니다"));

        return videoRepository.findByYoutubeId(videoId)
                .orElseGet(() -> fetchAndPersist(videoId));
    }

    private Video fetchAndPersist(String youtubeId) {
        YoutubeMetadataClient.YoutubeMetadata meta = metadataClient.fetch(youtubeId);
        Video video = Video.createNew(youtubeId, meta.title());
        video.applyMetadata(meta.authorName(), null, meta.thumbnailUrl());

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

        return videoRepository.save(video);
    }

    @Transactional(readOnly = true)
    public Video getOrThrow(UUID id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "VIDEO_NOT_FOUND", "영상이 없습니다"));
    }
}
