package com.tubeshadow.video.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.video.domain.TranscriptSegment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

/**
 * YouTube transcript fetcher backed by {@code yt-dlp}.
 *
 * <p><b>Why yt-dlp instead of scraping watch HTML?</b><br>
 * Our earlier in-process scraper (watch HTML → ytInitialPlayerResponse → timedtext URL)
 * extracted the URL correctly but YouTube returned HTTP 200 with an empty body — the URL
 * embeds a short-lived auth token (`exp`/`expire` query params) that requires the same
 * client session/cookies to redeem. Reverse-engineering that handshake is fragile and
 * breaks every few months. yt-dlp is a community-maintained tool (thousands of contributors,
 * weekly releases) that handles the dance correctly.
 *
 * <p>This client shells out to the installed {@code yt-dlp} binary. Operations:
 * <ol>
 *   <li>Write subs to a temp directory ({@code --skip-download} so no video bytes are pulled).</li>
 *   <li>Read the produced {@code .en*.json3} file.</li>
 *   <li>Parse the same json3 schema as before — events with tStartMs / dDurationMs / segs[].utf8.</li>
 * </ol>
 *
 * <p>If yt-dlp is absent or the video has no English captions, throws
 * {@link NoTranscriptAvailableException} and the video is saved with
 * {@code transcript_status=UNAVAILABLE}.
 */
@Component
public class YoutubeTranscriptClient {

    private static final Logger log = LoggerFactory.getLogger(YoutubeTranscriptClient.class);

    private final ObjectMapper objectMapper;
    private final String ytDlpBinary;
    private final long timeoutSeconds;

    public YoutubeTranscriptClient(ObjectMapper objectMapper,
                                   @Value("${tubeshadow.youtube.yt-dlp-binary:yt-dlp}") String ytDlpBinary,
                                   @Value("${tubeshadow.youtube.yt-dlp-timeout-seconds:30}") long timeoutSeconds) {
        this.objectMapper = objectMapper;
        this.ytDlpBinary = ytDlpBinary;
        this.timeoutSeconds = timeoutSeconds;
    }

    public List<TranscriptSegment> fetch(String videoId) {
        Path tempDir;
        try {
            tempDir = Files.createTempDirectory("tubeshadow-yt-");
        } catch (IOException ex) {
            throw new NoTranscriptAvailableException(videoId);
        }

        Path outBase = tempDir.resolve("sub");
        ProcessBuilder pb = new ProcessBuilder(
                ytDlpBinary,
                "--write-subs",
                "--write-auto-subs",   // fall back to auto-generated when manual missing
                "--skip-download",
                "--sub-format", "json3",
                "--sub-langs", "en",   // single lang to avoid YouTube 429
                "--no-warnings",
                "-o", outBase.toString(),
                "https://www.youtube.com/watch?v=" + videoId
        ).redirectErrorStream(true);

        Process process;
        try {
            process = pb.start();
        } catch (IOException ex) {
            log.warn("yt-dlp not available ({}): {}", ytDlpBinary, ex.getMessage());
            cleanup(tempDir);
            throw new NoTranscriptAvailableException(videoId);
        }

        try {
            boolean finished = process.waitFor(timeoutSeconds, TimeUnit.SECONDS);
            if (!finished) {
                process.destroyForcibly();
                log.warn("yt-dlp timed out for {}", videoId);
                throw new NoTranscriptAvailableException(videoId);
            }
            if (process.exitValue() != 0) {
                String output = new String(process.getInputStream().readAllBytes()).strip();
                log.info("yt-dlp non-zero exit for {}: {}", videoId,
                        output.length() > 300 ? output.substring(output.length() - 300) : output);
                throw new NoTranscriptAvailableException(videoId);
            }
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            process.destroyForcibly();
            throw new NoTranscriptAvailableException(videoId);
        } catch (IOException ex) {
            throw new NoTranscriptAvailableException(videoId);
        }

        try {
            Path subFile = findFirstJson3(tempDir);
            if (subFile == null) {
                log.info("No .json3 produced for {}", videoId);
                throw new NoTranscriptAvailableException(videoId);
            }
            String json3 = Files.readString(subFile);
            List<TranscriptSegment> segments = parseJson3(json3);
            if (segments.isEmpty()) {
                throw new NoTranscriptAvailableException(videoId);
            }
            return segments;
        } catch (IOException ex) {
            throw new NoTranscriptAvailableException(videoId);
        } finally {
            cleanup(tempDir);
        }
    }

    private Path findFirstJson3(Path dir) throws IOException {
        try (Stream<Path> stream = Files.list(dir)) {
            // Prefer the plain "sub.en.json3"; fall back to any json3
            List<Path> jsons = stream.filter(p -> p.toString().endsWith(".json3"))
                    .sorted(Comparator.comparing(p -> p.getFileName().toString().length()))
                    .toList();
            return jsons.isEmpty() ? null : jsons.get(0);
        }
    }

    private void cleanup(Path dir) {
        try (Stream<Path> stream = Files.walk(dir)) {
            stream.sorted(Comparator.reverseOrder()).forEach(p -> {
                try { Files.deleteIfExists(p); } catch (IOException ignored) {}
            });
        } catch (IOException ignored) {}
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

    /** Test hook only. */
    Optional<String> binaryPath() {
        return Optional.ofNullable(ytDlpBinary);
    }
}
