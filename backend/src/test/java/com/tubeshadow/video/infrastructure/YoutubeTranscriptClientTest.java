package com.tubeshadow.video.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;

class YoutubeTranscriptClientTest {

    @TempDir
    Path tempDir;

    @Test
    void ignoresMissingVideoFormatsWhenOnlySubtitlesAreNeeded() throws Exception {
        Path script = tempDir.resolve("yt-dlp-subtitles-only.sh");
        Files.writeString(script, """
                #!/bin/sh
                has_ignore=0
                has_provider_base_url=0
                out=
                while [ "$#" -gt 0 ]; do
                  if [ "$1" = "--ignore-no-formats-error" ]; then
                    has_ignore=1
                  fi
                  if [ "$1" = "--extractor-args" ]; then
                    shift
                    case "$1" in
                      *youtubepot-bgutilhttp:base_url=http://localhost:4417*) has_provider_base_url=1 ;;
                    esac
                  fi
                  if [ "$1" = "-o" ]; then
                    shift
                    out="$1"
                  fi
                  shift
                done

                if [ "$has_ignore" != "1" ]; then
                  printf 'ERROR: Requested format is not available\\n'
                  exit 1
                fi
                if [ "$has_provider_base_url" != "1" ]; then
                  printf 'ERROR: bgutil provider base_url was not passed\\n'
                  exit 2
                fi

                mkdir -p "$(dirname "$out")"
                cat > "${out}.en.json3" <<'JSON'
                {"events":[{"tStartMs":0,"dDurationMs":1200,"segs":[{"utf8":"Hello "},{"utf8":"captions"}]}]}
                JSON
                exit 0
                """);
        assertThat(script.toFile().setExecutable(true)).isTrue();

        YoutubeTranscriptClient client = new YoutubeTranscriptClient(
                new ObjectMapper(), script.toString(), 3, "http://localhost:4417");

        var segments = client.fetch("abcdefghijk");

        assertThat(segments).hasSize(1);
        assertThat(segments.get(0).text()).isEqualTo("Hello captions");
    }
}
