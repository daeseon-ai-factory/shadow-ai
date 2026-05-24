package com.tubeshadow.clip.api;

import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.clip.application.ClipService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/clips/export")
@Tag(name = "Clip", description = "라이브러리 내보내기")
@SecurityRequirement(name = "bearerAuth")
public class ClipExportController {

    private final ClipService clipService;

    public ClipExportController(ClipService clipService) {
        this.clipService = clipService;
    }

    @GetMapping
    @Operation(summary = "전체 라이브러리 JSON 다운로드 (envelope 없음 - 파일)")
    public ResponseEntity<Map<String, Object>> export(@CurrentUser AuthenticatedUser user) {
        // Pull a generous page (up to 1000). For larger libraries we'd stream.
        var page = clipService.list(user.id(), null, null, "newest", 0, 1000);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("exportedAt", Instant.now().toString());
        body.put("userId", user.id());
        body.put("totalClips", page.total());
        body.put("clips", page.items());

        String filename = "tubeshadow-library-" + LocalDate.now() + ".json";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.APPLICATION_JSON)
                .body(body);
    }
}
