package com.tubeshadow.review.api.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record ReviewRespondRequest(@Min(0) @Max(5) int quality) {
}
