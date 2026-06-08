package com.tubeshadow.practice.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.common.exception.BusinessException;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import java.time.Duration;

/**
 * Speech-to-text via Groq-hosted Whisper large-v3 (OpenAI-compatible multipart endpoint). Whisper
 * is far more accurate on developer jargon than the on-device iOS recognizer; the {@code prompt}
 * biases it further toward CS/backend vocabulary. Provider-swappable — point base-url/model at
 * OpenAI's {@code /v1/audio/transcriptions} (gpt-4o-transcribe) to upgrade with the same code.
 */
@Component
@EnableConfigurationProperties(GroqProperties.class)
public class GroqTranscriptionClient {

    /** Whisper prompt: a hint listing the jargon so it stops hearing "deque" as "deck". */
    static final String DEV_PROMPT =
            "A software engineer explaining code in English in a technical interview. Common terms: "
            + "idempotency, idempotent, HashMap, HashSet, ArrayList, deque, ArrayDeque, PriorityQueue, trie, "
            + "BFS, DFS, binary search, dynamic programming, backtracking, O of one, O of n, big O, "
            + "Strategy pattern, Factory, Singleton, Observer, dependency injection, optimistic locking, "
            + "pessimistic locking, transaction, isolation level, race condition, deadlock, unique constraint, "
            + "upsert, indexing, throughput, latency, deduplication, dead letter queue, source of truth, "
            + "reconciliation, state machine, Redis, Postgres, Kafka, microservice, endpoint, LRU cache.";

    private final GroqProperties props;
    private final ObjectMapper objectMapper;
    private final RestClient http;

    public GroqTranscriptionClient(GroqProperties props, ObjectMapper objectMapper) {
        this.props = props;
        this.objectMapper = objectMapper;
        // Transcription is one synchronous call; bound it so a stalled provider can't hang the request.
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(10));
        factory.setReadTimeout(Duration.ofSeconds(60));
        this.http = RestClient.builder().requestFactory(factory).baseUrl(props.baseUrl()).build();
    }

    public boolean isConfigured() {
        return props.apiKey() != null && !props.apiKey().isBlank();
    }

    /** Transcribe the audio bytes to English text, biased toward dev vocabulary. */
    public String transcribe(byte[] audio, String filename) {
        if (!isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "TRANSCRIBE_NOT_CONFIGURED",
                    "음성 전사가 설정되지 않았습니다 (Groq API 키 필요)");
        }
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(audio) {
            @Override
            public String getFilename() {
                return filename == null || filename.isBlank() ? "audio.m4a" : filename;
            }
        });
        body.add("model", props.model());
        body.add("response_format", "json");
        body.add("language", "en");
        body.add("temperature", "0");
        body.add("prompt", DEV_PROMPT);

        String raw;
        try {
            raw = http.post()
                    .uri("/openai/v1/audio/transcriptions")
                    .header("Authorization", "Bearer " + props.apiKey())
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(body)
                    .retrieve()
                    .body(String.class);
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "TRANSCRIBE_CALL_FAILED",
                    "음성 전사 호출 실패: " + ex.getMessage());
        }
        try {
            return objectMapper.readTree(raw).path("text").asText("").trim();
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "TRANSCRIBE_PARSE_FAILED",
                    "음성 전사 응답 파싱 실패");
        }
    }
}
