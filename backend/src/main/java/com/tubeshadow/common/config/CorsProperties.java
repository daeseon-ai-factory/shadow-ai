package com.tubeshadow.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix = "tubeshadow.cors")
public record CorsProperties(List<String> allowedOrigins) {
}
