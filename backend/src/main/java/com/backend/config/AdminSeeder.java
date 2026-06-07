package com.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.backend.entities.User;
import com.backend.entities.UserRole;
import com.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@1234").isEmpty()) {
            User adminUser = new User(
                    "ADMIN",
                    "admin@1234",
                    passwordEncoder.encode("Admin@1234"),
                    UserRole.ADMIN);
            userRepository.save(adminUser);
            System.out.println("Admin user seeded successfully!");
        }
    }
}