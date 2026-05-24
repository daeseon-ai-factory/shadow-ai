package com.tubeshadow.video.infrastructure;

import com.tubeshadow.common.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class NoTranscriptAvailableException extends BusinessException {
    public NoTranscriptAvailableException(String videoId) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, "NO_TRANSCRIPT",
                "이 영상에는 자막이 없습니다. (videoId=" + videoId + ")");
    }
}
