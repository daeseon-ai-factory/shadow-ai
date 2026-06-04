package com.tubeshadow.analysis.infrastructure;

import com.tubeshadow.common.exception.BusinessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.function.Function;

/**
 * Tries the AI providers in a configured priority order and falls back to the next one whenever the
 * current provider's call fails (quota exhausted / 429 / 5xx / timeout / parse). So a free-tier
 * Gemini key serves everyday traffic and spills over to OpenAI — and then Claude — only when it's
 * full or down. Order: {@code tubeshadow.ai.order} (default {@code gemini,openai,claude}); providers
 * whose API key is unset report isConfigured()=false and are skipped.
 *
 * <p>Marked {@code @Primary} so every {@code AiAnalysisClient} injection point gets the fallback
 * chain; the concrete clients (Gemini/OpenAI/Claude) are plain beans collected into {@code all}.
 */
@Component
@Primary
public class CompositeAiClient implements AiAnalysisClient {

    private static final Logger log = LoggerFactory.getLogger(CompositeAiClient.class);

    private final List<AiAnalysisClient> providers; // ordered by priority, excludes self

    public CompositeAiClient(List<AiAnalysisClient> all,
                             @Value("${tubeshadow.ai.order:gemini,openai,claude}") String order) {
        List<String> rank = List.of(order.toLowerCase().split("\\s*,\\s*"));
        this.providers = all.stream()
                .filter(c -> c != this) // the injected list includes this @Primary bean
                .sorted(Comparator.comparingInt(c -> {
                    int i = rank.indexOf(name(c));
                    return i < 0 ? Integer.MAX_VALUE : i; // unranked providers go last
                }))
                .toList();
        log.info("AI provider fallback order: {}", providers.stream().map(CompositeAiClient::name).toList());
    }

    /** Derive a short provider key from the class name, e.g. GeminiClient → "gemini". */
    private static String name(AiAnalysisClient c) {
        return c.getClass().getSimpleName().replace("Client", "").toLowerCase();
    }

    @Override
    public boolean isConfigured() {
        return providers.stream().anyMatch(AiAnalysisClient::isConfigured);
    }

    @Override
    public AiAnalysisResult analyzeClip(String transcript) {
        return run("analyzeClip", c -> c.analyzeClip(transcript));
    }

    @Override
    public String complete(String systemPrompt, String userPrompt, int maxTokens) {
        return run("complete", c -> c.complete(systemPrompt, userPrompt, maxTokens));
    }

    @Override
    public String model() {
        return providers.stream().filter(AiAnalysisClient::isConfigured)
                .map(AiAnalysisClient::model).findFirst().orElse("none");
    }

    private <T> T run(String op, Function<AiAnalysisClient, T> call) {
        List<AiAnalysisClient> active = providers.stream().filter(AiAnalysisClient::isConfigured).toList();
        if (active.isEmpty()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        RuntimeException last = null;
        for (int i = 0; i < active.size(); i++) {
            AiAnalysisClient c = active.get(i);
            boolean hasFallback = i < active.size() - 1;
            try {
                return call.apply(c);
            } catch (RuntimeException ex) {
                last = ex;
                if (!hasFallback) throw ex;
                log.warn("AI provider '{}' {} failed — falling back to '{}': {}",
                        name(c), op, name(active.get(i + 1)), ex.getMessage());
            }
        }
        throw last; // unreachable: the last provider's failure is rethrown above
    }
}
