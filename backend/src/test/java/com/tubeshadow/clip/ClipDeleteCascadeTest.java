package com.tubeshadow.clip;

import com.tubeshadow.SpringIntegrationTest;
import com.tubeshadow.analysis.domain.ClipAnalysis;
import com.tubeshadow.analysis.repository.ClipAnalysisRepository;
import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.clip.api.dto.ClipCreateRequest;
import com.tubeshadow.clip.application.ClipService;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.review.domain.ReviewItem;
import com.tubeshadow.review.repository.ReviewItemRepository;
import com.tubeshadow.video.domain.TranscriptSegment;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.repository.VideoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatNoException;

/**
 * Regression: deleting a clip that has both an analysis row and a review-item row
 * used to throw StaleObjectStateException, because the @EventListener-based cleanup
 * loaded entities into the Hibernate session that then raced with the DB-level
 * CASCADE at flush. Listeners were switched to @Modifying queries to fix this.
 */
class ClipDeleteCascadeTest extends SpringIntegrationTest {

    @Autowired UserRepository users;
    @Autowired VideoRepository videos;
    @Autowired ClipRepository clips;
    @Autowired ClipAnalysisRepository analyses;
    @Autowired ReviewItemRepository reviewItems;
    @Autowired ClipService clipService;
    @Autowired TransactionTemplate tx;

    @Test
    void deletingClipWithAnalysisAndReviewItemSucceeds() {
        var prepared = tx.execute(s -> {
            User user = users.save(User.createNew("cascade@example.com", "h", "C"));
            Video video = Video.createNew("cascadevid01", "Cascade test");
            video.attachTranscript(List.of(new TranscriptSegment(0, 1500, "Hello world")));
            videos.save(video);

            var resp = clipService.create(user.getId(),
                    new ClipCreateRequest(video.getId(), 0L, 1500L, "Cascade clip", List.of("smoke")));
            reviewItems.save(ReviewItem.createNew(user.getId(), resp.id(), LocalDate.now()));
            analyses.save(ClipAnalysis.pending(resp.id()));
            return new Prepared(user.getId(), resp.id());
        });

        assertThatNoException().isThrownBy(() ->
                clipService.delete(prepared.userId, prepared.clipId));

        // Verify the cascade fully cleaned up
        tx.execute(s -> {
            assertThat(clips.findById(prepared.clipId)).isEmpty();
            assertThat(analyses.findByClipId(prepared.clipId)).isEmpty();
            assertThat(reviewItems.findByUserIdAndClipId(prepared.userId, prepared.clipId)).isEmpty();
            return null;
        });
    }

    private record Prepared(java.util.UUID userId, java.util.UUID clipId) {}
}
