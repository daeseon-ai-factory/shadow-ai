package com.tubeshadow.practice.infrastructure;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Speech-to-text provider config. Defaults to OpenAI gpt-4o-transcribe (best dev-jargon accuracy,
 * far fewer silence hallucinations than Whisper). OpenAI-compatible, so pointing base-url/path/model
 * at Groq (`/openai/v1/audio/transcriptions`, whisper-large-v3) swaps providers with no code change.
 */
@ConfigurationProperties(prefix = "tubeshadow.transcription")
public record TranscriptionProperties(String apiKey, String baseUrl, String path, String model) {
}
