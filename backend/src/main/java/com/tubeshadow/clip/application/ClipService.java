package com.tubeshadow.clip.application;

import com.tubeshadow.clip.api.dto.ClipCreateRequest;
import com.tubeshadow.clip.api.dto.ClipPageResponse;
import com.tubeshadow.clip.api.dto.ClipResponse;
import com.tubeshadow.clip.api.dto.ClipUpdateRequest;
import com.tubeshadow.clip.domain.Clip;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.common.exception.ForbiddenException;
import com.tubeshadow.common.exception.NotFoundException;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.repository.VideoRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ClipService {

    private final ClipRepository clipRepository;
    private final VideoRepository videoRepository;
    private final ApplicationEventPublisher events;

    public ClipService(ClipRepository clipRepository,
                       VideoRepository videoRepository,
                       ApplicationEventPublisher events) {
        this.clipRepository = clipRepository;
        this.videoRepository = videoRepository;
        this.events = events;
    }

    @Transactional
    public ClipResponse create(UUID userId, ClipCreateRequest req) {
        Video video = videoRepository.findById(req.videoId())
                .orElseThrow(() -> new NotFoundException("VIDEO_NOT_FOUND", "영상을 찾을 수 없습니다"));

        Clip clip = Clip.createNew(userId, video.getId(), req.startMs(), req.endMs(), req.name().trim(),
                req.tags() == null ? List.of() : req.tags());
        clip.attachTranscript(TranscriptSlicer.slice(video.getTranscriptSegments(), req.startMs(), req.endMs()));

        Clip saved = clipRepository.save(clip);
        events.publishEvent(new ClipCreatedEvent(saved.getId(), saved.getUserId(), saved.getTranscript()));
        return ClipResponse.from(saved, video);
    }

    @Transactional(readOnly = true)
    public ClipPageResponse list(UUID userId, String query, String tag, String sort, int page, int size) {
        Page<Clip> result = clipRepository.search(
                userId, escapeLike(query), tag, sort,
                PageRequest.of(page, size));

        // Batch video lookup → avoids N+1
        List<UUID> videoIds = result.getContent().stream()
                .map(Clip::getVideoId)
                .distinct()
                .toList();
        Map<UUID, Video> videos = videoRepository.findAllById(videoIds).stream()
                .collect(Collectors.toMap(Video::getId, Function.identity()));

        List<ClipResponse> items = result.getContent().stream()
                .map(c -> ClipResponse.from(c, requireVideo(c.getVideoId(), videos)))
                .toList();
        return new ClipPageResponse(items, result.getTotalElements(), page, size);
    }

    @Transactional(readOnly = true)
    public ClipResponse get(UUID userId, UUID clipId) {
        Clip clip = clipRepository.findByIdAndUserId(clipId, userId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "클립을 찾을 수 없습니다"));
        return ClipResponse.from(clip, requireVideoById(clip.getVideoId()));
    }

    @Transactional
    public ClipResponse update(UUID userId, UUID clipId, ClipUpdateRequest req) {
        Clip clip = clipRepository.findByIdAndUserId(clipId, userId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "클립을 찾을 수 없습니다"));

        boolean transcriptChanged = false;
        if (req.name() != null && !req.name().isBlank()) {
            clip.rename(req.name().trim());
        }
        if (req.tags() != null) {
            clip.updateTags(req.tags());
        }
        if (req.transcript() != null && !req.transcript().equals(clip.getTranscript())) {
            clip.attachTranscript(req.transcript());
            transcriptChanged = true;
        }
        if (req.note() != null) {
            clip.updateNote(req.note());
        }

        if (transcriptChanged) {
            // User edited the transcript → re-trigger analysis pipeline.
            events.publishEvent(new ClipCreatedEvent(clip.getId(), clip.getUserId(), clip.getTranscript()));
        }
        return ClipResponse.from(clip, requireVideoById(clip.getVideoId()));
    }

    @Transactional(readOnly = true)
    public List<String> listUserTags(UUID userId) {
        return clipRepository.findByUserId(userId, PageRequest.of(0, 1000))
                .getContent().stream()
                .flatMap(c -> c.getTags().stream())
                .filter(t -> t != null && !t.isBlank())
                .distinct()
                .sorted()
                .toList();
    }

    @Transactional
    public void delete(UUID userId, UUID clipId) {
        Clip clip = clipRepository.findById(clipId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "클립을 찾을 수 없습니다"));
        if (!clip.getUserId().equals(userId)) {
            throw new ForbiddenException("CLIP_NOT_OWNED", "해당 클립의 소유자가 아닙니다");
        }
        clipRepository.delete(clip);
        events.publishEvent(new ClipDeletedEvent(clipId, userId));
    }

    /**
     * Escape LIKE metacharacters so a user's literal {@code %}, {@code _}, or {@code \}
     * in the search box matches literally instead of acting as a SQL wildcard. Pairs with
     * the {@code ESCAPE '\'} clause in {@link ClipRepository#search}. Backslash is escaped
     * first so it doesn't double-escape the metacharacters added after it.
     */
    private static String escapeLike(String raw) {
        if (raw == null) return null;
        return raw.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_");
    }

    private Video requireVideoById(UUID videoId) {
        return videoRepository.findById(videoId)
                .orElseThrow(() -> new NotFoundException("VIDEO_NOT_FOUND", "영상을 찾을 수 없습니다"));
    }

    private Video requireVideo(UUID videoId, Map<UUID, Video> cache) {
        Video v = cache.get(videoId);
        if (v != null) return v;
        return requireVideoById(videoId);
    }
}
