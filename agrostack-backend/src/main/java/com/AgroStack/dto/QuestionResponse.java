package com.AgroStack.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestionResponse {

    private Long id;
    private String title;
    private String description;
    private String category;
    private String username;
    private LocalDateTime createdAt;

    // ✅ UI flags
    private boolean isOwner;
    private long voteCount;

    // ✅ REQUIRED for home page
    private long answerCount;
    private long viewCount;
}

