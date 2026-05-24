package com.tubeshadow.video.infrastructure;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tubeshadow.common.exception.BusinessException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class YoutubeMetadataClient {

    private final RestClient http;
    private final String oembedUrl;

    public YoutubeMetadataClient(@Value("${tubeshadow.youtube.oembed-url}") String oembedUrl) {
        this.oembedUrl = oembedUrl;
        this.http = RestClient.builder()
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
