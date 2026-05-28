package com.tubeshadow.analysis.domain;

/**
 * One chunk of a 직독직해 (chunked translation) — English fragment paired with
 * its Korean meaning, in source order. The reader scans top-to-bottom and the
 * Korean appears in English word order, not in natural Korean order.
 */
public record ChunkPair(String en, String ko) {
}
