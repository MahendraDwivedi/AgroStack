package com.AgroStack.serviceImpl;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.AgroStack.dto.ApiResponse;
import com.AgroStack.dto.QuestionRequest;
import com.AgroStack.dto.QuestionResponse;
import com.AgroStack.model.Question;
import com.AgroStack.model.Role;
import com.AgroStack.model.User;
import com.AgroStack.repository.AnswerRepository;
import com.AgroStack.repository.AnswerVoteRepository;
import com.AgroStack.repository.QuestionRepository;
import com.AgroStack.repository.UserRepository;
import com.AgroStack.service.QuestionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

        private final QuestionRepository questionRepository;
        private final UserRepository userRepository;

        private final AnswerRepository answerRepository;
        private final AnswerVoteRepository answerVoteRepository;

        @Override
        public ApiResponse<QuestionResponse> askQuestion(QuestionRequest request, Long userId) {
                User user = userRepository.findById(userId).orElse(null);

                if (user == null) {
                        return ApiResponse.<QuestionResponse>builder()
                                        .success(false)
                                        .message("User not found")
                                        .data(null)
                                        .build();
                }

                Question question = Question.builder()
                                .title(request.getTitle())
                                .description(request.getDescription())
                                .category(request.getCategory())
                                .user(user)
                                .createdAt(LocalDateTime.now())
                                .build();

                Question saved = questionRepository.save(question);
                return ApiResponse.<QuestionResponse>builder()
                                .success(true)
                                .message("Question posted successfully")
                                .data(mapToResponse(saved, userId))
                                .build();

        }

        @Override
        public ApiResponse<QuestionResponse> getQuestionById(Long questionId, Long userId) {

                Question question = questionRepository.findById(questionId).orElse(null);

                if (question == null) {
                        return ApiResponse.<QuestionResponse>builder()
                                        .success(false)
                                        .message("Question not found")
                                        .data(null)
                                        .build();
                }

                // ✅ increment views
                question.setViewCount(question.getViewCount() + 1);
                questionRepository.save(question);

                return ApiResponse.<QuestionResponse>builder()
                                .success(true)
                                .message("Question fetched")
                                .data(mapToResponse(question, userId))
                                .build();
        }

        @Override
        public ApiResponse<Page<QuestionResponse>> getAllQuestions(
                        int page, int size, Long currentUserId) {

                PageRequest pageable = PageRequest.of(
                                page, size, Sort.by("createdAt").descending());

                Page<QuestionResponse> response = questionRepository.findAll(pageable)
                                .map(q -> mapToResponse(q, currentUserId));

                return ApiResponse.<Page<QuestionResponse>>builder()
                                .success(true)
                                .message("Questions fetched successfully")
                                .data(response)
                                .build();
        }

        @Override
        public ApiResponse<Page<QuestionResponse>> getQuestionsByCategory(
                        String category, int page, int size, Long currentUserId) {

                PageRequest pageable = PageRequest.of(
                                page, size, Sort.by("createdAt").descending());

                Page<QuestionResponse> response = questionRepository.findByCategory(category, pageable)
                                .map(q -> mapToResponse(q, currentUserId));

                return ApiResponse.<Page<QuestionResponse>>builder()
                                .success(true)
                                .message("Questions fetched for category: " + category)
                                .data(response)
                                .build();
        }

        @Override
        public ApiResponse<QuestionResponse> updateQuestion(Long questionId, QuestionRequest request, Long userId) {
                Question question = questionRepository.findById(questionId).orElse(null);
                if (question == null) {
                        return ApiResponse.<QuestionResponse>builder()
                                        .success(false)
                                        .message("Question not found")
                                        .data(null)
                                        .build();
                }

                if (!question.getUser().getId().equals(userId)) {
                        return ApiResponse.<QuestionResponse>builder()
                                        .success(false)
                                        .message("You can edit only your own question")
                                        .data(null)
                                        .build();
                }

                question.setTitle(request.getTitle());
                question.setDescription(request.getDescription());
                question.setCategory(request.getCategory());

                Question saved = questionRepository.save(question);

                return ApiResponse.<QuestionResponse>builder()
                                .success(true)
                                .message("Question updated successfully")
                                .data(mapToResponse(saved, userId))
                                .build();
        }

        @Override
        public ApiResponse<String> deleteQuestion(Long questionId, Long userId) {

                Question question = questionRepository.findById(questionId).orElse(null);
                if (question == null) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("Question not found")
                                        .data(null)
                                        .build();
                }

                if (!question.getUser().getId().equals(userId) && question.getUser().getRole()!=Role.ADMIN) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("You can delete only your own question")
                                        .data(null)
                                        .build();
                }

                questionRepository.delete(question);

                return ApiResponse.<String>builder()
                                .success(true)
                                .message("Question deleted successfully")
                                .data(null)
                                .build();
        }

        @Override
        public ApiResponse<Page<QuestionResponse>> searchQuestions(
                        String keyword, int page, int size, Long currentUserId) {

                if (keyword.isBlank())
                        return ApiResponse.<Page<QuestionResponse>>builder()
                                        .success(true)
                                        .message("Empty search not allowed")
                                        .data(null)
                                        .build();

                PageRequest pageable = PageRequest.of(
                                page,
                                size,
                                Sort.by("createdAt").descending());

                Page<QuestionResponse> response = questionRepository.searchQuestions(keyword, pageable)
                                .map(q -> mapToResponse(q, currentUserId));

                return ApiResponse.<Page<QuestionResponse>>builder()
                                .success(true)
                                .message("Search results fetched successfully")
                                .data(response)
                                .build();
        }

        private QuestionResponse mapToResponse(Question question, Long currentUserId) {

                boolean isOwner = currentUserId != null &&
                                question.getUser() != null &&
                                question.getUser().getId().equals(currentUserId);

                Long answerCount = answerRepository.countByQuestionId(question.getId());
                Long voteCount = answerVoteRepository.getVoteCountByQuestionId(question.getId());

                return QuestionResponse.builder()
                                .id(question.getId())
                                .title(question.getTitle())
                                .description(question.getDescription())
                                .category(question.getCategory())
                                .username(question.getUser().getUsername())
                                .createdAt(question.getCreatedAt())
                                .viewCount(question.getViewCount())
                                .answerCount(answerCount)
                                .voteCount(voteCount)
                                .isOwner(isOwner)
                                .build();
        }
}
