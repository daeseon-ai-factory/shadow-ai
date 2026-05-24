package com.tubeshadow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Bootstrap entry. Spring Security auto-config is excluded for STAGE 0;
 * STAGE 2 (T-020) replaces the exclusion with a real {@code SecurityConfig}.
 */
@SpringBootApplication(exclude = {
        SecurityAutoConfiguration.class,
        ManagementWebSecurityAutoConfiguration.class
})
@EnableAsync
public class TubeshadowApplication {
    public static void main(String[] args) {
        SpringApplication.run(TubeshadowApplication.class, args);
    }
}
