package com.tubeshadow.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import com.tubeshadow.auth.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class ProfileEndpointTest extends SpringIntegrationTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;
    @Autowired UserRepository userRepository;
    @Autowired PasswordEncoder passwordEncoder;

    private String token;

    @BeforeEach
    void setup() throws Exception {
        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                        "email", "profile@example.com",
                        "password", "supersecret",
                        "displayName", "Old Name"))))
                .andExpect(status().isCreated());

        String resp = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                        "email", "profile@example.com",
                        "password", "supersecret"))))
                .andReturn().getResponse().getContentAsString();
        token = objectMapper.readTree(resp).path("data").path("accessToken").asText();
    }

    @Test
    void updateDisplayName() throws Exception {
        mockMvc.perform(patch("/api/auth/me")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of("displayName", "Brand New Name"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.user.displayName").value("Brand New Name"));

        assertThat(userRepository.findByEmail("profile@example.com").orElseThrow().getDisplayName())
                .isEqualTo("Brand New Name");
    }

    @Test
    void changePasswordHappy() throws Exception {
        mockMvc.perform(post("/api/auth/me/password")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                        "currentPassword", "supersecret",
                        "newPassword", "evenmoresecret"))))
                .andExpect(status().isNoContent());

        // Login with new password works
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                        "email", "profile@example.com",
                        "password", "evenmoresecret"))))
                .andExpect(status().isOk());

        // Old password no longer works
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                        "email", "profile@example.com",
                        "password", "supersecret"))))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void oldTokenRejectedAfterPasswordChange() throws Exception {
        // Changing the password bumps token_version, revoking every token issued before it.
        mockMvc.perform(post("/api/auth/me/password")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                        "currentPassword", "supersecret",
                        "newPassword", "evenmoresecret"))))
                .andExpect(status().isNoContent());

        // The same token (now stale) must no longer authenticate on a protected endpoint.
        mockMvc.perform(patch("/api/auth/me")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of("displayName", "Should Fail"))))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void changePasswordRejectsWrongCurrent() throws Exception {
        mockMvc.perform(post("/api/auth/me/password")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                        "currentPassword", "wrongwrong",
                        "newPassword", "evenmoresecret"))))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void changePasswordRejectsTooShort() throws Exception {
        mockMvc.perform(post("/api/auth/me/password")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                        "currentPassword", "supersecret",
                        "newPassword", "short"))))
                .andExpect(status().isBadRequest());
    }
}
