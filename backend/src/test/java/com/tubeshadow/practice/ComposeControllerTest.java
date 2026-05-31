package com.tubeshadow.practice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class ComposeControllerTest extends SpringIntegrationTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

    // Validation rejects the request before any AI call, so these stay deterministic and never
    // touch the provider (the happy path needs a real key — verified by CompositionServiceTest).
    @Test
    void rejectsBlankSentence() throws Exception {
        String token = signupAndLogin("compose-blank@example.com");
        mockMvc.perform(post("/api/practice/compose/check")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(bodyOf("depend on", "rely on", ""))
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest());
    }

    @Test
    void rejectsBlankTarget() throws Exception {
        String token = signupAndLogin("compose-target@example.com");
        mockMvc.perform(post("/api/practice/compose/check")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(bodyOf("", "", "It depends on the traffic."))
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest());
    }

    @Test
    void requiresAuth() throws Exception {
        mockMvc.perform(post("/api/practice/compose/check")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(bodyOf("depend on", "rely on", "It depends on the traffic.")))
                .andExpect(status().is4xxClientError());
    }

    private String bodyOf(String target, String gloss, String sentence) throws Exception {
        Map<String, Object> m = new HashMap<>();
        m.put("target", target);
        m.put("gloss", gloss);
        m.put("sentence", sentence);
        return objectMapper.writeValueAsString(m);
    }

    private String signupAndLogin(String email) throws Exception {
        String body = objectMapper.writeValueAsString(Map.of(
                "email", email, "password", "passpass1", "displayName", "Compose User"));
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated());
        String loginBody = objectMapper.writeValueAsString(Map.of("email", email, "password", "passpass1"));
        String resp = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON).content(loginBody))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(resp).path("data").path("accessToken").asText();
    }
}
