package com.tubeshadow.integration;

import com.tubeshadow.PostgresContainerTest;
import com.tubeshadow.analysis.domain.ClipAnalysis;
import com.tubeshadow.analysis.domain.KeyExpression;
import com.tubeshadow.analysis.domain.Vocabulary;
import com.tubeshadow.analysis.repository.ClipAnalysisRepository;
import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.clip.domain.Clip;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.recording.domain.Recording;
import com.tubeshadow.recording.repository.RecordingRepository;
import com.tubeshadow.review.domain.ReviewItem;
import com.tubeshadow.review.repository.ReviewItemRepository;
import com.tubeshadow.video.domain.TranscriptSegment;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.repository.VideoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class DomainIntegrationTest extends PostgresContainerTest {

    @Autowired UserRepository users;
    @Autowired VideoRepository videos;
    @Autowired ClipRepository clips;
    @Autowired ClipAnalysisRepository analyses;
    @Autowired RecordingRepository recordings;
    @Autowired ReviewItemRepository reviewItems;

    @Test
    void fullDomainRoundTrip() {
        // User
        User u = users.save(User.createNew("intg@example.com", "h", "Integ"));

        // Video with transcript segments (JSONB)
        Video v = Video.createNew("dQw4w9WgXcQ", "Sample");
        v.applyMetadata("Channel", 213, "https://thumb");
        v.attachTranscript(List.of(
                new TranscriptSegment(0, 1500, "Hello world"),
                new TranscriptSegment(1500, 3000, "How are you")
        ));
        videos.save(v);

        // Clip (JSONB tags)
        Clip c = Clip.createNew(u.getId(), v.getId(), 0, 3000, "Greeting", List.of("greeting", "basic"));
        c.attachTranscript("Hello world. How are you");
        clips.save(c);

        // Analysis (JSONB lists)
        ClipAnalysis a = ClipAnalysis.pending(c.getId());
        a.markReady(
                List.of("Simple greeting"),
                List.of(new KeyExpression("how are you", "안부 묻기", "casual")),
                List.of(new Vocabulary("greeting", "인사", "basic")),
                "Two short greetings.",
                "안녕, 잘 지내?",
                List.of(),
                null,
                "claude-haiku-4-5-20251001"
        );
        analyses.save(a);

        // Recording
        Recording r = Recording.createNew(u.getId(), c.getId(), "/tmp/r.webm", "audio/webm", 3000, 12345);
        recordings.save(r);

        // ReviewItem
        ReviewItem ri = ReviewItem.createNew(u.getId(), c.getId(), LocalDate.now());
        reviewItems.save(ri);

        // Reload + verify
        Video reloaded = videos.findById(v.getId()).orElseThrow();
        assertThat(reloaded.getTranscriptSegments()).hasSize(2);
        assertThat(reloaded.getTranscriptStatus()).isEqualTo(Video.TranscriptStatus.READY);

        Clip reloadedClip = clips.findById(c.getId()).orElseThrow();
        assertThat(reloadedClip.getTags()).containsExactly("greeting", "basic");
        assertThat(reloadedClip.getTranscript()).contains("Hello world");

        ClipAnalysis reloadedAnalysis = analyses.findByClipId(c.getId()).orElseThrow();
        assertThat(reloadedAnalysis.getStatus()).isEqualTo(ClipAnalysis.AnalysisStatus.READY);
        assertThat(reloadedAnalysis.getKeyExpressions()).hasSize(1);
        assertThat(reloadedAnalysis.getKeyExpressions().get(0).meaning()).isEqualTo("안부 묻기");

        assertThat(recordings.findByClipIdAndUserIdOrderByCreatedAtAsc(c.getId(), u.getId())).hasSize(1);

        List<ReviewItem> due = reviewItems.findByUserIdAndDueDateLessThanEqualOrderByDueDateAsc(u.getId(), LocalDate.now());
        assertThat(due).hasSize(1);
        assertThat(due.get(0).getEasiness()).isEqualTo(2.5);
    }
}
