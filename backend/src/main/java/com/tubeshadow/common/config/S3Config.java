package com.tubeshadow.common.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

/**
 * Wires an S3 client only when S3 storage is selected. On AWS (ECS/EC2) the
 * DefaultCredentialsProvider picks up the IAM role automatically — no static
 * keys live in env vars or code.
 */
@Configuration
@ConditionalOnProperty(name = "tubeshadow.recording.storage", havingValue = "s3")
public class S3Config {

    @Bean
    public S3Client s3Client(
            @org.springframework.beans.factory.annotation.Value("${tubeshadow.recording.s3.region:ca-central-1}") String region) {
        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();
    }
}
