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

######################### Stage 2: POT provider #########################
FROM brainicism/bgutil-ytdlp-pot-provider:1.3.1 AS pot-provider

######################### Stage 3: runtime #########################
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# yt-dlp (+ python3, ffmpeg) for the YouTube transcript fetch and the `-J` dimension probe.
# These run as external processes (ProcessBuilder), not Java, so they must exist in the runtime
# image — without them clip import fails on a clean container. (mirrors Dockerfile.dev; install
# as root before dropping to the non-root app user.)
RUN apk add --no-cache python3 py3-pip ffmpeg deno nodejs \
    && pip install --break-system-packages yt-dlp bgutil-ytdlp-pot-provider==1.3.1
# deno = the JavaScript runtime yt-dlp needs for current YouTube extraction. Without it yt-dlp
# fails ("No supported JavaScript runtime") and never even reaches the POToken step, so the
# bgutil provider is never called. yt-dlp auto-detects deno on PATH (its default runtime).
# bgutil-ytdlp-pot-provider: the yt-dlp PLUGIN side. It mints a YouTube POToken (needed to fetch
# captions from a datacenter IP, where a tokenless request returns 200 + 0 bytes). The Node provider
# runs inside this same container on 4417 so Fargate sidecar networking cannot break the token path.
COPY --from=pot-provider /app /opt/pot-provider

# Non-root user for hardening
RUN addgroup -S app && adduser -S app -G app \
    && chown -R app:app /opt/pot-provider
USER app

COPY --from=build --chown=app:app /workspace/build/libs/*.jar /app/tubeshadow.jar

# Recording storage (mount a volume in prod or use S3 once implemented)
VOLUME ["/app/local-storage/recordings"]

ENV SPRING_PROFILES_ACTIVE=prod \
    POT_PROVIDER_PORT=4417 \
    YT_DLP_POT_PROVIDER_BASE_URL=http://localhost:4417 \
    JAVA_OPTS="-XX:MaxRAMPercentage=75 -XX:+ExitOnOutOfMemoryError"
# PORT (Render/Fly/Heroku) or SERVER_PORT (fallback) is read at runtime via application.yml.

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:8080/api/health || exit 1

ENTRYPOINT ["sh", "-c", "node /opt/pot-provider/build/main.js --port ${POT_PROVIDER_PORT:-4417} & exec java $JAVA_OPTS -jar /app/tubeshadow.jar"]
