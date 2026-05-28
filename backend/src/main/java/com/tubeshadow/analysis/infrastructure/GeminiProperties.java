package com.tubeshadow.analysis.infrastructure;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "tubeshadow.gemini")
public record GeminiProperties(String apiKey, String baseUrl, String model) {
}
