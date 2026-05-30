package com.tubeshadow.auth.security;

import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.common.web.RequestLoggingFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider, UserRepository userRepository) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith(BEARER_PREFIX)) {
            String token = header.substring(BEARER_PREFIX.length());
            try {
                AuthenticatedUser principal = tokenProvider.parse(token);
                // Revocation check: the token's "tv" must still match the user's current
                // version. A password change bumps the DB version, so older tokens (incl.
                // stolen ones) stop authenticating. One indexed PK lookup per request.
                Integer currentVersion = userRepository.findTokenVersionById(principal.id()).orElse(null);
                if (currentVersion != null && currentVersion == principal.tokenVersion()) {
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(principal, null, Collections.emptyList());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    // Tag logs for this request with the user (RequestLoggingFilter clears MDC at the end).
                    MDC.put(RequestLoggingFilter.USER_ID, principal.id().toString());
                } else {
                    // User deleted or token revoked → stay unauthenticated.
                    SecurityContextHolder.clearContext();
                }
            } catch (JwtTokenProvider.InvalidTokenException ex) {
                // Token invalid → leave unauthenticated; endpoint security will deal with it.
                SecurityContextHolder.clearContext();
            }
        }
        filterChain.doFilter(request, response);
    }
}
