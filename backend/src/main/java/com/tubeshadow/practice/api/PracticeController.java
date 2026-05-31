package com.tubeshadow.practice.api;

import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.common.web.ApiResponse;
import com.tubeshadow.practice.api.dto.PracticeProgressResponse;
import com.tubeshadow.practice.api.dto.PracticeRepRequest;
import com.tubeshadow.practice.application.PracticeProgressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/practice")
@Tag(name = "Practice", description = "드릴 진행/스트릭 (패턴·콜로케이션 공용)")
@SecurityRequirement(name = "bearerAuth")
public class PracticeController {

    private final PracticeProgressService service;

    public PracticeController(PracticeProgressService service) {
        this.service = service;
    }

    @GetMapping("/progress")
    @Operation(summary = "오늘 드릴 진행/스트릭 조회 (localDate = 클라이언트 로컬 날짜)")
    public ApiResponse<PracticeProgressResponse> progress(
            @CurrentUser AuthenticatedUser user,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate localDate) {
        return ApiResponse.ok(service.get(user.id(), localDate == null ? LocalDate.now() : localDate));
    }

    @PostMapping("/rep")
    @Operation(summary = "드릴 1회 반복 기록 — 스트릭/오늘 횟수 갱신")
    public ApiResponse<PracticeProgressResponse> rep(
            @CurrentUser AuthenticatedUser user,
            @RequestBody(required = false) PracticeRepRequest request) {
        LocalDate today = (request != null && request.localDate() != null) ? request.localDate() : LocalDate.now();
        return ApiResponse.ok(service.recordRep(user.id(), today));
    }
}
