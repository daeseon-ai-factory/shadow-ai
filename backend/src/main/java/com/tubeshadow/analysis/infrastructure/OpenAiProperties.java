package com.tubeshadow.analysis.infrastructure;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "tubeshadow.openai")
public record OpenAiProperties(String apiKey, String baseUrl, String model) {
}
