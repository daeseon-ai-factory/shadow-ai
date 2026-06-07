package com.tubeshadow.library.application;

import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.library.api.dto.LibraryVideoPageResponse;
import com.tubeshadow.library.api.dto.LibraryVideoResponse;
import com.tubeshadow.library.domain.LibraryVideo;
import com.tubeshadow.library.repository.LibraryVideoRepository;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.repository.VideoRepository;
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
public class LibraryVideoService {

    private final LibraryVideoRepository libraryRepository;
    private final VideoRepository videoRepository;
    private final ClipRepository clipRepository;

    public LibraryVideoService(LibraryVideoRepository libraryRepository,
                               VideoRepository videoRepository,
                               ClipRepository clipRepository) {
        this.libraryRepository = libraryRepository;
        this.videoRepository = videoRepository;
        this.clipRepository = clipRepository;
    }

    /**
     * Add a video to the user's library. Idempotent: re-saving an already-saved video is a no-op
     * (the unique constraint also guards against a concurrent double-save). Called automatically on
     * every import so the user never has to think about "saving".
     */
    @Transactional
    public void save(UUID userId, UUID videoId) {
        if (!libraryRepository.existsByUserIdAndVideoId(userId, videoId)) {
            try {
                libraryRepository.save(LibraryVideo.createNew(userId, videoId));
            } catch (org.springframework.dao.DataIntegrityViolationException raceLost) {
                // Concurrent save of the same (user, video) — the other request won; nothing to do.
            }
        }
    }

    @Transactional
    public void remove(UUID userId, UUID videoId) {
        libraryRepository.deleteByUserIdAndVideoId(userId, videoId);
    }

    @Transactional(readOnly = true)
    public LibraryVideoPageResponse list(UUID userId, int page, int size) {
        Page<LibraryVideo> result =
                libraryRepository.findByUserIdOrderByCreatedAtDesc(userId, PageRequest.of(page, size));

        // Batch-load the videos for this page → avoids N+1.
        List<UUID> videoIds = result.getContent().stream()
                .map(LibraryVideo::getVideoId)
                .distinct()
                .toList();
        Map<UUID, Video> videos = videoRepository.findAllById(videoIds).stream()
                .collect(Collectors.toMap(Video::getId, Function.identity()));

        List<LibraryVideoResponse> items = result.getContent().stream()
                // A video could in theory be missing (deleted); skip rather than NPE.
                .filter(lv -> videos.containsKey(lv.getVideoId()))
                .map(lv -> LibraryVideoResponse.of(
                        videos.get(lv.getVideoId()),
                        lv.getCreatedAt(),
                        clipRepository.countByUserIdAndVideoId(userId, lv.getVideoId())))
                .toList();
        return new LibraryVideoPageResponse(items, result.getTotalElements(), page, size);
    }
}
