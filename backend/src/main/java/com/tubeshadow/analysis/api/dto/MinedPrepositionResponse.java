package com.tubeshadow.analysis.api.dto;

import java.util.List;
import java.util.UUID;

/**
 * The prepositions a user has mined across their own clips, grouped by preposition.
 * Feeds the "내 클립에서" part of the preposition study page.
 */
public record MinedPrepositionResponse(String preposition, List<Occurrence> occurrences) {

    /** One appearance of the preposition, with the clip it came from. */
    public record Occurrence(UUID clipId, String clipName, String phrase, String sense) {
    }
}
