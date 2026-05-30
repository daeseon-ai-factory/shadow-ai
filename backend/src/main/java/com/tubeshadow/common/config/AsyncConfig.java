package com.tubeshadow.common.config;

import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.aop.interceptor.SimpleAsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * Bounds the {@code @Async} pool used by the clip-analysis pipeline.
 *
 * <p>Without an explicit executor, Spring falls back to
 * {@link org.springframework.core.task.SimpleAsyncTaskExecutor}, which spawns a NEW
 * thread per task with no ceiling and no queue. Every clip creation fires an async AI
 * analysis, so a burst of imports could spawn unbounded threads and exhaust memory.
 * A small bounded pool with a backing queue and a CallerRuns fallback degrades
 * gracefully under load instead.
 *
 * <p>{@code waitForTasksToCompleteOnShutdown} + {@code awaitTerminationSeconds} let the
 * pool drain in-flight analyses on SIGTERM, complementing {@code server.shutdown: graceful}
 * for clean rolling deploys.
 *
 * <p>The bean is named {@code taskExecutor} so unqualified {@code @Async} methods resolve
 * to it by convention, and {@link #getAsyncExecutor()} points the framework at the same
 * singleton.
 */
@Configuration
public class AsyncConfig implements AsyncConfigurer {

    @Bean(name = "taskExecutor")
    public ThreadPoolTaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(4);
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("ai-analysis-");
        // Back-pressure: when core+queue+max are saturated, run on the caller thread
        // rather than dropping the analysis. The caller here is a short-lived async
        // dispatch, so this only slows intake — it never loses work silently.
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setAwaitTerminationSeconds(30);
        return executor;
    }

    @Override
    public Executor getAsyncExecutor() {
        return taskExecutor();
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new SimpleAsyncUncaughtExceptionHandler();
    }
}
