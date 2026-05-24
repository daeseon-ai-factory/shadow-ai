package com.tubeshadow.review.application;

import com.tubeshadow.clip.application.ClipCreatedEvent;
import com.tubeshadow.clip.application.ClipDeletedEvent;
import com.tubeshadow.clip.domain.Clip;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.common.exception.NotFoundException;
import com.tubeshadow.review.api.dto.ReviewQueueItem;
import com.tubeshadow.review.api.dto.StreakResponse;
import com.tubeshadow.review.domain.ReviewItem;
import com.tubeshadow.review.domain.Sm2Calculator;
import com.tubeshadow.review.repository.ReviewItemRepository;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.repository.VideoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;

@Service
public class ReviewService {

    private static final Logger log = LoggerFactory.getLogger(ReviewService.class);

    private final ReviewItemRepository reviewRepository;
    private final ClipRepository clipRepository;
    private final VideoRepository videoRepository;
    private final Sm2Calculator calculator;

    public ReviewService(ReviewItemRepository reviewRepository,
                         ClipRepository clipRepository,
                         VideoRepository videoRepository) {
        this.reviewRepository = reviewRepository;
        this.clipRepository = clipRepository;
        this.videoRepository = videoRepository;
        this.calculator = new Sm2Calculator();
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void onClipCreated(ClipCreatedEvent event) {
        if (reviewRepository.findByUserIdAndClipId(event.userId(), event.clipId()).isPresent()) {
            return;
        }
        reviewRepository.save(ReviewItem.createNew(event.userId(), event.clipId(), LocalDate.now()));
    }

    @EventListener
    @Transactional
    public void onClipDeleted(ClipDeletedEvent event) {
        reviewRepository.findByUserIdAndClipId(event.userId(), event.clipId())
                .ifPresent(reviewRepository::delete);
    }

    @Transactional(readOnly = true)
    public List<ReviewQueueItem> queue(UUID userId, LocalDate cutoff) {
        List<ReviewItem> items = reviewRepository.findByUserIdAndDueDateLessThanEqualOrderByDueDateAsc(userId, cutoff);
        if (items.isEmpty()) return List.of();

        // Batch fetch clips, then batch fetch videos → avoids N+1 across the queue.
        List<UUID> clipIds = items.stream().map(ReviewItem::getClipId).distinct().toList();
        java.util.Map<UUID, Clip> clipsById = clipRepository.findAllById(clipIds).stream()
                .collect(java.util.stream.Collectors.toMap(Clip::getId, c -> c));

        List<UUID> videoIds = clipsById.values().stream().map(Clip::getVideoId).distinct().toList();
        java.util.Map<UUID, Video> videosById = videoRepository.findAllById(videoIds).stream()
                .collect(java.util.stream.Collectors.toMap(Video::getId, v -> v));

        return items.stream()
                .map(item -> {
                    Clip clip = clipsById.get(item.getClipId());
                    if (clip == null) return null;
                    Video video = videosById.get(clip.getVideoId());
                    if (video == null) return null;
                    return ReviewQueueItem.of(item, com.tubeshadow.clip.api.dto.ClipResponse.from(clip, video));
                })
                .filter(java.util.Objects::nonNull)
                .toList();
    }

    @Transactional
    public ReviewItem respond(UUID userId, UUID reviewItemId, int quality) {
        ReviewItem item = reviewRepository.findByIdAndUserId(reviewItemId, userId)
                .orElseThrow(() -> new NotFoundException("REVIEW_NOT_FOUND", "복습 항목이 없습니다"));
        Sm2Calculator.Sm2Result result = calculator.apply(item, quality);
        item.apply(result.easiness(), result.intervalDays(), result.repetitions(), result.nextDueDate());
        return item;
    }

    @Transactional(readOnly = true)
    public StreakResponse streak(UUID userId) {
        long dueToday = reviewRepository.countByUserIdAndDueDateLessThanEqual(userId, LocalDate.now());
        List<Object> reviewDateValues = reviewRepository.findReviewDatesByUserId(userId);
        int streak = computeStreak(reviewDateValues);
        return new StreakResponse(dueToday, streak);
    }

    int computeStreak(List<Object> dateLikeValues) {
        if (dateLikeValues == null || dateLikeValues.isEmpty()) return 0;
        LocalDate today = LocalDate.now();
        LocalDate cursor = today;
        int streak = 0;
        java.util.Set<LocalDate> reviewed = new java.util.HashSet<>();
        for (Object v : dateLikeValues) {
            LocalDate d = toLocalDate(v);
            if (d != null) reviewed.add(d);
        }
        while (reviewed.contains(cursor)) {
            streak++;
            cursor = cursor.minusDays(1);
        }
        // If today wasn't reviewed but yesterday was, still keep streak from yesterday.
        if (streak == 0 && reviewed.contains(today.minusDays(1))) {
            cursor = today.minusDays(1);
            while (reviewed.contains(cursor)) {
                streak++;
                cursor = cursor.minusDays(1);
            }
        }
        return streak;
    }

    private LocalDate toLocalDate(Object v) {
        if (v == null) return null;
        if (v instanceof LocalDate ld) return ld;
        if (v instanceof java.sql.Date sd) return sd.toLocalDate();
        if (v instanceof java.time.Instant in) return in.atZone(ZoneId.systemDefault()).toLocalDate();
        log.debug("Unknown date type for streak calc: {}", v.getClass());
        return null;
    }

}
