package com.tubeshadow.video.util;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Extracts a YouTube video ID from a variety of URL shapes. Returns Optional.empty for
 * unrecognized inputs so callers can choose how to react (typically 400 from the import API).
 */
public final class YoutubeUrlParser {

    private static final Pattern ID_PATTERN = Pattern.compile("^[A-Za-z0-9_-]{11}$");

    // Covers: watch?v=, /v/, /embed/, /shorts/, /live/
    private static final Pattern PATH_PATTERN = Pattern.compile(
            "(?:v|embed|shorts|live)/([A-Za-z0-9_-]{11})");

    private YoutubeUrlParser() {}

    public static Optional<String> extractVideoId(String input) {
        if (input == null) return Optional.empty();
        String s = input.trim();
        if (s.isEmpty()) return Optional.empty();

        // Bare 11-char ID
        if (ID_PATTERN.matcher(s).matches()) {
            return Optional.of(s);
        }

        // youtu.be/<id>
        int youtu = s.indexOf("youtu.be/");
        if (youtu >= 0) {
            String tail = s.substring(youtu + "youtu.be/".length());
            String id = tail.split("[?&#/]", 2)[0];
            if (ID_PATTERN.matcher(id).matches()) return Optional.of(id);
        }

        // watch?v=<id> in any host
        int v = s.indexOf("v=");
        if (v >= 0) {
            String tail = s.substring(v + 2);
            String id = tail.split("[?&#/]", 2)[0];
            if (ID_PATTERN.matcher(id).matches()) return Optional.of(id);
        }

        // path-based forms
        Matcher m = PATH_PATTERN.matcher(s);
        if (m.find()) {
            String id = m.group(1);
            if (ID_PATTERN.matcher(id).matches()) return Optional.of(id);
        }

        return Optional.empty();
    }
}
