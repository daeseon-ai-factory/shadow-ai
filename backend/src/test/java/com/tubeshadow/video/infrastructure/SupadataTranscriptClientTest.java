package com.tubeshadow.video.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpServer;
import org.junit.jupiter.api.Test;

import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

import static org.assertj.core.api.Assertions.assertThat;

class SupadataTranscriptClientTest {

    @Test
    void mapsTimestampedChunksToTranscriptSegments() throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/transcript", exchange -> {
            assertThat(exchange.getRequestHeaders().getFirst("x-api-key")).isEqualTo("test-key");
            assertThat(exchange.getRequestURI().getQuery()).contains("lang=en", "text=false", "mode=native");
            byte[] body = """
                    {
                      "content": [
                        {"text": "Hello ", "offset": 1000, "duration": 500, "lang": "en"},
                        {"text": " captions", "offset": 1500, "duration": 700, "lang": "en"}
                      ],
                      "lang": "en",
                      "availableLangs": ["en"]
                    }
                    """.getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, body.length);
            exchange.getResponseBody().write(body);
            exchange.close();
        });
        server.start();
        try {
            SupadataTranscriptClient client = new SupadataTranscriptClient(
                    new ObjectMapper(),
                    "test-key",
                    "http://127.0.0.1:" + server.getAddress().getPort(),
                    "en",
                    "native",
                    1,
                    100,
                    5);

            var segments = client.fetch("abcdefghijk");

            assertThat(segments).hasSize(2);
            assertThat(segments.get(0).startMs()).isEqualTo(1000);
            assertThat(segments.get(0).endMs()).isEqualTo(1500);
            assertThat(segments.get(0).text()).isEqualTo("Hello");
            assertThat(segments.get(1).startMs()).isEqualTo(1500);
            assertThat(segments.get(1).endMs()).isEqualTo(2200);
            assertThat(segments.get(1).text()).isEqualTo("captions");
        } finally {
            server.stop(0);
        }
    }
}
