package com.tubeshadow.recording.infrastructure;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

/**
 * Storage strategy for recording binaries. LocalRecordingStorage is the v0 implementation;
 * an S3 (or compatible) variant can implement this interface later without touching callers.
 */
public interface RecordingStorage {

    /**
     * Persist the bytes and return an opaque storage path that {@link #load} / {@link #delete}
     * can later resolve. Implementations partition by userId/clipId for isolation.
     */
    String save(UUID userId, UUID clipId, String filename, InputStream input, long sizeBytes) throws IOException;

    InputStream load(String filePath) throws IOException;

    long size(String filePath) throws IOException;

    void delete(String filePath) throws IOException;
}
