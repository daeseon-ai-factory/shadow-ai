package com.tubeshadow.practice.api;

import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.common.web.ApiResponse;
import com.tubeshadow.practice.api.dto.ComposeCheckRequest;
import com.tubeshadow.practice.api.dto.ComposeFeedback;
import com.tubeshadow.practice.api.dto.GradeRequest;
import com.tubeshadow.practice.api.dto.GradeResponse;
import com.tubeshadow.practice.api.dto.InterviewCheckRequest;
import com.tubeshadow.practice.api.dto.InterviewCheckResponse;
import com.tubeshadow.practice.api.dto.MockNextRequest;
import com.tubeshadow.practice.api.dto.MockNextResponse;
import com.tubeshadow.practice.api.dto.PracticeCardResponse;
import com.tubeshadow.practice.api.dto.PracticeProgressResponse;
import com.tubeshadow.practice.api.dto.PracticeRepRequest;
import com.tubeshadow.practice.api.dto.SeedCandidateResponse;
import com.tubeshadow.practice.api.dto.SentenceTransformSetResponse;
import com.tubeshadow.practice.api.dto.TransformCheckRequest;
import com.tubeshadow.practice.api.dto.TransformCheckResponse;
import com.tubeshadow.practice.api.dto.TransformGenerateRequest;
import com.tubeshadow.practice.api.dto.TranscribeResponse;
import com.tubeshadow.practice.application.CompositionService;
import com.tubeshadow.practice.infrastructure.TranscriptionClient;
import com.tubeshadow.practice.prompt.MockInterviewPrompt;
import com.tubeshadow.practice.application.PracticeProgressService;
import com.tubeshadow.practice.application.PracticeSrsService;
import com.tubeshadow.practice.application.SeedService;
import com.tubeshadow.practice.application.TransformService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/practice")
@Tag(name = "Practice", description = "드릴 진행/스트릭 (패턴·콜로케이션 공용)")
@SecurityRequirement(name = "bearerAuth")
public class PracticeController {

    private final PracticeProgressService service;
    private final PracticeSrsService srsService;
    private final CompositionService compositionService;
    private final TransformService transformService;
    private final SeedService seedService;
    private final TranscriptionClient transcriptionClient;

    public PracticeController(PracticeProgressService service, PracticeSrsService srsService,
                             CompositionService compositionService, TransformService transformService,
                             SeedService seedService, TranscriptionClient transcriptionClient) {
        this.service = service;
        this.srsService = srsService;
        this.compositionService = compositionService;
        this.transformService = transformService;
        this.seedService = seedService;
        this.transcriptionClient = transcriptionClient;
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

    @GetMapping("/srs")
    @Operation(summary = "내 모든 드릴 카드의 SRS 상태 (due/new 계산은 클라이언트가)")
    public ApiResponse<List<PracticeCardResponse>> srsStates(@CurrentUser AuthenticatedUser user) {
        return ApiResponse.ok(srsService.states(user.id()));
    }

    @PostMapping("/srs/grade")
    @Operation(summary = "드릴 카드 1장 채점 — Leitner 갱신 + 오늘 1회 반복 기록")
    public ApiResponse<GradeResponse> grade(@CurrentUser AuthenticatedUser user,
                                            @Valid @RequestBody GradeRequest request) {
        LocalDate today = request.localDate() != null ? request.localDate() : LocalDate.now();
        PracticeCardResponse card = srsService.grade(user.id(), request.cardKey(), request.correct(), today);
        PracticeProgressResponse progress = service.recordRep(user.id(), today);
        return ApiResponse.ok(new GradeResponse(card, progress));
    }

    @PostMapping("/compose/check")
    @Operation(summary = "영작 1문장 AI 채점 — 패턴/청크를 맞게 썼는지 + 더 나은 버전")
    public ApiResponse<ComposeFeedback> composeCheck(@CurrentUser AuthenticatedUser user,
                                                     @Valid @RequestBody ComposeCheckRequest request) {
        return ApiResponse.ok(compositionService.check(request.target(), request.gloss(), request.sentence()));
    }

    @PostMapping(value = "/transcribe", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "음성 전사 (Whisper) — 개발 용어 정확 인식")
    public ApiResponse<TranscribeResponse> transcribe(@CurrentUser AuthenticatedUser user,
                                                      @RequestParam("file") MultipartFile file) throws IOException {
        return ApiResponse.ok(new TranscribeResponse(
                transcriptionClient.transcribe(file.getBytes(), file.getOriginalFilename())));
    }

    @PostMapping("/interview/mock")
    @Operation(summary = "AI 모의면접 — 빈 history면 오프닝, 아니면 마지막 답변에 대한 follow-up 질문")
    public ApiResponse<MockNextResponse> mockNext(@CurrentUser AuthenticatedUser user,
                                                  @Valid @RequestBody MockNextRequest request) {
        List<MockInterviewPrompt.Turn> turns = request.history() == null
                ? List.of()
                : request.history().stream()
                    .map(h -> new MockInterviewPrompt.Turn(h.role(), h.text()))
                    .toList();
        long seed = request.seed() != null ? request.seed() : System.nanoTime();
        return ApiResponse.ok(compositionService.mockNext(turns, seed));
    }

    @PostMapping("/interview/check")
    @Operation(summary = "인터뷰 답변 AI 채점 (관대) — 핵심만 맞으면 통과, 억지 교정 X")
    public ApiResponse<InterviewCheckResponse> interviewCheck(@CurrentUser AuthenticatedUser user,
                                                              @Valid @RequestBody InterviewCheckRequest request) {
        return ApiResponse.ok(compositionService.interviewCheck(request.question(), request.answer()));
    }

    @PostMapping("/compose/transforms")
    @Operation(summary = "기준 문장 1개 → 15개 문법 변형 생성 (유저별 캐시, 시드당 LLM 1회)")
    public ApiResponse<SentenceTransformSetResponse> generateTransforms(
            @CurrentUser AuthenticatedUser user,
            @Valid @RequestBody TransformGenerateRequest request) {
        return ApiResponse.ok(transformService.generate(user.id(), request.baseSentence(), request.baseGloss()));
    }

    @PostMapping("/compose/transform-check")
    @Operation(summary = "변형 1개 AI 채점 (선택) — 변형을 맞게 했는지 + 더 나은 버전")
    public ApiResponse<TransformCheckResponse> checkTransform(
            @CurrentUser AuthenticatedUser user,
            @Valid @RequestBody TransformCheckRequest request) {
        return ApiResponse.ok(transformService.check(
                request.op(), request.baseSentence(), request.model(), request.attempt()));
    }

    @GetMapping("/seeds")
    @Operation(summary = "오늘의 문장 시드 후보 — 내 클립 분석에서 추출한 영어 문장(+한글)")
    public ApiResponse<List<SeedCandidateResponse>> seeds(@CurrentUser AuthenticatedUser user) {
        return ApiResponse.ok(seedService.seedsFor(user.id()));
    }
}
