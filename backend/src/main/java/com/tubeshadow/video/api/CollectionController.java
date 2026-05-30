package com.tubeshadow.video.api;

import com.tubeshadow.common.web.ApiResponse;
import com.tubeshadow.video.api.dto.CollectionResponse;
import com.tubeshadow.video.application.CollectionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/collections")
@Tag(name = "Collection", description = "큐레이션 컬렉션")
@SecurityRequirement(name = "bearerAuth")
public class CollectionController {

    private final CollectionService collectionService;

    public CollectionController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    @Operation(summary = "공개 컬렉션 목록")
    public ApiResponse<List<CollectionResponse>> list() {
        return ApiResponse.ok(collectionService.listPublic());
    }

    @GetMapping("/{idOrSlug}")
    @Operation(summary = "컬렉션 + 영상 목록")
    public ApiResponse<CollectionResponse> get(@PathVariable String idOrSlug) {
        return ApiResponse.ok(collectionService.getByIdOrSlug(idOrSlug));
    }
}
