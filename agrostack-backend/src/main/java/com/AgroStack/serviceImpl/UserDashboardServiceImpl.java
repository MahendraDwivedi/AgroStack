package com.AgroStack.serviceImpl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.AgroStack.dto.AnswerResponse;
import com.AgroStack.dto.ApiResponse;
import com.AgroStack.dto.QuestionResponse;
import com.AgroStack.model.Answer;
import com.AgroStack.model.Question;
import com.AgroStack.repository.AnswerRepository;
import com.AgroStack.repository.QuestionRepository;
import com.AgroStack.service.UserDashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDashboardServiceImpl implements UserDashboardService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    @Override
    public ApiResponse<Page<QuestionResponse>> getMyQuestions(
            Long userId, int page, int size) {

        PageRequest pageable = PageRequest.of(
                page, size, Sort.by("createdAt").descending());

        Page<QuestionResponse> response = questionRepository.findByUserId(userId, pageable)
                .map(this::mapQuestion);

        return ApiResponse.<Page<QuestionResponse>>builder()
                .success(true)
                .message("My questions fetched")
                .data(response)
                .build();
    }

    @Override
    public ApiResponse<Page<AnswerResponse>> getMyAnswers(
            Long userId, int page, int size) {

        PageRequest pageable = PageRequest.of(
                page, size, Sort.by("createdAt").descending());

        Page<AnswerResponse> response = answerRepository.findByUserId(userId, pageable)
                .map(this::mapAnswer);

        return ApiResponse.<Page<AnswerResponse>>builder()
                .success(true)
                .message("My answers fetched")
                .data(response)
                .build();
    }

    /* ---------- MAPPERS ---------- */

    private QuestionResponse mapQuestion(Question q) {
        return QuestionResponse.builder()
                .id(q.getId())
                .title(q.getTitle())
                .description(q.getDescription())
                .category(q.getCategory())
                .username(q.getUser().getUsername())
                .createdAt(q.getCreatedAt())
                .isOwner(true) // always true in dashboard
                .build();
    }

    private AnswerResponse mapAnswer(Answer a) {
        return AnswerResponse.builder()
                .id(a.getId())
                .content(a.getContent())
                .username(a.getUser().getUsername())
                .accepted(a.isAccepted())
                .createdAt(a.getCreatedAt())
                .questionId(a.getQuestion().getId())
                .build();
    }

}
