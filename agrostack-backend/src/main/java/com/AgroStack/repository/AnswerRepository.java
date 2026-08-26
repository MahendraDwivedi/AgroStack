package com.AgroStack.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.AgroStack.model.Answer;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Page<Answer> findByQuestionId(Long questionId, Pageable pageable);

    Optional<Answer> findByIdAndQuestionId(Long answerId, Long questionId);

    List<Answer> findByQuestionIdOrderByAcceptedDescCreatedAtDesc(Long questionId);
    Page<Answer> findByUserId(Long userId, Pageable pageable);

     // ✅ ADD THIS
    long countByQuestionId(Long questionId);
    
    void deleteByQuestionId(Long questionId);


}