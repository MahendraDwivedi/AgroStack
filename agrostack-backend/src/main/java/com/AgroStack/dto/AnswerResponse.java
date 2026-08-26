package com.AgroStack.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AnswerResponse {
    private Long id;
    private String content;
    private String username;
    private boolean owner;     // ✅ ADD THIS
    private boolean accepted;
    private LocalDateTime createdAt;
    private long upvotes;
    private long downvotes;
    private boolean expert;
    private Long questionId;

}

