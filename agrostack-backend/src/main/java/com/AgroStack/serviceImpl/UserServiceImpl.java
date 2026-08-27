package com.AgroStack.serviceImpl;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.AgroStack.dto.*;
import com.AgroStack.model.Role;
import com.AgroStack.model.User;
import com.AgroStack.model.PasswordResetToken;
import com.AgroStack.repository.PasswordResetTokenRepository;
import com.AgroStack.repository.UserRepository;
import com.AgroStack.service.UserService;
import com.AgroStack.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

        private final UserRepository userRepository;
        private final BCryptPasswordEncoder passwordEncoder;
        private final PasswordResetTokenRepository passwordResetTokenRepository;
        private final JavaMailSender mailSender;

        @Value("${app.frontend-url:https://agro-stack.onrender.com}")
        private String frontendUrl;

        @Override
        public ApiResponse<UserResponse> register(UserRegisterRequest request) {

                if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                        return ApiResponse.<UserResponse>builder()
                                        .success(false)
                                        .message("Email already registered")
                                        .data(null)
                                        .build();
                }
                

                User user = User.builder()
                                .username(request.getUsername())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(Role.FARMER)
                                .build();

                User saved = userRepository.save(user);

                return ApiResponse.<UserResponse>builder()
                                .success(true)
                                .message("Registration successful")
                                .data(UserResponse.builder()
                                                .id(saved.getId())
                                                .username(saved.getUsername())
                                                .email(saved.getEmail())
                                                .role(saved.getRole().name())
                                                .build())
                                .build();
        }

        @Override
        public ApiResponse<UserResponse> login(UserLoginRequest request) {

                User user = userRepository.findByEmail(request.getEmail()).orElse(null);

                
                if (user == null) {
                        return ApiResponse.<UserResponse>builder()
                                        .success(false)
                                        .message("Invalid email")
                                        .data(null)
                                        .build();
                }
                 if(user.isBanned()){
                        return ApiResponse.<UserResponse>builder()
                                        .success(false)
                                        .message("User is banned")
                                        .data(null)
                                        .build();
                }

                if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                        return ApiResponse.<UserResponse>builder()
                                        .success(false)
                                        .message("Invalid password")
                                        .data(null)
                                        .build();
                }

                String token = JwtUtil.generateToken(user.getId(), user.getRole().name());

                return ApiResponse.<UserResponse>builder()
                                .success(true)
                                .message("Login successful")
                                .data(UserResponse.builder()
                                                .id(user.getId())
                                                .username(user.getUsername())
                                                .email(user.getEmail())
                                                .role(user.getRole().name())
                                                .token(token)
                                                .build())
                                .build();
        }

        @Override
        public ApiResponse<String> updateUserRole(Long userId, Role role) {

                User user = userRepository.findById(userId).orElse(null);

                if (user == null) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("User not found")
                                        .data(null)
                                        .build();
                }

                user.setRole(role);
                userRepository.save(user);

                return ApiResponse.<String>builder()
                                .success(true)
                                .message("User role updated successfully")
                                .data("New role: " + role)
                                .build();
        }

        @Override
        public ApiResponse<String> requestPasswordReset(ForgotPasswordRequest request) {
                String responseMessage = "If that email is registered, a password-reset link has been sent.";

                if (request.getEmail() == null || request.getEmail().isBlank()) {
                        return ApiResponse.<String>builder()
                                        .success(true)
                                        .message(responseMessage)
                                        .data(null)
                                        .build();
                }

                User user = userRepository.findByEmail(request.getEmail().trim()).orElse(null);
                if (user == null) {
                        return ApiResponse.<String>builder()
                                        .success(true)
                                        .message(responseMessage)
                                        .data(null)
                                        .build();
                }

                passwordResetTokenRepository.deleteByUserId(user.getId());

                String rawToken = createResetToken();
                passwordResetTokenRepository.save(PasswordResetToken.builder()
                                .tokenHash(hashToken(rawToken))
                                .user(user)
                                .expiresAt(LocalDateTime.now().plusMinutes(15))
                                .build());

                try {
                        SimpleMailMessage message = new SimpleMailMessage();
                        message.setTo(user.getEmail());
                        message.setSubject("Reset your AgroStack password");
                        message.setText("We received a request to reset your password.\n\n"
                                        + "Use this link within 15 minutes:\n"
                                        + frontendUrl + "/reset-password?token=" + rawToken
                                        + "\n\nIf you did not request this, you can safely ignore this email.");
                        mailSender.send(message);
                } catch (Exception exception) {
                        passwordResetTokenRepository.deleteByUserId(user.getId());
                        return ApiResponse.<String>builder()
                                        .success(true)
                                        .message(responseMessage)
                                        .data(null)
                                        .build();
                }

                return ApiResponse.<String>builder()
                                .success(true)
                                .message(responseMessage)
                                .data(null)
                                .build();
        }

        @Override
        public ApiResponse<String> resetPassword(ResetPasswordRequest request) {
                if (request.getToken() == null || request.getToken().isBlank()
                                || request.getPassword() == null || request.getPassword().length() < 8) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("Use a valid reset link and a password of at least 8 characters.")
                                        .data(null)
                                        .build();
                }

                PasswordResetToken resetToken = passwordResetTokenRepository
                                .findByTokenHash(hashToken(request.getToken()))
                                .orElse(null);

                if (resetToken == null || resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
                        if (resetToken != null) {
                                passwordResetTokenRepository.delete(resetToken);
                        }
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("This password-reset link is invalid or has expired.")
                                        .data(null)
                                        .build();
                }

                User user = resetToken.getUser();
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                userRepository.save(user);
                passwordResetTokenRepository.deleteByUserId(user.getId());

                return ApiResponse.<String>builder()
                                .success(true)
                                .message("Password reset successfully. You can now log in.")
                                .data(null)
                                .build();
        }

        private String createResetToken() {
                byte[] bytes = new byte[32];
                new SecureRandom().nextBytes(bytes);
                return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        }

        private String hashToken(String token) {
                try {
                        byte[] hash = MessageDigest.getInstance("SHA-256")
                                        .digest(token.getBytes(StandardCharsets.UTF_8));
                        return java.util.HexFormat.of().formatHex(hash);
                } catch (NoSuchAlgorithmException exception) {
                        throw new IllegalStateException("SHA-256 is unavailable", exception);
                }
        }

}
