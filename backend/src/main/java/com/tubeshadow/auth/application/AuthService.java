package com.tubeshadow.auth.application;

import com.tubeshadow.auth.api.dto.AuthTokenResponse;
import com.tubeshadow.auth.api.dto.ChangePasswordRequest;
import com.tubeshadow.auth.api.dto.LoginRequest;
import com.tubeshadow.auth.api.dto.SignupRequest;
import com.tubeshadow.auth.api.dto.UpdateProfileRequest;
import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.auth.security.JwtTokenProvider;
import com.tubeshadow.common.exception.ConflictException;
import com.tubeshadow.common.exception.NotFoundException;
import com.tubeshadow.common.exception.UnauthorizedException;
import com.tubeshadow.recording.application.RecordingService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final RecordingService recordingService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider,
                       RecordingService recordingService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.recordingService = recordingService;
    }

    /**
     * Permanently delete the account and everything it owns (App Store / GDPR requirement).
     * Requires the current password as a confirmation guard.
     *
     * <p>Audited cascade (V1–V18): deleting the {@code users} row removes, via ON DELETE CASCADE,
     * the user's clips (→ clip_analyses, recordings, review_items), decks, practice_progress, and
     * practice_card. Shared resources (videos, collections) are keyed globally and intentionally
     * stay. The only thing the cascade can't reach is the recording audio binaries — purged first.
     */
    @Transactional
    public void deleteAccount(UUID userId, String rawPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "사용자를 찾을 수 없습니다"));
        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new UnauthorizedException("INVALID_PASSWORD", "비밀번호가 일치하지 않습니다");
        }
        // Files first (need the rows to read their paths); then one delete cascades the DB.
        recordingService.purgeFilesForUser(userId);
        userRepository.delete(user);
    }

    @Transactional
    public AuthTokenResponse signup(SignupRequest request) {
        String email = User.normalizeEmail(request.email());
        if (userRepository.existsByEmail(email)) {
            throw new ConflictException("EMAIL_TAKEN", "Email already in use");
        }
        String hash = passwordEncoder.encode(request.password());
        User user = userRepository.save(User.createNew(email, hash, request.displayName().trim()));
        return issue(user);
    }

    @Transactional(readOnly = true)
    public AuthTokenResponse login(LoginRequest request) {
        String email = User.normalizeEmail(request.email());
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("INVALID_CREDENTIALS", "Invalid email or password"));
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new UnauthorizedException("INVALID_CREDENTIALS", "Invalid email or password");
        }
        return issue(user);
    }

    @Transactional
    public AuthTokenResponse updateProfile(UUID userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));
        user.changeDisplayName(request.displayName().trim());
        return issue(user);
    }

    @Transactional
    public void changePassword(UUID userId, ChangePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));
        if (!passwordEncoder.matches(request.currentPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("INVALID_CREDENTIALS", "현재 비밀번호가 일치하지 않습니다");
        }
        user.changePasswordHash(passwordEncoder.encode(request.newPassword()));
        // Invalidate any tokens issued before this change (incl. stolen ones).
        user.revokeExistingTokens();
    }

    private AuthTokenResponse issue(User user) {
        String token = tokenProvider.issueAccessToken(user.getId(), user.getEmail(), user.getTokenVersion());
        return new AuthTokenResponse(
                token,
                tokenProvider.accessTokenTtlSeconds(),
                new AuthTokenResponse.UserSummary(user.getId(), user.getEmail(), user.getDisplayName())
        );
    }
}
