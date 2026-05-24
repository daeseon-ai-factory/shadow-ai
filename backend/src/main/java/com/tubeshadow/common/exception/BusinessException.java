package com.tubeshadow.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Base class for domain/business errors.
 * Pattern: Strategy via subclass — each domain throws its own typed exception
 * (NotFoundException, ConflictException, ...) carrying its own HttpStatus.
 * The handler does NOT branch on `instanceof`; it simply reads {@link #status()}.
 */
public class BusinessException extends RuntimeException {

    private final HttpStatus status;
    private final String code;

    public BusinessException(HttpStatus status, String code, String message) {
        super(message);
        this.status = status;
        this.code = code;
    }

    public HttpStatus status() {
        return status;
    }

    public String code() {
        return code;
    }
}
