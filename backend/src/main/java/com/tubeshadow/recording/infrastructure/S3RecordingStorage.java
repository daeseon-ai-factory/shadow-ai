package com.tubeshadow.recording.infrastructure;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

/**
 * S3-backed recording storage. Key layout matches the local layout (userId/clipId/uuid-name)
 * so a future bulk migration is just `aws s3 sync`. Selected by setting
 * {@code tubeshadow.recording.storage=s3} in application-prod.yml.
 */
@Component
@ConditionalOnProperty(name = "tubeshadow.recording.storage", havingValue = "s3")
public class S3RecordingStorage implements RecordingStorage {

    private final S3Client s3;
    private final String bucket;

    public S3RecordingStorage(S3Client s3,
                              @Value("${tubeshadow.recording.s3.bucket}") String bucket) {
        this.s3 = s3;
        this.bucket = bucket;
    }

    @Override
    public String save(UUID userId, UUID clipId, String filename, InputStream input, long sizeBytes) throws IOException {
        String safeName = sanitize(filename);
        String key = String.format("%s/%s/%s-%s", userId, clipId, UUID.randomUUID(), safeName);
        s3.putObject(
                PutObjectRequest.builder().bucket(bucket).key(key).contentLength(sizeBytes).build(),
                RequestBody.fromInputStream(input, sizeBytes)
        );
        return key;
    }

    @Override
    public InputStream load(String filePath) throws IOException {
        try {
            byte[] bytes = s3.getObject(
                    GetObjectRequest.builder().bucket(bucket).key(filePath).build(),
                    ResponseTransformer.toBytes()
            ).asByteArray();
            return new ByteArrayInputStream(bytes);
        } catch (NoSuchKeyException ex) {
            throw new IOException("Recording not found in S3: " + filePath, ex);
        }
    }

    @Override
    public long size(String filePath) throws IOException {
        try {
            return s3.headObject(HeadObjectRequest.builder().bucket(bucket).key(filePath).build())
                    .contentLength();
        } catch (NoSuchKeyException ex) {
            throw new IOException("Recording not found in S3: " + filePath, ex);
        }
    }

    @Override
    public void delete(String filePath) throws IOException {
        s3.deleteObject(DeleteObjectRequest.builder().bucket(bucket).key(filePath).build());
    }

    private static String sanitize(String name) {
        if (name == null || name.isBlank()) return "recording";
        String cleaned = name.replaceAll("[^A-Za-z0-9._-]", "_");
        return cleaned.length() > 60 ? cleaned.substring(0, 60) : cleaned;
    }
}
