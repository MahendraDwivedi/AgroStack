package com.AgroStack.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.AgroStack.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findByCategory(String category , Pageable pageable);
    Page<Question> findAll(Pageable pageable);

     @Query("""
        SELECT q FROM Question q
        WHERE LOWER(q.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(q.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(q.category) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    Page<Question> searchQuestions(String keyword, Pageable pageable);
    Page<Question> findByUserId(Long userId, Pageable pageable);

}