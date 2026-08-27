package com.AgroStack.service;

import com.AgroStack.dto.ApiResponse;
import com.AgroStack.dto.UserLoginRequest;
import com.AgroStack.dto.UserRegisterRequest;
import com.AgroStack.dto.UserResponse;
import com.AgroStack.dto.ForgotPasswordRequest;
import com.AgroStack.dto.ResetPasswordRequest;
import com.AgroStack.model.Role;

public interface UserService {

    ApiResponse<UserResponse> register(UserRegisterRequest request);

    ApiResponse<UserResponse> login(UserLoginRequest request);

    ApiResponse<String> updateUserRole(Long userId, Role role);

    ApiResponse<String> requestPasswordReset(ForgotPasswordRequest request);

    ApiResponse<String> resetPassword(ResetPasswordRequest request);



}
