package com.AgroStack.service;

import org.springframework.data.domain.Page;

import com.AgroStack.dto.ApiResponse;
import com.AgroStack.dto.QuestionRequest;
import com.AgroStack.dto.QuestionResponse;

// public interface QuestionService {

//     ApiResponse<QuestionResponse> askQuestion(QuestionRequest request,Long userId);

//     ApiResponse<Page<QuestionResponse>> getAllQuestions(int page ,int size);

//     ApiResponse<Page<QuestionResponse>> getQuestionsByCategory(String category ,int page ,int size);

//     ApiResponse<QuestionResponse> updateQuestion(
//         Long questionId, QuestionRequest request, Long userId);

//     ApiResponse<String> deleteQuestion(Long questionId, Long userId);

//     ApiResponse<Page<QuestionResponse>> searchQuestions(
//         String keyword, int page, int size);


// }

public interface QuestionService {

    ApiResponse<QuestionResponse> askQuestion(QuestionRequest request, Long userId);

    ApiResponse<QuestionResponse> getQuestionById(Long questionId, Long userId);


    ApiResponse<Page<QuestionResponse>> getAllQuestions(
            int page, int size, Long currentUserId);

    ApiResponse<Page<QuestionResponse>> getQuestionsByCategory(
            String category, int page, int size, Long currentUserId);

    ApiResponse<QuestionResponse> updateQuestion(
            Long questionId, QuestionRequest request, Long userId);

    ApiResponse<String> deleteQuestion(Long questionId, Long userId);

    ApiResponse<Page<QuestionResponse>> searchQuestions(
            String keyword, int page, int size, Long currentUserId);
}
