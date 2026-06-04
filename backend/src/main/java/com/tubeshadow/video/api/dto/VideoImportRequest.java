package com.tubeshadow.video.api.dto;

import com.tubeshadow.video.domain.TranscriptSegment;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

/**
 * @param url               the YouTube URL or 11-char id.
 * @param transcriptSegments optional — when the client fetched the transcript on-device (mobile,
 *                           on a residential IP) it sends it here and the server skips yt-dlp.
 *                           Web omits this and the server fetches server-side.
 * @param title             optional device-read title; a fallback used only if server oEmbed fails.
 */
public record VideoImportRequest(
        @NotBlank String url,
        List<TranscriptSegment> transcriptSegments,
        String title
) {
}
