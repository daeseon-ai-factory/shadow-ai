package com.tubeshadow.practice.api.dto;

import java.util.List;

/** The full server-cached transform set for one seed sentence. */
public record SentenceTransformSetResponse(
        String seedId,        // cache row UUID — also mints the SRS card keys (tf:<seedId>:<op>#0)
        String baseSentence,
        String baseGloss,
        List<SentenceTransform> transforms  // canonical order = core 10 then extra 5
) {
}
