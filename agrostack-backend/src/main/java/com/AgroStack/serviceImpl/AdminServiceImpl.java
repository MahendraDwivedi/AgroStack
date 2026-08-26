package com.AgroStack.serviceImpl;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.AgroStack.dto.ApiResponse;
import com.AgroStack.model.Answer;
import com.AgroStack.model.Question;
import com.AgroStack.model.User;
import com.AgroStack.repository.AnswerRepository;
import com.AgroStack.repository.QuestionRepository;
import com.AgroStack.repository.UserRepository;
import com.AgroStack.service.AdminService;

import jakarta.transaction.Transactional;

import com.AgroStack.dto.UserAdminResponse;
import java.util.List;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserRepository userRepo;

    @Override
    public ApiResponse<String> deleteQuestion(Long questionId) {

        Question question = questionRepository.findById(questionId).orElse(null);
        if (question == null) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("Question not found")
                    .data(null)
                    .build();
        }

        answerRepository.deleteByQuestionId(questionId);
        questionRepository.delete(question);

        return ApiResponse.<String>builder()
                .success(true)
                .message("Question deleted by admin")
                .data(null)
                .build();
    }

    @Override
    public ApiResponse<String> deleteAnswer(Long answerId) {

        Answer answer = answerRepository.findById(answerId).orElse(null);
        if (answer == null) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("Answer not found")
                    .data(null)
                    .build();
        }

        answerRepository.delete(answer);

        return ApiResponse.<String>builder()
                .success(true)
                .message("Answer deleted by admin")
                .data(null)
                .build();
    }

    @Override
    public ApiResponse<String> banUser(@PathVariable Long id) {
        User u = userRepo.findById(id).orElseThrow();
        u.setBanned(true);
        return ApiResponse.<String>builder()
                .success(true)
                .message("User banned by admin")
                .data(null)
                .build();
    }

        @Override
    public ApiResponse<String> unBanUser(@PathVariable Long id) {
        User u = userRepo.findById(id).orElseThrow();
        u.setBanned(false);
        return ApiResponse.<String>builder()
                .success(true)
                .message("User banned by admin")
                .data(null)
                .build();
    }

    @Override
    public ApiResponse<List<UserAdminResponse>> getAllUsers() {

        List<UserAdminResponse> users = userRepo.findAll()
            .stream()
            .map(user -> UserAdminResponse.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .banned(user.isBanned())
                    .build())
            .toList();

        return ApiResponse.<List<UserAdminResponse>>builder()
                .success(true)
                .message("Fetched all users")
                .data(users)
                .build();   
    }

}