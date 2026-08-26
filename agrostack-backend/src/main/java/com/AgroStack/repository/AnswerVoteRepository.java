package com.AgroStack.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.AgroStack.model.AnswerVote;
import com.AgroStack.model.VoteType;

public interface AnswerVoteRepository extends JpaRepository<AnswerVote, Long> {

    Optional<AnswerVote> findByAnswerIdAndUserId(Long answerId, Long userId);

    long countByAnswerIdAndVoteType(Long answerId, VoteType voteType);

    // ✅ ADD THIS
    @Query("""
                SELECT COALESCE(SUM(
                    CASE
                        WHEN v.voteType = 'UP' THEN 1
                        WHEN v.voteType = 'DOWN' THEN -1
                        ELSE 0
                    END
                ), 0)
                FROM AnswerVote v
                WHERE v.answer.question.id = :questionId
            """)
    Long getVoteCountByQuestionId(Long questionId);

    @Modifying
    @Query("DELETE FROM AnswerVote v WHERE v.answer.id = :answerId")
    void deleteByAnswerId(@Param("answerId") Long answerId);

}