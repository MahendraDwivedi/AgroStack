package com.AgroStack.serviceImpl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.AgroStack.dto.*;
import com.AgroStack.model.Role;
import com.AgroStack.model.User;
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

}
