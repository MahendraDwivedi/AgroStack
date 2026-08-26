package com.AgroStack.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "answer_votes",
    uniqueConstraints = @UniqueConstraint(columnNames = {"answer_id", "user_id"})
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswerVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "answer_id", nullable = false)
    private Answer answer;

    @ManyToOne                                                                                                                                                                                                                                                                                                  
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VoteType voteType;
}
