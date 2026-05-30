package com.tubeshadow.common.web;

import com.tubeshadow.common.exception.BusinessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Void>> handleBusiness(BusinessException ex) {
        log.warn("Business exception {} - {}: {}", ex.status(), ex.code(), ex.getMessage());
        return ResponseEntity
                .status(ex.status())
                .body(ApiResponse.fail(new ApiResponse.ApiError(ex.code(), ex.getMessage())));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return ResponseEntity
                .badRequest()
                .body(ApiResponse.fail(new ApiResponse.ApiError("VALIDATION_FAILED", message)));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity
                .badRequest()
                .body(ApiResponse.fail(new ApiResponse.ApiError("BAD_REQUEST", ex.getMessage())));
    }

    @ExceptionHandler(org.springframework.web.multipart.MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponse<Void>> handleMaxUploadSize(
            org.springframework.web.multipart.MaxUploadSizeExceededException ex) {
        return ResponseEntity
                .status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body(ApiResponse.fail(new ApiResponse.ApiError("FILE_TOO_LARGE",
                        "업로드 파일 크기가 허용 한도를 초과합니다.")));
    }

    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<Void>> handleDataIntegrity(
            org.springframework.dao.DataIntegrityViolationException ex) {
        // Most common case: unique constraint violation from a concurrent signup race
        // that lost to the unique index. Surface as 409 instead of a generic 500.
        log.warn("Data integrity violation: {}", ex.getMostSpecificCause().getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ApiResponse.fail(new ApiResponse.ApiError("CONFLICT",
                        "이미 존재하는 데이터입니다.")));
    }

    // --- Client errors that are RuntimeExceptions. Without explicit handlers these
    // fall through to the 500 catch-all below, polluting error dashboards and masking
    // real server faults. They are all 4xx (the client sent something malformed).

    @ExceptionHandler(org.springframework.http.converter.HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotReadable(
            org.springframework.http.converter.HttpMessageNotReadableException ex) {
        // Malformed / empty / unparseable JSON request body.
        log.debug("Unreadable request body: {}", ex.getMessage());
        return ResponseEntity
                .badRequest()
                .body(ApiResponse.fail(new ApiResponse.ApiError("MALFORMED_REQUEST",
                        "요청 본문을 읽을 수 없습니다.")));
    }

    @ExceptionHandler(org.springframework.web.method.annotation.MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<Void>> handleTypeMismatch(
            org.springframework.web.method.annotation.MethodArgumentTypeMismatchException ex) {
        // e.g. GET /api/clips/not-a-uuid, ?page=abc. Report the offending parameter name
        // only — never echo the raw value or leak a stacktrace.
        return ResponseEntity
                .badRequest()
                .body(ApiResponse.fail(new ApiResponse.ApiError("TYPE_MISMATCH",
                        "'" + ex.getName() + "' 파라미터 형식이 올바르지 않습니다.")));
    }

    @ExceptionHandler(org.springframework.web.bind.MissingServletRequestParameterException.class)
    public ResponseEntity<ApiResponse<Void>> handleMissingParam(
            org.springframework.web.bind.MissingServletRequestParameterException ex) {
        return ResponseEntity
                .badRequest()
                .body(ApiResponse.fail(new ApiResponse.ApiError("MISSING_PARAMETER",
                        "'" + ex.getParameterName() + "' 파라미터가 필요합니다.")));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Void>> handleUnexpected(RuntimeException ex) {
        log.error("Unhandled exception", ex);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.fail(new ApiResponse.ApiError("INTERNAL_ERROR", "Something went wrong")));
    }
}
