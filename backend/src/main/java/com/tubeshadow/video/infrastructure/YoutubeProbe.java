package com.tubeshadow.video.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

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

    private final ObjectMapper objectMapper;
    private final String ytDlpBinary;
    private final long timeoutSeconds;

    public YoutubeProbe(ObjectMapper objectMapper,
                        @Value("${tubeshadow.youtube.yt-dlp-binary:yt-dlp}") String ytDlpBinary,
                        @Value("${tubeshadow.youtube.yt-dlp-timeout-seconds:30}") long timeoutSeconds) {
        this.objectMapper = objectMapper;
        this.ytDlpBinary = ytDlpBinary;
        this.timeoutSeconds = timeoutSeconds;
    }

    public Optional<VideoMetadata> probe(String videoId) {
        ProcessBuilder pb = new ProcessBuilder(
                ytDlpBinary,
                "-J",
                "--skip-download",
                "--no-warnings",
                "https://www.youtube.com/watch?v=" + videoId
        );

        Process process;
        try {
            process = pb.start();
        } catch (IOException ex) {
            log.warn("yt-dlp not available for probe ({}): {}", ytDlpBinary, ex.getMessage());
            return Optional.empty();
        }

        String json;
        try {
            json = new String(process.getInputStream().readAllBytes());
            boolean finished = process.waitFor(timeoutSeconds, TimeUnit.SECONDS);
            if (!finished) {
                process.destroyForcibly();
                return Optional.empty();
            }
            if (process.exitValue() != 0) {
                log.debug("yt-dlp probe non-zero exit for {}", videoId);
                return Optional.empty();
            }
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            process.destroyForcibly();
            return Optional.empty();
        } catch (IOException ex) {
            return Optional.empty();
        }

        try {
            JsonNode root = objectMapper.readTree(json);
            Integer width = optInt(root, "width");
            Integer height = optInt(root, "height");
            Integer duration = optInt(root, "duration");
            return Optional.of(new VideoMetadata(width, height, duration));
        } catch (Exception ex) {
            log.warn("yt-dlp probe JSON parse failed for {}: {}", videoId, ex.getMessage());
            return Optional.empty();
        }
    }

    private static Integer optInt(JsonNode root, String field) {
        JsonNode n = root.path(field);
        return n.isInt() ? n.asInt() : (n.isNumber() ? (int) Math.round(n.asDouble()) : null);
    }

    public record VideoMetadata(Integer widthPx, Integer heightPx, Integer durationSeconds) {}
}
