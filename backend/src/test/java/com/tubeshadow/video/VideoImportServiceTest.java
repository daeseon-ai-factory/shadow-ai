package com.tubeshadow.video;

import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.video.application.VideoImportService;
import com.tubeshadow.video.domain.TranscriptSegment;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.infrastructure.NoTranscriptAvailableException;
import com.tubeshadow.video.infrastructure.YoutubeMetadataClient;
import com.tubeshadow.video.infrastructure.YoutubeTranscriptClient;
import com.tubeshadow.video.repository.VideoRepository;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class VideoImportServiceTest {

    private final VideoRepository repo = mock(VideoRepository.class);
    private final YoutubeMetadataClient meta = mock(YoutubeMetadataClient.class);
    private final YoutubeTranscriptClient transcript = mock(YoutubeTranscriptClient.class);
    private final VideoImportService service = new VideoImportService(repo, meta, transcript);

    @Test
    void fetchesAndPersistsNewVideo() {
        String url = "https://www.youtube.com/watch?v=abcdefghijk";
        when(repo.findByYoutubeId("abcdefghijk")).thenReturn(Optional.empty());
        when(meta.fetch("abcdefghijk")).thenReturn(
                new YoutubeMetadataClient.YoutubeMetadata("Hello", "Channel", "https://thumb"));
        when(transcript.fetch("abcdefghijk")).thenReturn(
                List.of(new TranscriptSegment(0, 1000, "Hi"), new TranscriptSegment(1000, 2000, "There")));
        when(repo.save(any(Video.class))).thenAnswer(inv -> inv.getArgument(0));

        Video result = service.importByUrl(url);

        ArgumentCaptor<Video> captor = ArgumentCaptor.forClass(Video.class);
        verify(repo).save(captor.capture());
        assertThat(captor.getValue().getTitle()).isEqualTo("Hello");
        assertThat(captor.getValue().getTranscriptSegments()).hasSize(2);
        assertThat(captor.getValue().getTranscriptStatus()).isEqualTo(Video.TranscriptStatus.READY);
        assertThat(result.getYoutubeId()).isEqualTo("abcdefghijk");
    }

    @Test
    void returnsExistingWithoutNetworkCall() {
        Video existing = Video.createNew("abcdefghijk", "Existing");
        when(repo.findByYoutubeId("abcdefghijk")).thenReturn(Optional.of(existing));

        Video result = service.importByUrl("https://youtu.be/abcdefghijk");

        assertThat(result).isSameAs(existing);
        verify(meta, never()).fetch(any());
        verify(transcript, never()).fetch(any());
        verify(repo, never()).save(any());
    }

    @Test
    void marksTranscriptUnavailableWhenFetchFails() {
        when(repo.findByYoutubeId("abcdefghijk")).thenReturn(Optional.empty());
        when(meta.fetch("abcdefghijk")).thenReturn(
                new YoutubeMetadataClient.YoutubeMetadata("T", "C", "u"));
        when(transcript.fetch("abcdefghijk")).thenThrow(new NoTranscriptAvailableException("abcdefghijk"));
        when(repo.save(any(Video.class))).thenAnswer(inv -> inv.getArgument(0));

        Video result = service.importByUrl("abcdefghijk");

        assertThat(result.getTranscriptStatus()).isEqualTo(Video.TranscriptStatus.UNAVAILABLE);
        verify(repo, times(1)).save(any(Video.class));
    }

    @Test
    void rejectsInvalidUrl() {
        assertThatThrownBy(() -> service.importByUrl("not-a-url"))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("YouTube");
    }
}
