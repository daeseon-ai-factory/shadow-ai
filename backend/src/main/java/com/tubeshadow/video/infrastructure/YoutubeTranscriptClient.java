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
import java.util.Locale;
import java.util.Optional;
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
    private static final String YOUTUBE_EXTRACTOR_ARGS = "youtube:player_client=web_safari";

    private final ObjectMapper objectMapper;
    private final String ytDlpBinary;
    private final long timeoutSeconds;
    private final String potProviderBaseUrl;

    public YoutubeTranscriptClient(ObjectMapper objectMapper,
                                   @Value("${tubeshadow.youtube.yt-dlp-binary:yt-dlp}") String ytDlpBinary,
                                   @Value("${tubeshadow.youtube.yt-dlp-timeout-seconds:30}") long timeoutSeconds,
                                   @Value("${tubeshadow.youtube.pot-provider-base-url:http://localhost:4417}")
                                   String potProviderBaseUrl) {
        this.objectMapper = objectMapper;
        this.ytDlpBinary = ytDlpBinary;
        this.timeoutSeconds = timeoutSeconds;
        this.potProviderBaseUrl = potProviderBaseUrl;
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
                "--ignore-no-formats-error",
                "--sub-format", "json3",
                "--sub-langs", "en",   // keep this narrow; broad regexes download translated captions
                // Force a client that requests a POToken and point yt-dlp's bgutil plugin at the
                // container-local provider. The provider arg must be a separate extractor-args flag.
                "--extractor-args", YOUTUBE_EXTRACTOR_ARGS,
                "--extractor-args", potProviderExtractorArgs(),
                "-o", outBase.toString(),
                "https://www.youtube.com/watch?v=" + videoId
        ).redirectErrorStream(true);

        try {
            ProcessRunner.Result result = ProcessRunner.run(pb, timeoutSeconds);
            if (result.timedOut()) {
                log.warn("yt-dlp timed out for {}: {}", videoId, tail(result.combinedOutput()));
                throw new NoTranscriptAvailableException(videoId);
            }
            if (result.exitCode() != 0) {
                String output = result.combinedOutput();
                log.info("yt-dlp non-zero exit for {} | POT-DIAG: {}", videoId,
                        diagnostic(output));
                throw new NoTranscriptAvailableException(videoId);
            }

            Path subFile = findFirstJson3(tempDir);
            if (subFile == null) {
                log.info("No .json3 produced for {} | YTDLP-DIAG: {}", videoId,
                        diagnostic(result.combinedOutput()));
                throw new NoTranscriptAvailableException(videoId);
            }
            String json3 = Files.readString(subFile);
            List<TranscriptSegment> segments = parseJson3(json3);
            if (segments.isEmpty()) {
                throw new NoTranscriptAvailableException(videoId);
            }
            return segments;
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new NoTranscriptAvailableException(videoId);
        } catch (IOException ex) {
            log.warn("yt-dlp transcript IO failed for {}: {}", videoId, ex.getMessage());
            throw new NoTranscriptAvailableException(videoId);
        } finally {
            cleanup(tempDir);
        }
    }

    private static String tail(String value) {
        if (value == null || value.isBlank()) return "";
        return value.substring(Math.max(0, value.length() - 300));
    }

    private static String diagnostic(String output) {
        if (output == null || output.isBlank()) return "";
        String diag = output.lines()
                .filter(l -> {
                    String lower = l.toLowerCase(Locale.ROOT);
                    return lower.contains("pot") || lower.contains("po token")
                            || lower.contains("warning") || lower.contains("sign in")
                            || lower.contains("provider") || lower.contains("subtitle")
                            || lower.contains("caption") || lower.contains("format is not available");
                })
                .limit(30)
                .collect(java.util.stream.Collectors.joining(" || "));
        return diag.isBlank() ? tail(output) : diag;
    }

    private String potProviderExtractorArgs() {
        return "youtubepot-bgutilhttp:base_url=" + potProviderBaseUrl;
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
