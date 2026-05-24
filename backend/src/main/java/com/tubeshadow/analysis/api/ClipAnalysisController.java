package com.tubeshadow.analysis.api;

import com.tubeshadow.analysis.api.dto.ClipAnalysisResponse;
import com.tubeshadow.analysis.application.ClipAnalysisService;
import com.tubeshadow.analysis.domain.ClipAnalysis;
import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.common.web.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/clips/{clipId}/analysis")
@Tag(name = "Analysis", description = "클립 AI 분석")
@SecurityRequirement(name = "bearerAuth")
public class ClipAnalysisController {

    private final ClipAnalysisService service;

    public ClipAnalysisController(ClipAnalysisService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "분석 조회 — pending 시 202, ready 시 200, failed 시 200 + error_message")
    public ResponseEntity<ApiResponse<ClipAnalysisResponse>> get(@PathVariable UUID clipId,
                                                                  @CurrentUser AuthenticatedUser user) {
        ClipAnalysis analysis = service.getForUser(user.id(), clipId);
        HttpStatus status = analysis.getStatus() == ClipAnalysis.AnalysisStatus.PENDING
                ? HttpStatus.ACCEPTED
                : HttpStatus.OK;
        return ResponseEntity.status(status).body(ApiResponse.ok(ClipAnalysisResponse.from(analysis)));
    }

    @PostMapping("/regenerate")
    @Operation(summary = "기존 분석 삭제 후 재생성 트리거 → 202 pending 반환")
    public ResponseEntity<ApiResponse<ClipAnalysisResponse>> regenerate(@PathVariable UUID clipId,
                                                                         @CurrentUser AuthenticatedUser user) {
        ClipAnalysis fresh = service.regenerate(user.id(), clipId);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(ApiResponse.ok(ClipAnalysisResponse.from(fresh)));
    }
}
