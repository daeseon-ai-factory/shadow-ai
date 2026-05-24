package com.tubeshadow.recording.infrastructure;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

/**
 * Filesystem-backed storage. Layout: <root>/<userId>/<clipId>/<uuid>-<filename>.
 * Per-user subdirectories give us free user-level isolation: if the path resolver
 * tries to escape via "../", {@code resolve} normalises against the root.
 */
@Component
public class LocalRecordingStorage implements RecordingStorage {

    private final Path root;

    public LocalRecordingStorage(@Value("${tubeshadow.recording.storage-dir}") String storageDir) {
        this.root = Paths.get(storageDir).toAbsolutePath().normalize();
    }

    @Override
    public String save(UUID userId, UUID clipId, String filename, InputStream input, long sizeBytes) throws IOException {
        Path dir = root.resolve(userId.toString()).resolve(clipId.toString());
        Files.createDirectories(dir);
        String safeName = sanitize(filename);
        Path target = dir.resolve(UUID.randomUUID() + "-" + safeName);
        Files.copy(input, target, StandardCopyOption.REPLACE_EXISTING);
        return root.relativize(target).toString();
    }

    @Override
    public InputStream load(String filePath) throws IOException {
        Path resolved = resolve(filePath);
        return Files.newInputStream(resolved);
    }

    @Override
    public long size(String filePath) throws IOException {
        return Files.size(resolve(filePath));
    }

    @Override
    public void delete(String filePath) throws IOException {
        Files.deleteIfExists(resolve(filePath));
    }

    private Path resolve(String filePath) {
        Path resolved = root.resolve(filePath).normalize();
        if (!resolved.startsWith(root)) {
            throw new SecurityException("Storage path escape attempt: " + filePath);
        }
        return resolved;
    }

    private static String sanitize(String name) {
        if (name == null || name.isBlank()) return "recording";
        String cleaned = name.replaceAll("[^A-Za-z0-9._-]", "_");
        return cleaned.length() > 60 ? cleaned.substring(0, 60) : cleaned;
    }
}
