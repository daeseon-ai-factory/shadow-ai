package com.tubeshadow.video.infrastructure;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tubeshadow.common.exception.BusinessException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Duration;

@Component
public class YoutubeMetadataClient {

    private final RestClient http;
    private final String oembedUrl;

    public YoutubeMetadataClient(@Value("${tubeshadow.youtube.oembed-url}") String oembedUrl) {
        this.oembedUrl = oembedUrl;
        // YouTube oembed can take 3-5s on slow networks. Default timeout is too
        // aggressive — explicit 15s connect + 30s read covers it.
        // Generous timeouts so a slow/throttled network still completes the call.
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(60));
        factory.setReadTimeout(Duration.ofSeconds(60));
        this.http = RestClient.builder()
                .requestFactory(factory)
                .defaultHeader("User-Agent", "TubeShadow/0.0.1 (+local)")
                .build();
    }

    public YoutubeMetadata fetch(String videoId) {
        String videoUrl = "https://www.youtube.com/watch?v=" + videoId;
        try {
            return http.get()
                    .uri(uri -> uri.scheme("https").host("www.youtube.com").path("/oembed")
                            .queryParam("url", videoUrl)
                            .queryParam("format", "json").build())
                    .retrieve()
                    .body(YoutubeMetadata.class);
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "YOUTUBE_FETCH_FAILED",
                    "YouTube 메타데이터를 가져올 수 없습니다: " + ex.getMessage());
        }
    }

    public record YoutubeMetadata(
            String title,
            @JsonProperty("author_name") String authorName,
            @JsonProperty("thumbnail_url") String thumbnailUrl
    ) {
    }

    public String oembedUrlForReference() {
        return oembedUrl;
    }
}
