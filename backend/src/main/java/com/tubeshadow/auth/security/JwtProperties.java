package com.tubeshadow.auth.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "tubeshadow.jwt")
public record JwtProperties(String secret, long accessTokenTtlSeconds) {
}
