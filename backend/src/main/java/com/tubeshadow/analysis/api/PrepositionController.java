package com.tubeshadow.analysis.api;

import com.tubeshadow.analysis.api.dto.MinedPrepositionResponse;
import com.tubeshadow.analysis.application.PrepositionStudyService;
import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.common.web.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/prepositions")
@Tag(name = "Preposition", description = "전치사 학습 — 내 클립에서 모은 전치사 집계")
@SecurityRequirement(name = "bearerAuth")
public class PrepositionController {

    private final PrepositionStudyService service;

    public PrepositionController(PrepositionStudyService service) {
        this.service = service;
    }

    @GetMapping("/mined")
    @Operation(summary = "내가 클립에서 모은 전치사 (전치사별 그룹)")
    public ApiResponse<List<MinedPrepositionResponse>> mined(@CurrentUser AuthenticatedUser user) {
        return ApiResponse.ok(service.minedFor(user.id()));
    }
}
