package com.tubeshadow.video;

import com.tubeshadow.video.util.YoutubeUrlParser;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;

class YoutubeUrlParserTest {

    @ParameterizedTest
    @CsvSource(textBlock = """
            https://www.youtube.com/watch?v=dQw4w9WgXcQ,        dQw4w9WgXcQ
            https://youtu.be/dQw4w9WgXcQ,                       dQw4w9WgXcQ
            https://youtu.be/dQw4w9WgXcQ?t=15,                  dQw4w9WgXcQ
            https://www.youtube.com/embed/dQw4w9WgXcQ,          dQw4w9WgXcQ
            https://www.youtube.com/shorts/dQw4w9WgXcQ,         dQw4w9WgXcQ
            https://m.youtube.com/watch?v=dQw4w9WgXcQ&feature=share, dQw4w9WgXcQ
            dQw4w9WgXcQ,                                        dQw4w9WgXcQ
            """)
    void extractsId(String input, String expected) {
        assertThat(YoutubeUrlParser.extractVideoId(input)).contains(expected);
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "",
            "https://example.com",
            "https://www.youtube.com/",
            "not-a-video-id",
            "https://www.youtube.com/watch?v=tooshort"
    })
    void rejectsInvalid(String input) {
        assertThat(YoutubeUrlParser.extractVideoId(input)).isEmpty();
    }
}
