package com.tubeshadow.video.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.video.domain.TranscriptSegment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

/**
 * Optional paid/vendor fallback for YouTube captions when AWS egress is blocked by YouTube.
 *
 * <p>Enabled only when {@code SUPADATA_API_KEY} is set. The default mode is {@code native}, which
 * fetches existing captions only. Set {@code SUPADATA_TRANSCRIPT_MODE=auto} to allow Supadata's
 * generated transcript fallback.
 */
@Component
public class SupadataTranscriptClient {

    private static final Logger log = LoggerFactory.getLogger(SupadataTranscriptClient.class);

    private final ObjectMapper objectMapper;
    private final RestClient http;
    private final String apiKey;
    private final String lang;
    private final String mode;
    private final int pollAttempts;
    private final long pollIntervalMs;

    public SupadataTranscriptClient(
            ObjectMapper objectMapper,
            @Value("${tubeshadow.youtube.supadata.api-key:}") String apiKey,
            @Value("${tubeshadow.youtube.supadata.base-url:https://api.supadata.ai/v1}") String baseUrl,
            @Value("${tubeshadow.youtube.supadata.lang:en}") String lang,
            @Value("${tubeshadow.youtube.supadata.mode:native}") String mode,
            @Value("${tubeshadow.youtube.supadata.poll-attempts:20}") int pollAttempts,
            @Value("${tubeshadow.youtube.supadata.poll-interval-ms:1000}") long pollIntervalMs,
            @Value("${tubeshadow.youtube.supadata.timeout-seconds:45}") long timeoutSeconds) {
        this.objectMapper = objectMapper;
        this.apiKey = apiKey;
        this.lang = lang;
        this.mode = mode;
        this.pollAttempts = Math.max(1, pollAttempts);
        this.pollIntervalMs = Math.max(100, pollIntervalMs);

        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(10));
        factory.setReadTimeout(Duration.ofSeconds(timeoutSeconds));
        this.http = RestClient.builder()
                .requestFactory(factory)
                .baseUrl(baseUrl)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public boolean isConfigured() {
        return apiKey != null && !apiKey.isBlank();
    }

    public List<TranscriptSegment> fetch(String videoId) {
        if (!isConfigured()) {
            throw new NoTranscriptAvailableException(videoId);
        }

        String videoUrl = "https://www.youtube.com/watch?v=" + videoId;
        try {
            ResponseEntity<String> response = http.get()
                    .uri(uri -> uri.path("/transcript")
                            .queryParam("url", videoUrl)
                            .queryParam("lang", lang)
                            .queryParam("text", false)
                            .queryParam("mode", mode)
                            .build())
                    .header("x-api-key", apiKey)
                    .retrieve()
                    .toEntity(String.class);

            JsonNode root = objectMapper.readTree(response.getBody());
            if (response.getStatusCode().value() == 202 || root.hasNonNull("jobId")) {
                return pollJob(videoId, root.path("jobId").asText(""));
            }
            return parseCompleted(videoId, root);
        } catch (NoTranscriptAvailableException ex) {
            throw ex;
        } catch (Exception ex) {
            log.info("Supadata transcript fetch failed for {}: {}", videoId, ex.getMessage());
            throw new NoTranscriptAvailableException(videoId);
        }
    }

    private List<TranscriptSegment> pollJob(String videoId, String jobId) throws Exception {
        if (jobId == null || jobId.isBlank()) {
            throw new NoTranscriptAvailableException(videoId);
        }
        for (int i = 0; i < pollAttempts; i++) {
            if (i > 0) {
                Thread.sleep(pollIntervalMs);
            }
            ResponseEntity<String> response = http.get()
                    .uri("/transcript/{jobId}", jobId)
                    .header("x-api-key", apiKey)
                    .retrieve()
                    .toEntity(String.class);
            JsonNode root = objectMapper.readTree(response.getBody());
            String status = root.path("status").asText("");
            if ("completed".equalsIgnoreCase(status)) {
                return parseCompleted(videoId, root);
            }
            if ("failed".equalsIgnoreCase(status)) {
                throw new NoTranscriptAvailableException(videoId);
            }
        }
        log.info("Supadata transcript job did not complete for {} after {} polls", videoId, pollAttempts);
        throw new NoTranscriptAvailableException(videoId);
    }

    private List<TranscriptSegment> parseCompleted(String videoId, JsonNode root) {
        JsonNode content = root.path("content");
        if (!content.isArray()) {
            throw new NoTranscriptAvailableException(videoId);
        }

        List<TranscriptSegment> segments = new ArrayList<>(content.size());
        for (JsonNode chunk : content) {
            String text = chunk.path("text").asText("").replaceAll("\\s+", " ").trim();
            long startMs = chunk.path("offset").asLong(-1);
            long durationMs = chunk.path("duration").asLong(0);
            if (text.isEmpty() || startMs < 0 || durationMs <= 0) {
                continue;
            }
            segments.add(new TranscriptSegment(startMs, startMs + durationMs, text));
        }
        if (segments.isEmpty()) {
            throw new NoTranscriptAvailableException(videoId);
        }
        return segments;
    }
}
