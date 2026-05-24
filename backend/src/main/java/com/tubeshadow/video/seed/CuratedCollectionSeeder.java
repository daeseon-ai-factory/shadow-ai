package com.tubeshadow.video.seed;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;
import com.tubeshadow.video.application.VideoImportService;
import com.tubeshadow.video.domain.Collection;
import com.tubeshadow.video.domain.CollectionVideo;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.repository.CollectionRepository;
import com.tubeshadow.video.repository.CollectionVideoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
 * On boot: ensure the curated public collection exists and is populated from
 * curated-videos.yml. Idempotent — each video is added at most once per collection.
 * Import failures (bad URL, missing transcript) are logged and skipped so a
 * single broken entry never breaks startup.
 */
@Component
@ConditionalOnProperty(prefix = "tubeshadow.seed.curated", name = "enabled", havingValue = "true", matchIfMissing = true)
public class CuratedCollectionSeeder implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(CuratedCollectionSeeder.class);

    private final CollectionRepository collections;
    private final CollectionVideoRepository collectionVideos;
    private final VideoImportService videoImportService;
    private final Resource seedFile;

    public CuratedCollectionSeeder(CollectionRepository collections,
                                   CollectionVideoRepository collectionVideos,
                                   VideoImportService videoImportService,
                                   @Value("classpath:curated-videos.yml") Resource seedFile) {
        this.collections = collections;
        this.collectionVideos = collectionVideos;
        this.videoImportService = videoImportService;
        this.seedFile = seedFile;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (!seedFile.exists()) {
            log.info("Seed file curated-videos.yml not present — skipping curation seeding");
            return;
        }
        SeedFile parsed;
        try (InputStream in = seedFile.getInputStream()) {
            ObjectMapper yaml = YAMLMapper.builder().build();
            parsed = yaml.readValue(in, SeedFile.class);
        } catch (IOException ex) {
            log.error("Failed to read curated-videos.yml: {}", ex.getMessage());
            return;
        }
        if (parsed == null || parsed.collection == null) return;

        Collection collection = collections.findBySlug(parsed.collection.slug)
                .orElseGet(() -> collections.save(Collection.createPublic(
                        parsed.collection.slug,
                        parsed.collection.name,
                        parsed.collection.description)));

        List<CollectionVideo> existing = collectionVideos
                .findByIdCollectionIdOrderByPositionAsc(collection.getId());
        int nextPosition = existing.stream().mapToInt(CollectionVideo::getPosition).max().orElse(0) + 1;

        if (parsed.videos == null) return;
        for (SeedVideo seed : parsed.videos) {
            try {
                Video video = videoImportService.importByUrl(seed.url);
                if (existing.stream().anyMatch(cv -> cv.getVideoId().equals(video.getId()))) {
                    continue;
                }
                collectionVideos.save(CollectionVideo.of(
                        collection.getId(), video.getId(), nextPosition++, seed.category));
                log.info("Seeded curated video: {} ({})", video.getTitle(), seed.url);
            } catch (Exception ex) {
                log.warn("Skipped curated video {}: {}", seed.url, ex.getMessage());
            }
        }
    }

    public static class SeedFile {
        public SeedCollection collection;
        public List<SeedVideo> videos;
    }

    public static class SeedCollection {
        public String slug;
        public String name;
        public String description;
    }

    public static class SeedVideo {
        public String url;
        public String category;
    }
}
