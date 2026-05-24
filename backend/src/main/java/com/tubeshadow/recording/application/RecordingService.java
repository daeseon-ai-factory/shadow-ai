package com.tubeshadow.recording.application;

import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.common.exception.ForbiddenException;
import com.tubeshadow.common.exception.NotFoundException;
import com.tubeshadow.recording.domain.Recording;
import com.tubeshadow.recording.infrastructure.RecordingStorage;
import com.tubeshadow.recording.repository.RecordingRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class RecordingService {

    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "audio/webm", "audio/ogg", "audio/mp4", "audio/mpeg", "audio/wav", "audio/x-wav");

    private final RecordingRepository recordingRepository;
    private final ClipRepository clipRepository;
    private final RecordingStorage storage;
    private final long maxBytes;

    public RecordingService(RecordingRepository recordingRepository,
                            ClipRepository clipRepository,
                            RecordingStorage storage,
                            @Value("${tubeshadow.recording.max-bytes}") long maxBytes) {
        this.recordingRepository = recordingRepository;
        this.clipRepository = clipRepository;
        this.storage = storage;
        this.maxBytes = maxBytes;
    }

    @Transactional
    public Recording upload(UUID userId, UUID clipId, MultipartFile file, long durationMs) {
        if (file == null || file.isEmpty()) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "EMPTY_FILE", "녹음 파일이 비어 있습니다");
        }
        if (file.getSize() > maxBytes) {
            throw new BusinessException(HttpStatus.PAYLOAD_TOO_LARGE, "FILE_TOO_LARGE",
                    "파일 크기가 " + (maxBytes / 1024 / 1024) + "MB를 초과합니다");
        }
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new BusinessException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "UNSUPPORTED_FORMAT",
                    "지원하지 않는 오디오 형식입니다: " + contentType);
        }
        clipRepository.findByIdAndUserId(clipId, userId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "클립이 없습니다"));

        String filename = file.getOriginalFilename();
        String storedPath;
        try (InputStream in = file.getInputStream()) {
            storedPath = storage.save(userId, clipId, filename != null ? filename : "recording.webm", in, file.getSize());
        } catch (IOException ex) {
            throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "STORAGE_FAILED",
                    "녹음 저장 실패: " + ex.getMessage());
        }

        Recording recording = Recording.createNew(userId, clipId, storedPath, contentType, durationMs, file.getSize());
        return recordingRepository.save(recording);
    }

    @Transactional(readOnly = true)
    public List<Recording> listByClip(UUID userId, UUID clipId) {
        clipRepository.findByIdAndUserId(clipId, userId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "클립이 없습니다"));
        return recordingRepository.findByClipIdAndUserIdOrderByCreatedAtAsc(clipId, userId);
    }

    @Transactional(readOnly = true)
    public Recording getOwned(UUID userId, UUID recordingId) {
        return recordingRepository.findByIdAndUserId(recordingId, userId)
                .orElseThrow(() -> new ForbiddenException("RECORDING_NOT_OWNED", "본인 녹음만 접근 가능합니다"));
    }

    public InputStream openAudioStream(Recording recording) {
        try {
            return storage.load(recording.getFilePath());
        } catch (IOException ex) {
            throw new BusinessException(HttpStatus.NOT_FOUND, "AUDIO_NOT_FOUND",
                    "녹음 파일을 읽을 수 없습니다");
        }
    }

    @Transactional
    public void delete(UUID userId, UUID recordingId) {
        Recording recording = recordingRepository.findById(recordingId)
                .orElseThrow(() -> new NotFoundException("RECORDING_NOT_FOUND", "녹음이 없습니다"));
        if (!recording.getUserId().equals(userId)) {
            throw new ForbiddenException("RECORDING_NOT_OWNED", "본인 녹음만 삭제 가능합니다");
        }
        try {
            storage.delete(recording.getFilePath());
        } catch (IOException ex) {
            // Log-and-continue: we still remove the DB row so the user is not stuck with an orphan reference.
            org.slf4j.LoggerFactory.getLogger(RecordingService.class)
                    .warn("Failed to delete recording file {}: {}", recording.getFilePath(), ex.getMessage());
        }
        recordingRepository.delete(recording);
    }
}
