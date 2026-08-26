package com.AgroStack.service;

import com.AgroStack.dto.ApiResponse;
import com.AgroStack.dto.UserAdminResponse;
import java.util.List;

public interface AdminService {

    ApiResponse<String> deleteQuestion(Long questionId);

    ApiResponse<String> deleteAnswer(Long answerId);

    ApiResponse<String> banUser(Long userId);
    
    ApiResponse<String> unBanUser(Long userId);

    ApiResponse<List<UserAdminResponse>> getAllUsers();

}
