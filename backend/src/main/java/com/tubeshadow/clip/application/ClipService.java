package com.tubeshadow.clip.application;

import com.tubeshadow.clip.api.dto.ClipCreateRequest;
import com.tubeshadow.clip.api.dto.ClipPageResponse;
import com.tubeshadow.clip.api.dto.ClipResponse;
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

import java.util.UUID;

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
                req.tags() == null ? java.util.List.of() : req.tags());
        clip.attachTranscript(TranscriptSlicer.slice(video.getTranscriptSegments(), req.startMs(), req.endMs()));

        Clip saved = clipRepository.save(clip);
        events.publishEvent(new ClipCreatedEvent(saved.getId(), saved.getUserId(), saved.getTranscript()));
        return ClipResponse.from(saved, video);
    }

    @Transactional(readOnly = true)
    public ClipPageResponse list(UUID userId, String query, String tag, int page, int size) {
        Page<Clip> result = clipRepository.search(
                userId, query, tag,
                PageRequest.of(page, size));
        return new ClipPageResponse(
                result.getContent().stream()
                        .map(c -> ClipResponse.from(c, requireVideo(c.getVideoId())))
                        .toList(),
                result.getTotalElements(),
                page,
                size
        );
    }

    @Transactional(readOnly = true)
    public ClipResponse get(UUID userId, UUID clipId) {
        Clip clip = clipRepository.findByIdAndUserId(clipId, userId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "클립을 찾을 수 없습니다"));
        return ClipResponse.from(clip, requireVideo(clip.getVideoId()));
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

    private Video requireVideo(UUID videoId) {
        return videoRepository.findById(videoId)
                .orElseThrow(() -> new NotFoundException("VIDEO_NOT_FOUND", "영상을 찾을 수 없습니다"));
    }
}
