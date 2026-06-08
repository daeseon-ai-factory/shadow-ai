package com.tubeshadow.practice.infrastructure;

import org.springframework.boot.context.properties.ConfigurationProperties;

/** Groq hosts OpenAI's Whisper for speech-to-text (free tier). OpenAI-compatible REST API. */
@ConfigurationProperties(prefix = "tubeshadow.groq")
public record GroqProperties(String apiKey, String baseUrl, String model) {
}
