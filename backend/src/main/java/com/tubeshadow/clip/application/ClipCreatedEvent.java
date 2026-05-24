package com.tubeshadow.clip.application;

import java.util.UUID;

public record ClipCreatedEvent(UUID clipId, UUID userId, String transcript) {
}
