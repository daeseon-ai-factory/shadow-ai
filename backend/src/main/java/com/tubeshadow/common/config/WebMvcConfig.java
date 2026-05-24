package com.tubeshadow.common.config;

import com.tubeshadow.auth.security.AuthRateLimitFilter;
import com.tubeshadow.auth.security.CurrentUserArgumentResolver;
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

    public WebMvcConfig(CurrentUserArgumentResolver currentUserArgumentResolver,
                        ObjectProvider<AuthRateLimitFilter> rateLimitInterceptor) {
        this.currentUserArgumentResolver = currentUserArgumentResolver;
        this.rateLimitInterceptor = rateLimitInterceptor;
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
    }
}
