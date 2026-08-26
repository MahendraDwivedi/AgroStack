package com.AgroStack.service;

import com.AgroStack.dto.ApiResponse;

import org.springframework.data.domain.Page;

import com.AgroStack.dto.AnswerResponse;
import com.AgroStack.dto.QuestionResponse;

public interface UserDashboardService {

    ApiResponse<Page<QuestionResponse>> getMyQuestions(
            Long userId, int page, int size);

    ApiResponse<Page<AnswerResponse>> getMyAnswers(
            Long userId, int page, int size);
}
