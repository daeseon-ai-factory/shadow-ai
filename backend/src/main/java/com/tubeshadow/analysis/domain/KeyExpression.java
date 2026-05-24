package com.tubeshadow.analysis.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public record KeyExpression(String phrase, String meaning, String usage) {

    @JsonCreator
    public static KeyExpression of(
            @JsonProperty("phrase") String phrase,
            @JsonProperty("meaning") String meaning,
            @JsonProperty("usage") String usage) {
        return new KeyExpression(phrase, meaning, usage);
    }
}
