package com.tubeshadow.video.api;

import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.common.web.ApiResponse;
import com.tubeshadow.video.api.dto.VideoImportRequest;
import com.tubeshadow.video.api.dto.VideoResponse;
import com.tubeshadow.video.application.VideoImportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/videos")
@Tag(name = "Video", description = "YouTube 영상 임포트 / 조회")
@SecurityRequirement(name = "bearerAuth")
public class VideoController {

    private final VideoImportService importService;

    public VideoController(VideoImportService importService) {
        this.importService = importService;
    }

    @PostMapping("/import")
    @Operation(summary = "YouTube URL 임포트")
    public ApiResponse<VideoResponse> importVideo(@Valid @RequestBody VideoImportRequest request,
                                                  @CurrentUser AuthenticatedUser user) {
        return ApiResponse.ok(VideoResponse.from(
                importService.importByUrl(request.url(), request.transcriptSegments(), request.title())));
    }

    @GetMapping("/{id}")
    @Operation(summary = "영상 + 자막 조회")
    public ApiResponse<VideoResponse> getVideo(@PathVariable UUID id,
                                               @CurrentUser AuthenticatedUser user) {
        return ApiResponse.ok(VideoResponse.from(importService.getOrThrow(id)));
    }
}
