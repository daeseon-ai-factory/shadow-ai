######################### Stage 1: build #########################
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /workspace

# Cache gradle wrapper + dependencies separately from source code
COPY gradlew settings.gradle.kts build.gradle.kts /workspace/
COPY gradle /workspace/gradle
RUN chmod +x gradlew

# Pre-fetch deps (best-effort — failure here means the source build still resolves)
RUN ./gradlew --no-daemon dependencies > /dev/null 2>&1 || true

COPY src /workspace/src
RUN ./gradlew --no-daemon bootJar -x test

######################### Stage 2: runtime #########################
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# yt-dlp (+ python3, ffmpeg) for the YouTube transcript fetch and the `-J` dimension probe.
# These run as external processes (ProcessBuilder), not Java, so they must exist in the runtime
# image — without them clip import fails on a clean container. (mirrors Dockerfile.dev; install
# as root before dropping to the non-root app user.)
RUN apk add --no-cache python3 py3-pip ffmpeg \
    && pip install --break-system-packages yt-dlp bgutil-ytdlp-pot-provider
# bgutil-ytdlp-pot-provider: the yt-dlp PLUGIN side. It mints a YouTube POToken (needed to fetch
# captions from a datacenter IP, where a tokenless request returns 200 + 0 bytes) by talking to the
# POToken provider sidecar over http://localhost:4416 (same Fargate task = shared netns). The pot is
# bound to the video/session, not the IP, so it works from AWS. Auto-engages once installed.

# Non-root user for hardening
RUN addgroup -S app && adduser -S app -G app
USER app

COPY --from=build --chown=app:app /workspace/build/libs/*.jar /app/tubeshadow.jar

# Recording storage (mount a volume in prod or use S3 once implemented)
VOLUME ["/app/local-storage/recordings"]

ENV SPRING_PROFILES_ACTIVE=prod \
    JAVA_OPTS="-XX:MaxRAMPercentage=75 -XX:+ExitOnOutOfMemoryError"
# PORT (Render/Fly/Heroku) or SERVER_PORT (fallback) is read at runtime via application.yml.

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:8080/api/health || exit 1

ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar /app/tubeshadow.jar"]
