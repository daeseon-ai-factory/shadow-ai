package com.tubeshadow.analysis.infrastructure;

/**
 * Abstraction so the analysis service doesn't care whether we're calling Claude, Gemini,
 * or a future provider. Selected at runtime via {@code tubeshadow.ai.provider} (claude | gemini).
 */
public interface AiAnalysisClient {

    /** Whether the provider's API key is wired up. False → analysis stays PENDING/FAILED. */
    boolean isConfigured();

    /** Call the LLM and parse the JSON response into a provider-neutral result. Throws on transport or parse failure. */
    AiAnalysisResult analyzeClip(String transcript);

    /**
     * Low-level completion: send a custom system + user prompt and return the model's raw text
     * (no analysis-schema parsing — the caller parses whatever it asked for). Throws if the
     * provider isn't configured or the call/transport fails.
     */
    String complete(String systemPrompt, String userPrompt);

    /** Model identifier for metrics / display ("claude-haiku-4-5-20251001", "gemini-2.5-flash", …). */
    String model();
}
