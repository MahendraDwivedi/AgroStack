package com.AgroStack.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.AgroStack.dto.ApiResponse;
import com.AgroStack.dto.AnswerResponse;
import com.AgroStack.dto.QuestionResponse;
import com.AgroStack.service.UserDashboardService;
import com.AgroStack.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
public class UserDashboardController {

    private final UserDashboardService dashboardService;

    @GetMapping("/questions")
    public ApiResponse<Page<QuestionResponse>> myQuestions(
            @RequestHeader("Authorization") String auth,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Long userId = JwtUtil.extractUserId(auth.substring(7));
        return dashboardService.getMyQuestions(userId, page, size);
    }

    @GetMapping("/answers")
    public ApiResponse<Page<AnswerResponse>> myAnswers(
            @RequestHeader("Authorization") String auth,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Long userId = JwtUtil.extractUserId(auth.substring(7));
        return dashboardService.getMyAnswers(userId, page, size);
    }
}
