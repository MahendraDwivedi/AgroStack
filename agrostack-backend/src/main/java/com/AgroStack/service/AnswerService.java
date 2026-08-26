package com.AgroStack.service;

import com.AgroStack.dto.AnswerRequest;
import com.AgroStack.dto.AnswerResponse;
import com.AgroStack.dto.ApiResponse;
import org.springframework.data.domain.Page;

public interface AnswerService {

    ApiResponse<AnswerResponse> addAnswer(AnswerRequest request, Long userId);

    ApiResponse<String> acceptAnswer(Long questionId, Long answerId, Long userId);

    ApiResponse<String> voteAnswer(Long answerId, Long userId, String voteType);

ApiResponse<Page<AnswerResponse>> getAnswersByQuestion(
    Long questionId, int page, int size, Long userId
);

    ApiResponse<AnswerResponse> updateAnswer(
            Long answerId, String content, Long userId);

    ApiResponse<String> deleteAnswer(Long answerId, Long userId);

}