package com.tubeshadow.clip.application;

import java.util.UUID;

public record ClipDeletedEvent(UUID clipId, UUID userId) {
}
