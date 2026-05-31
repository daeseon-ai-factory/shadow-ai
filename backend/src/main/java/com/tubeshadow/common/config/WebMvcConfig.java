package com.tubeshadow.common.config;

import com.tubeshadow.auth.security.AuthRateLimitFilter;
import com.tubeshadow.auth.security.CurrentUserArgumentResolver;
import com.tubeshadow.practice.api.ComposeRateLimitInterceptor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final CurrentUserArgumentResolver currentUserArgumentResolver;
    private final ObjectProvider<AuthRateLimitFilter> rateLimitInterceptor;
    private final ObjectProvider<ComposeRateLimitInterceptor> composeRateLimitInterceptor;

    public WebMvcConfig(CurrentUserArgumentResolver currentUserArgumentResolver,
                        ObjectProvider<AuthRateLimitFilter> rateLimitInterceptor,
                        ObjectProvider<ComposeRateLimitInterceptor> composeRateLimitInterceptor) {
        this.currentUserArgumentResolver = currentUserArgumentResolver;
        this.rateLimitInterceptor = rateLimitInterceptor;
        this.composeRateLimitInterceptor = composeRateLimitInterceptor;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(currentUserArgumentResolver);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        AuthRateLimitFilter rate = rateLimitInterceptor.getIfAvailable();
        if (rate != null) {
            registry.addInterceptor(rate).addPathPatterns("/api/auth/signup", "/api/auth/login");
        }
        // The AI composition check is the one authed endpoint that costs a provider call — guard it
        // per-user so a loop can't run up the bill (the auth limiter above only covers signup/login).
        ComposeRateLimitInterceptor compose = composeRateLimitInterceptor.getIfAvailable();
        if (compose != null) {
            registry.addInterceptor(compose).addPathPatterns("/api/practice/compose/check");
        }
    }
}
