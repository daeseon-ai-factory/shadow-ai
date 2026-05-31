package com.tubeshadow.practice.application;

import com.tubeshadow.practice.api.dto.PracticeProgressResponse;
import com.tubeshadow.practice.domain.PracticeProgress;
import com.tubeshadow.practice.repository.PracticeProgressRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class PracticeProgressService {

    private final PracticeProgressRepository repository;

    public PracticeProgressService(PracticeProgressRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public PracticeProgressResponse get(UUID userId, LocalDate today) {
        return repository.findByUserId(userId)
                .map(p -> PracticeProgressResponse.from(p, today))
                .orElseGet(() -> PracticeProgressResponse.empty(today));
    }

    @Transactional
    public PracticeProgressResponse recordRep(UUID userId, LocalDate today) {
        PracticeProgress progress = repository.findByUserId(userId)
                .orElseGet(() -> PracticeProgress.createNew(userId));
        progress.recordRep(today);
        repository.save(progress);
        return PracticeProgressResponse.from(progress, today);
    }
}
