package com.tubeshadow.video.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

/**
 * Cheap "tell me about this video" call. Wraps {@code yt-dlp -J --skip-download} —
 * downloads no media, just emits the video metadata JSON to stdout.
 *
 * <p>Used to detect orientation (Shorts = portrait) and duration. Separate from
 * {@link YoutubeTranscriptClient} because that one's job is to write subtitle files;
 * the {@code -J} flag is mutually exclusive with subtitle writing in yt-dlp.
 *
 * <p>Returns Optional.empty on any failure (binary missing, video unavailable, json
 * parse error). Callers should not block on this — orientation defaults to landscape
 * when unknown.
 */
@Component
public class YoutubeProbe {

    private static final Logger log = LoggerFactory.getLogger(YoutubeProbe.class);
    private static final String YOUTUBE_EXTRACTOR_ARGS = "youtube:player_client=web_safari";

    private final ObjectMapper objectMapper;
    private final String ytDlpBinary;
    private final long timeoutSeconds;
    private final String potProviderBaseUrl;
    private final String ytDlpProxy;

    @Autowired
    public YoutubeProbe(ObjectMapper objectMapper,
                        @Value("${tubeshadow.youtube.yt-dlp-binary:yt-dlp}") String ytDlpBinary,
                        @Value("${tubeshadow.youtube.yt-dlp-probe-timeout-seconds:${tubeshadow.youtube.yt-dlp-timeout-seconds:10}}")
                        long timeoutSeconds,
                        @Value("${tubeshadow.youtube.pot-provider-base-url:http://localhost:4417}")
                        String potProviderBaseUrl,
                        @Value("${tubeshadow.youtube.yt-dlp-proxy:}") String ytDlpProxy) {
        this.objectMapper = objectMapper;
        this.ytDlpBinary = ytDlpBinary;
        this.timeoutSeconds = timeoutSeconds;
        this.potProviderBaseUrl = potProviderBaseUrl;
        this.ytDlpProxy = ytDlpProxy;
    }

    public Optional<VideoMetadata> probe(String videoId) {
        java.util.List<String> command = new java.util.ArrayList<>(java.util.List.of(
                ytDlpBinary,
                "-J",
                "--skip-download",
                "--ignore-no-formats-error",
                "--no-warnings",
                "--extractor-args", YOUTUBE_EXTRACTOR_ARGS,
                "--extractor-args", potProviderExtractorArgs()
        ));
        if (ytDlpProxy != null && !ytDlpProxy.isBlank()) {
            command.add("--proxy");
            command.add(ytDlpProxy);
        }
        command.add("https://www.youtube.com/watch?v=" + videoId);
        ProcessBuilder pb = new ProcessBuilder(command);

        ProcessRunner.Result result;
        try {
            result = ProcessRunner.run(pb, timeoutSeconds);
        } catch (IOException ex) {
            log.warn("yt-dlp not available for probe ({}): {}", ytDlpBinary, ex.getMessage());
            return Optional.empty();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            return Optional.empty();
        }

        if (result.timedOut()) {
            log.warn("yt-dlp probe timed out for {}", videoId);
            return Optional.empty();
        }
        if (result.exitCode() != 0) {
            log.debug("yt-dlp probe non-zero exit for {}: {}", videoId, tail(result.combinedOutput()));
            return Optional.empty();
        }

        try {
            JsonNode root = objectMapper.readTree(result.stdout());
            Integer width = optInt(root, "width");
            Integer height = optInt(root, "height");
            Integer duration = optInt(root, "duration");
            return Optional.of(new VideoMetadata(width, height, duration));
        } catch (Exception ex) {
            log.warn("yt-dlp probe JSON parse failed for {}: {}", videoId, ex.getMessage());
            return Optional.empty();
        }
    }

    private static String tail(String value) {
        if (value == null || value.isBlank()) return "";
        return value.substring(Math.max(0, value.length() - 300));
    }

    private static Integer optInt(JsonNode root, String field) {
        JsonNode n = root.path(field);
        if (n.isInt()) return n.asInt();
        if (n.isNumber()) return (int) Math.round(n.asDouble());
        return null;
    }

    private String potProviderExtractorArgs() {
        return "youtubepot-bgutilhttp:base_url=" + potProviderBaseUrl;
    }

    /** Test hook only. */
    YoutubeProbe(ObjectMapper objectMapper, String ytDlpBinary, long timeoutSeconds, String potProviderBaseUrl) {
        this(objectMapper, ytDlpBinary, timeoutSeconds, potProviderBaseUrl, "");
    }

    public record VideoMetadata(Integer widthPx, Integer heightPx, Integer durationSeconds) {}
}
