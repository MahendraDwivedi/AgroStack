package com.AgroStack.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AgroStack.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByTokenHash(String tokenHash);

    void deleteByUserId(Long userId);
}
