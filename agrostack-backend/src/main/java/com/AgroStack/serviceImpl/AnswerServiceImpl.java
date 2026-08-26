package com.AgroStack.serviceImpl;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.AgroStack.dto.AnswerRequest;
import com.AgroStack.dto.AnswerResponse;
import com.AgroStack.dto.ApiResponse;
import com.AgroStack.model.Answer;
import com.AgroStack.model.AnswerVote;
import com.AgroStack.model.Question;
import com.AgroStack.model.Role;
import com.AgroStack.model.User;
import com.AgroStack.model.VoteType;
import com.AgroStack.repository.AnswerRepository;
import com.AgroStack.repository.AnswerVoteRepository;
import com.AgroStack.repository.QuestionRepository;
import com.AgroStack.repository.UserRepository;
import com.AgroStack.service.AnswerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AnswerServiceImpl implements AnswerService {

        private final AnswerRepository answerRepository;
        private final QuestionRepository questionRepository;
        private final UserRepository userRepository;
        private final AnswerVoteRepository answerVoteRepository;

        @Override
        public ApiResponse<AnswerResponse> addAnswer(AnswerRequest request, Long userId) {
                Question question = questionRepository.findById(request.getQuestionId()).orElse(null);
                if (question == null) {
                        return ApiResponse.<AnswerResponse>builder()
                                        .success(false)
                                        .data(null)
                                        .message("Question not found")
                                        .build();
                }
                User user = userRepository.findById(userId).orElse(null);
                if (user == null) {
                        return ApiResponse.<AnswerResponse>builder()
                                        .success(false)
                                        .message("User not found")
                                        .data(null)
                                        .build();
                }

                Answer answer = Answer.builder()
                                .content(request.getContent())
                                .question(question)
                                .user(user)
                                .createdAt(LocalDateTime.now())
                                .build();

                Answer saved = answerRepository.save(answer);

                return ApiResponse.<AnswerResponse>builder()
                                .success(true)
                                .message("Answer added successfully")
                                .data(mapToResponse(saved, userId)) // ✅ FIX
                                .build();

        }

        @Override
        public ApiResponse<Page<AnswerResponse>> getAnswersByQuestion(
                        Long questionId, int page, int size, Long userId) {

                Question question = questionRepository.findById(questionId).orElse(null);
                if (question == null) {
                        return ApiResponse.<Page<AnswerResponse>>builder()
                                        .success(false)
                                        .message("Question not found")
                                        .data(null)
                                        .build();
                }

                Pageable pageable = PageRequest.of(
                                page,
                                size,
                                Sort.by("accepted").descending()
                                                .and(Sort.by("createdAt").descending()));

                Page<AnswerResponse> responsePage = answerRepository.findByQuestionId(questionId, pageable)
                                .map(answer -> mapToResponse(answer, userId)); // ✅ FIX

                System.out.println("Fetched Answers Page: " + responsePage);

                return ApiResponse.<Page<AnswerResponse>>builder()
                                .success(true)
                                .message("Answers fetched successfully")
                                .data(responsePage)
                                .build();
        }

        @Override
        public ApiResponse<String> acceptAnswer(Long questionId, Long answerId, Long userId) {

                Question question = questionRepository.findById(questionId).orElse(null);
                if (question == null) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("Question not found")
                                        .data(null)
                                        .build();
                }

                // 🔒 Only question owner can accept
                if (!question.getUser().getId().equals(userId)) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("Only question owner can accept answers")
                                        .data(null)
                                        .build();
                }

                Answer answer = answerRepository
                                .findByIdAndQuestionId(answerId, questionId)
                                .orElse(null);

                if (answer == null) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("Answer not found")
                                        .data(null)
                                        .build();
                }

                // ✅ Allow multiple accepted answers
                if (answer.isAccepted()) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("Answer already accepted")
                                        .data(null)
                                        .build();
                }

                answer.setAccepted(true);
                answerRepository.save(answer);

                return ApiResponse.<String>builder()
                                .success(true)
                                .message("Answer marked as accepted")
                                .data("Accepted Answer ID: " + answerId)
                                .build();
        }

        @Override
        public ApiResponse<String> voteAnswer(Long answerId, Long userId, String voteType) {

                Answer answer = answerRepository.findById(answerId).orElse(null);
                if (answer == null) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("Answer not found")
                                        .data(null)
                                        .build();
                }
                // Prevent voting on own answer
                if (answer.getUser().getId().equals(userId)) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("You cannot vote on your own answer")
                                        .data(null)
                                        .build();
                }

                VoteType newVote = VoteType.valueOf(voteType.toUpperCase());

                AnswerVote existingVote = answerVoteRepository.findByAnswerIdAndUserId(answerId, userId).orElse(null);

                // 🔁 Toggle logic
                if (existingVote != null) {
                        if (existingVote.getVoteType() == newVote) {
                                answerVoteRepository.delete(existingVote);
                                return ApiResponse.<String>builder()
                                                .success(true)
                                                .message("Vote removed")
                                                .data(null)
                                                .build();
                        } else {
                                existingVote.setVoteType(newVote);
                                answerVoteRepository.save(existingVote);
                                return ApiResponse.<String>builder()
                                                .success(true)
                                                .message("Vote updated")
                                                .data(null)
                                                .build();
                        }
                }

                AnswerVote vote = AnswerVote.builder()
                                .answer(answer)
                                .user(User.builder().id(userId).build())
                                .voteType(newVote)
                                .build();

                answerVoteRepository.save(vote);

                return ApiResponse.<String>builder()
                                .success(true)
                                .message("Vote added")
                                .data(null)
                                .build();
        }

        @Override
        public ApiResponse<AnswerResponse> updateAnswer(Long answerId, String content, Long userId) {

                Answer answer = answerRepository.findById(answerId).orElse(null);
                if (answer == null) {
                        return ApiResponse.<AnswerResponse>builder()
                                        .success(false)
                                        .message("Answer not found")
                                        .data(null)
                                        .build();
                }
                if (!answer.getUser().getId().equals(userId)) {
                        return ApiResponse.<AnswerResponse>builder()
                                        .success(false)
                                        .message("You can edit your response only")
                                        .data(null)
                                        .build();
                }

                answer.setContent(content);

                return ApiResponse.<AnswerResponse>builder()
                                .success(true)
                                .message("Answer updated")
                                .data(mapToResponse(answer, userId)) // ✅ FIX
                                .build();

        }

        @Override
        public ApiResponse<String> deleteAnswer(Long answerId, Long userId) {

                Answer answer = answerRepository.findById(answerId).orElse(null);
                if (answer == null) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("Answer not found")
                                        .data(null)
                                        .build();
                }

                User currentUser = userRepository.findById(userId).orElse(null);

                if (currentUser == null) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("User not found")
                                        .data(null)
                                        .build();
                }

                if (!answer.getUser().getId().equals(userId)
                                && currentUser.getRole() != Role.ADMIN) {
                        return ApiResponse.<String>builder()
                                        .success(false)
                                        .message("You can delete only your own answer")
                                        .data(null)
                                        .build();
                }

                answerVoteRepository.deleteByAnswerId(answerId);

                answerRepository.delete(answer);

                return ApiResponse.<String>builder()
                                .success(true)
                                .message("Answer deleted successfully")
                                .data(null)
                                .build();
        }

        private AnswerResponse mapToResponse(Answer answer, Long loggedInUserId) {

                long upvotes = answerVoteRepository
                                .countByAnswerIdAndVoteType(answer.getId(), VoteType.UP);

                long downvotes = answerVoteRepository
                                .countByAnswerIdAndVoteType(answer.getId(), VoteType.DOWN);

                boolean isOwner = loggedInUserId != null
                                && answer.getUser().getId().equals(loggedInUserId);

                return AnswerResponse.builder()
                                .id(answer.getId())
                                .content(answer.getContent())
                                .username(answer.getUser().getUsername())
                                .owner(isOwner) // ✅ KEY LINE
                                .accepted(answer.isAccepted())
                                .createdAt(answer.getCreatedAt())
                                .upvotes(upvotes)
                                .downvotes(downvotes)
                                .expert(answer.getUser().getRole() == Role.EXPERT)
                                .questionId(answer.getQuestion().getId())
                                .build();
        }

}
