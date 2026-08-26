package com.AgroStack.dto;

import lombok.Data;

@Data
public class QuestionRequest {
    private String title;
    private String description;
    private String category;
}