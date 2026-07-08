package com.eservice1.security.service;

import com.eservice1.security.entity.LoginAttempt;
import com.eservice1.security.repository.LoginAttemptRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class LoginAttemptService {

    private static final int MAX_ATTEMPTS = 5;

    private static final int LOCK_MINUTES = 15;

    private final LoginAttemptRepository repository;

    public LoginAttemptService(
            LoginAttemptRepository repository) {

        this.repository = repository;
    }

    public boolean isLocked(String phoneNumber) {

        LoginAttempt attempt =
                repository.findByPhoneNumber(phoneNumber)
                        .orElse(null);

        if (attempt == null) {
            return false;
        }

        if (attempt.getLockUntil() == null) {
            return false;
        }

        if (attempt.getLockUntil().isBefore(LocalDateTime.now())) {

            attempt.setFailedAttempts(0);

            attempt.setLockUntil(null);

            repository.save(attempt);

            return false;
        }

        return true;
    }

    public void loginSucceeded(String phoneNumber) {

        repository.findByPhoneNumber(phoneNumber)
                .ifPresent(attempt -> {

                    attempt.setFailedAttempts(0);

                    attempt.setLockUntil(null);

                    repository.save(attempt);

                });
    }

    public void loginFailed(String phoneNumber) {

        LoginAttempt attempt =
                repository.findByPhoneNumber(phoneNumber)
                        .orElse(new LoginAttempt());

        attempt.setPhoneNumber(phoneNumber);

        int failed =
                attempt.getFailedAttempts() + 1;

        attempt.setFailedAttempts(failed);

        if (failed >= MAX_ATTEMPTS) {

            attempt.setLockUntil(
                    LocalDateTime.now()
                            .plusMinutes(LOCK_MINUTES)
            );
        }

        repository.save(attempt);
    }
    public long getRemainingLockMinutes(String phoneNumber) {

        LoginAttempt attempt = repository.findByPhoneNumber(phoneNumber)
                .orElse(null);

        if (attempt == null || attempt.getLockUntil() == null) {
            return 0;
        }

        return Duration.between(
                LocalDateTime.now(),
                attempt.getLockUntil()
        ).toMinutes() + 1;
    }
}