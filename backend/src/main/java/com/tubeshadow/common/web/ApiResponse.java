package com.tubeshadow.common.web;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;

/**
 * Standard envelope for API responses.
 * Pattern: Response wrapper — keeps shape predictable for frontend TanStack Query layer
 * (always `{ data, error, timestamp }`), so caller code does not branch on success/failure shape.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
        T data,
        ApiError error,
        Instant timestamp
) {
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(data, null, Instant.now());
    }

    public static <T> ApiResponse<T> fail(ApiError error) {
        return new ApiResponse<>(null, error, Instant.now());
    }

    public record ApiError(String code, String message) {}
}
