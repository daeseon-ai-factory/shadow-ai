package com.tubeshadow.auth;

import com.tubeshadow.PostgresContainerTest;
import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class UserRepositoryTest extends PostgresContainerTest {

    @Autowired
    UserRepository userRepository;

    @Test
    void saveAndFindByEmail() {
        User user = User.createNew("Test@Example.com", "hash", "Tester");
        userRepository.save(user);

        var found = userRepository.findByEmail("test@example.com");
        assertThat(found).isPresent();
        assertThat(found.get().getDisplayName()).isEqualTo("Tester");
        assertThat(found.get().getId()).isEqualTo(user.getId());
        assertThat(found.get().getCreatedAt()).isNotNull();
    }

    @Test
    void existsByEmail() {
        userRepository.save(User.createNew("dupe@example.com", "hash", "User"));
        assertThat(userRepository.existsByEmail("dupe@example.com")).isTrue();
        assertThat(userRepository.existsByEmail("missing@example.com")).isFalse();
    }
}
