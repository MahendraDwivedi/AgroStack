package com.AgroStack.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.AgroStack.dto.ApiResponse;
import com.AgroStack.dto.UserAdminResponse;
import com.AgroStack.model.Role;
import com.AgroStack.service.AdminService;
import com.AgroStack.service.UserService;
import com.AgroStack.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor

public class AdminController {

    private final UserService userService;
    private final AdminService adminService;


    @PutMapping("/users/{userId}/promote")
    public ApiResponse<String> promoteUser(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable Long userId) {

        // 1️⃣ Check token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("User not logged in")
                    .data(null)
                    .build();
        }

        String token = authHeader.substring(7);

        if (!JwtUtil.validateToken(token)) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("Invalid token")
                    .data(null)
                    .build();
        }

        // 2️⃣ Admin check
        if (!"ADMIN".equals(JwtUtil.extractRole(token))) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("Only admin can promote users")
                    .data(null)
                    .build();
        }

        // 3️⃣ Promote user
        return userService.updateUserRole(userId, Role.EXPERT);
    }

    @DeleteMapping("/questions/{id}")
    public ApiResponse<String> deleteQuestion(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id) {

        String token = authHeader.substring(7);

        if (!"ADMIN".equals(JwtUtil.extractRole(token))) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("Admin access only")
                    .data(null)
                    .build();
        }

        return adminService.deleteQuestion(id);
    }

    @DeleteMapping("/answers/{id}")
    public ApiResponse<String> deleteAnswer(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id) {

        String token = authHeader.substring(7);

        if (!"ADMIN".equals(JwtUtil.extractRole(token))) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("Admin access only")
                    .data(null)
                    .build();
        }

        return adminService.deleteAnswer(id);
    }

    @PutMapping("/users/{id}/ban")
    public ApiResponse<String> banUser(@PathVariable Long id) {
        
        return adminService.banUser(id);
    }

    @PutMapping("/users/{id}/unban")
    public ApiResponse<String> unBanUser(@PathVariable Long id) {
        return adminService.unBanUser(id);
    }

    @GetMapping("/users")
    public ApiResponse<List<UserAdminResponse>> getAllUsers( @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        if (!JwtUtil.validateToken(token) ||  !"ADMIN".equals(JwtUtil.extractRole(token))) {
            return ApiResponse.<List<UserAdminResponse>>builder()
                    .success(false)
                    .message("Admin access only")
                    .data(null)
                    .build();
        }

        return adminService.getAllUsers();
    }

     

}
