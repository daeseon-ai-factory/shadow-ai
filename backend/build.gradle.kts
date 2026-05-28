plugins {
    java
    id("org.springframework.boot") version "3.3.5"
    id("io.spring.dependency-management") version "1.1.6"
}

group = "com.tubeshadow"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Core
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-actuator")

    // DevTools — hot reload on code change. Stripped from prod jar automatically.
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    // Persistence (will be activated when DB tasks land)
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.flywaydb:flyway-core")
    implementation("org.flywaydb:flyway-database-postgresql")
    runtimeOnly("org.postgresql:postgresql")

    // Security
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("io.jsonwebtoken:jjwt-api:0.12.6")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.6")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.6")

    // OpenAPI / Swagger
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.6.0")

    // Anthropic Claude HTTP client uses Spring's RestClient / WebClient
    implementation("org.springframework.boot:spring-boot-starter-webflux")

    // YAML reader for curated-videos.yml seed
    implementation("com.fasterxml.jackson.dataformat:jackson-dataformat-yaml")

    // AWS SDK v2 — S3 for recordings (prod only via @ConditionalOnProperty)
    implementation(platform("software.amazon.awssdk:bom:2.28.0"))
    implementation("software.amazon.awssdk:s3")
    implementation("software.amazon.awssdk:sts")  // needed for IAM role assumption

    // Structured JSON logging in prod (Logstash encoder for Logback)
    implementation("net.logstash.logback:logstash-logback-encoder:8.0")

    // Test
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
    testImplementation("org.testcontainers:junit-jupiter:1.20.3")
    testImplementation("org.testcontainers:postgresql:1.20.3")
    testRuntimeOnly("com.h2database:h2")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
