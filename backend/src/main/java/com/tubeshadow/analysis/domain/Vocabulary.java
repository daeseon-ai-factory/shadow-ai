package com.tubeshadow.analysis.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public record Vocabulary(String word, String meaning, String level) {

    @JsonCreator
    public static Vocabulary of(
            @JsonProperty("word") String word,
            @JsonProperty("meaning") String meaning,
            @JsonProperty("level") String level) {
        return new Vocabulary(word, meaning, level);
    }
}
