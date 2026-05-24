package com.tubeshadow.auth.application;

import com.tubeshadow.auth.api.dto.AuthTokenResponse;
import com.tubeshadow.auth.api.dto.LoginRequest;
import com.tubeshadow.auth.api.dto.SignupRequest;
import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.auth.security.JwtTokenProvider;
import com.tubeshadow.common.exception.ConflictException;
import com.tubeshadow.common.exception.UnauthorizedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
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

    private AuthTokenResponse issue(User user) {
        String token = tokenProvider.issueAccessToken(user.getId(), user.getEmail());
        return new AuthTokenResponse(
                token,
                tokenProvider.accessTokenTtlSeconds(),
                new AuthTokenResponse.UserSummary(user.getId(), user.getEmail(), user.getDisplayName())
        );
    }
}
