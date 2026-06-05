package com.tubeshadow.video.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;

class YoutubeProbeTest {

    @TempDir
    Path tempDir;

    @Test
    void returnsEmptyWhenYtDlpProbeTimesOutBeforeStdoutCloses() throws Exception {
        Path script = tempDir.resolve("yt-dlp-hang.sh");
        Files.writeString(script, """
                #!/bin/sh
                printf '{"width":'
                exec sleep 5
                """);
        assertThat(script.toFile().setExecutable(true)).isTrue();

        YoutubeProbe probe = new YoutubeProbe(new ObjectMapper(), script.toString(), 1, "http://localhost:4417");

        long started = System.nanoTime();
        assertThat(probe.probe("abcdefghijk")).isEmpty();
        Duration elapsed = Duration.ofNanos(System.nanoTime() - started);

        assertThat(elapsed).isLessThan(Duration.ofSeconds(3));
    }

    @Test
    void acceptsMetadataJsonWithMissingDimensions() throws Exception {
        Path script = tempDir.resolve("yt-dlp-metadata.sh");
        Files.writeString(script, """
                #!/bin/sh
                printf '{"duration": 123}'
                """);
        assertThat(script.toFile().setExecutable(true)).isTrue();

        YoutubeProbe probe = new YoutubeProbe(new ObjectMapper(), script.toString(), 3, "http://localhost:4417");

        assertThat(probe.probe("abcdefghijk"))
                .hasValue(new YoutubeProbe.VideoMetadata(null, null, 123));
    }
}
