package com.AgroStack.dto;

import lombok.Data;

@Data
public class AnswerRequest {
    private Long questionId;
    private String content;
}
