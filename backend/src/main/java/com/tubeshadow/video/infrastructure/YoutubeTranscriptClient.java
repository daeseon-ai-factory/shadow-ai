package com.tubeshadow.video.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.video.domain.TranscriptSegment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Best-effort YouTube transcript fetcher.
 * <p>
 * Strategy: GET the watch HTML, locate {@code ytInitialPlayerResponse} JSON, walk to
 * {@code captions.playerCaptionsTracklistRenderer.captionTracks}, pick the best English
 * track (manual > ASR), then fetch its {@code baseUrl} as {@code fmt=json3} which gives
 * structured timed text suitable for clip slicing.
 * <p>
 * YouTube changes this surface periodically; we treat failures (no JSON, no English
 * track, or fetch error) as {@link NoTranscriptAvailableException}.
 */
@Component
public class YoutubeTranscriptClient {

    private static final Logger log = LoggerFactory.getLogger(YoutubeTranscriptClient.class);

    private static final Pattern PLAYER_RESPONSE = Pattern.compile(
            "ytInitialPlayerResponse\\s*=\\s*(\\{.+?\\})\\s*;\\s*(?:var|window|\\n|<)");

    private final RestClient http;
    private final ObjectMapper objectMapper;

    public YoutubeTranscriptClient(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.http = RestClient.builder()
                .defaultHeader("User-Agent", "Mozilla/5.0 (compatible; TubeShadow/0.0.1)")
                .defaultHeader("Accept-Language", "en-US,en;q=0.9")
                .build();
    }

    public List<TranscriptSegment> fetch(String videoId) {
        String watchUrl = "https://www.youtube.com/watch?v=" + videoId + "&hl=en";
        String html;
        try {
            html = http.get().uri(URI.create(watchUrl)).retrieve().body(String.class);
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "YOUTUBE_FETCH_FAILED",
                    "YouTube watch 페이지 조회 실패: " + ex.getMessage());
        }
        if (html == null || html.isEmpty()) {
            throw new NoTranscriptAvailableException(videoId);
        }

        JsonNode playerResponse = extractPlayerResponse(html)
                .orElseThrow(() -> {
                    log.warn("ytInitialPlayerResponse not found for {}", videoId);
                    return new NoTranscriptAvailableException(videoId);
                });

        String baseUrl = pickTrackBaseUrl(playerResponse)
                .orElseThrow(() -> new NoTranscriptAvailableException(videoId));

        String json3Url = baseUrl.contains("fmt=") ? baseUrl : baseUrl + "&fmt=json3";
        String json3;
        try {
            json3 = http.get().uri(URI.create(decodeAmps(json3Url))).retrieve().body(String.class);
        } catch (Exception ex) {
            log.warn("Caption fetch failed for {}: {}", videoId, ex.getMessage());
            throw new NoTranscriptAvailableException(videoId);
        }
        if (json3 == null || json3.isBlank()) {
            throw new NoTranscriptAvailableException(videoId);
        }
        return parseJson3(json3);
    }

    private Optional<JsonNode> extractPlayerResponse(String html) {
        Matcher m = PLAYER_RESPONSE.matcher(html);
        if (!m.find()) return Optional.empty();
        String jsonPayload = m.group(1);
        try {
            return Optional.of(objectMapper.readTree(jsonPayload));
        } catch (Exception ex) {
            return Optional.empty();
        }
    }

    private Optional<String> pickTrackBaseUrl(JsonNode playerResponse) {
        JsonNode tracks = playerResponse
                .path("captions")
                .path("playerCaptionsTracklistRenderer")
                .path("captionTracks");
        if (!tracks.isArray() || tracks.isEmpty()) return Optional.empty();

        List<JsonNode> candidates = new ArrayList<>();
        tracks.forEach(candidates::add);

        candidates.sort(Comparator
                .comparingInt((JsonNode t) -> "en".equals(languageCode(t)) ? 0 : 1)
                .thenComparingInt(t -> "asr".equals(t.path("kind").asText("")) ? 1 : 0));

        return Optional.of(candidates.get(0).path("baseUrl").asText());
    }

    private static String languageCode(JsonNode track) {
        String lang = track.path("languageCode").asText("");
        return lang.toLowerCase().startsWith("en") ? "en" : lang;
    }

    private List<TranscriptSegment> parseJson3(String json3) {
        try {
            JsonNode root = objectMapper.readTree(json3);
            JsonNode events = root.path("events");
            if (!events.isArray()) return List.of();

            List<TranscriptSegment> out = new ArrayList<>(events.size());
            for (JsonNode event : events) {
                if (event.path("aAppend").asInt(0) == 1) continue;
                long start = event.path("tStartMs").asLong(-1);
                long dur = event.path("dDurationMs").asLong(0);
                if (start < 0 || dur <= 0) continue;

                StringBuilder sb = new StringBuilder();
                JsonNode segs = event.path("segs");
                if (segs.isArray()) {
                    for (Iterator<JsonNode> it = segs.elements(); it.hasNext(); ) {
                        String t = it.next().path("utf8").asText("");
                        sb.append(t);
                    }
                }
                String text = sb.toString().replaceAll("\\s+", " ").trim();
                if (text.isEmpty()) continue;
                out.add(new TranscriptSegment(start, start + dur, text));
            }
            return out;
        } catch (Exception ex) {
            log.warn("json3 parse failed: {}", ex.getMessage());
            return List.of();
        }
    }

    private static String decodeAmps(String url) {
        return URLDecoder.decode(url.replace("\\u0026", "&"), StandardCharsets.UTF_8);
    }
}
