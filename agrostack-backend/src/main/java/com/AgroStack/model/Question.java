package com.AgroStack.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


// @Entity
// @Table(name = "questions")
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Builder
// public class Question {
    
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private String title;

//     @Column(nullable = false ,columnDefinition = "TEXT")
//     private String description;
    
//     @Column(nullable = false)
//     private String category; // CROP, SOIL, DISEASE, MARKET

//     @ManyToOne
//     @JoinColumn(name = "user_id", nullable = false)
//     private User user;

//     private LocalDateTime createdAt;
// }


@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String category;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime createdAt;

    @Column(nullable = false)
    private long viewCount ;   // ✅ NEW
}
