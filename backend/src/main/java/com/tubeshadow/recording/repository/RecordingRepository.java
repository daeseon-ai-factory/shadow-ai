package com.tubeshadow.recording.repository;

import com.tubeshadow.recording.domain.Recording;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RecordingRepository extends JpaRepository<Recording, UUID> {

    List<Recording> findByClipIdAndUserIdOrderByCreatedAtAsc(UUID clipId, UUID userId);

    Optional<Recording> findByIdAndUserId(UUID id, UUID userId);

    /** All of a user's recordings — used to purge their stored audio files on account deletion. */
    List<Recording> findByUserId(UUID userId);
}
