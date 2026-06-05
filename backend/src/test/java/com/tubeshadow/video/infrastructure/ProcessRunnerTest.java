package com.tubeshadow.video.infrastructure;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;

class ProcessRunnerTest {

    @TempDir
    Path tempDir;

    @Test
    void timesOutWhenProcessKeepsStdoutOpen() throws Exception {
        Path script = writeScript("hang.sh", """
                #!/bin/sh
                printf 'partial-output'
                exec sleep 5
                """);

        long started = System.nanoTime();
        ProcessRunner.Result result = ProcessRunner.run(new ProcessBuilder(script.toString()), 1);
        Duration elapsed = Duration.ofNanos(System.nanoTime() - started);

        assertThat(result.timedOut()).isTrue();
        assertThat(elapsed).isLessThan(Duration.ofSeconds(3));
    }

    @Test
    void drainsLargeOutputBeforeWaitingForExit() throws Exception {
        Path script = writeScript("large-output.sh", """
                #!/bin/sh
                i=0
                while [ "$i" -lt 5000 ]; do
                  printf 'pot provider diagnostic line %s\\n' "$i"
                  i=$((i + 1))
                done
                exit 7
                """);

        ProcessRunner.Result result = ProcessRunner.run(new ProcessBuilder(script.toString()), 3);

        assertThat(result.timedOut()).isFalse();
        assertThat(result.exitCode()).isEqualTo(7);
        assertThat(result.stdout()).contains("pot provider diagnostic line");
    }

    private Path writeScript(String name, String body) throws Exception {
        Path script = tempDir.resolve(name);
        Files.writeString(script, body);
        assertThat(script.toFile().setExecutable(true)).isTrue();
        return script;
    }
}
