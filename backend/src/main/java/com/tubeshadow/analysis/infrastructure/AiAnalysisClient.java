package com.tubeshadow.analysis.infrastructure;

/**
 * Abstraction so the analysis service doesn't care whether we're calling
 * Claude, Gemini, or a future provider. Selected at runtime via
 * {@code tubeshadow.ai.provider} (claude | gemini).
 */
public interface AiAnalysisClient {

    /** Whether the provider's API key is wired up. False → analysis stays PENDING/FAILED. */
    boolean isConfigured();

    /** Call the LLM and parse the JSON response. Throws on transport or parse failure. */
    ClaudeClient.AnalysisResult analyzeClip(String transcript);

    /** Model identifier for audit / display ("claude-haiku-4-5-20251001", "gemini-1.5-flash", …). */
    String model();
}
