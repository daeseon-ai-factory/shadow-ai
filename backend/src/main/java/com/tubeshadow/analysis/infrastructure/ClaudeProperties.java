package com.tubeshadow.analysis.infrastructure;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "tubeshadow.claude")
public record ClaudeProperties(String apiKey, String baseUrl, String model) {
}
