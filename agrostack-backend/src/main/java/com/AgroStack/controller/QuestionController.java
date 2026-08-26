// package com.AgroStack.controller;

// import org.springframework.data.domain.Page;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.AgroStack.dto.ApiResponse;
// import com.AgroStack.dto.QuestionRequest;
// import com.AgroStack.dto.QuestionResponse;
// import com.AgroStack.service.QuestionService;
// import com.AgroStack.util.JwtUtil;

// import lombok.RequiredArgsConstructor;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestHeader;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PutMapping;

// @RestController
// @RequestMapping("/api/questions")
// @RequiredArgsConstructor
// public class QuestionController {
//     private final QuestionService questionService;

//     @PostMapping
//     public ApiResponse<QuestionResponse> askQuestion(
//             @RequestHeader(value = "Authorization", required = false) String authHeader,
//             @RequestBody QuestionRequest request) {

//         if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//             return ApiResponse.<QuestionResponse>builder()
//                     .success(false)
//                     .message("User not logged in")
//                     .data(null)
//                     .build();
//         }

//         String token = authHeader.substring(7);

//         if (!JwtUtil.validateToken(token)) {
//             return ApiResponse.<QuestionResponse>builder()
//                     .success(false)
//                     .message("Invalid token")
//                     .data(null)
//                     .build();
//         }

//         Long userId = JwtUtil.extractUserId(token);

//         return questionService.askQuestion(request, userId);
//     }

//     @GetMapping("/{id}")
//     public ApiResponse<QuestionResponse> getQuestionById(
//             @PathVariable Long id,
//             @RequestHeader(value = "Authorization", required = false) String auth) {

//         Long userId = null;

//         if (auth != null && auth.startsWith("Bearer ")) {
//             userId = JwtUtil.extractUserId(auth.substring(7));
//         }

//         return questionService.getQuestionById(id, userId);
//     }

//     @GetMapping
//     public ApiResponse<Page<QuestionResponse>> getAllQuestions(
//             @RequestHeader(value = "Authorization", required = false) String authHeader,
//             @RequestParam(defaultValue = "0") int page,
//             @RequestParam(defaultValue = "10") int size) {

//         Long userId = getUserIdFromHeader(authHeader);
//         return questionService.getAllQuestions(page, size, userId);
//     }

//     @GetMapping("/category/{category}")
//     public ApiResponse<Page<QuestionResponse>> getByCategory(
//             @RequestHeader(value = "Authorization", required = false) String authHeader,
//             @PathVariable String category,
//             @RequestParam(defaultValue = "0") int page,
//             @RequestParam(defaultValue = "10") int size) {

//         Long userId = getUserIdFromHeader(authHeader);
//         return questionService.getQuestionsByCategory(category, page, size, userId);
//     }

//     @PutMapping("/{id}")
//     public ApiResponse<QuestionResponse> updateQuestion(
//             @RequestHeader("Authorization") String auth,
//             @PathVariable Long id,
//             @RequestBody QuestionRequest request) {

//         Long userId = JwtUtil.extractUserId(auth.substring(7));
//         return questionService.updateQuestion(id, request, userId);
//     }

//     @DeleteMapping("/{id}")
//     public ApiResponse<String> deleteQuestion(
//             @RequestHeader("Authorization") String auth,
//             @PathVariable Long id) {

//         Long userId = JwtUtil.extractUserId(auth.substring(7));
//         return questionService.deleteQuestion(id, userId);
//     }

//     @GetMapping("/search")
//     public ApiResponse<Page<QuestionResponse>> searchQuestions(
//             @RequestHeader(value = "Authorization", required = false) String authHeader,
//             @RequestParam String keyword,
//             @RequestParam(defaultValue = "0") int page,
//             @RequestParam(defaultValue = "10") int size) {

//         Long userId = getUserIdFromHeader(authHeader);
//         return questionService.searchQuestions(keyword, page, size, userId);
//     }

//     private Long getUserIdFromHeader(String authHeader) {
//         if (authHeader != null && authHeader.startsWith("Bearer ")) {
//             return JwtUtil.extractUserId(authHeader.substring(7));
//         }
//         return null;
//     }

// }


package com.AgroStack.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.AgroStack.dto.ApiResponse;
import com.AgroStack.dto.QuestionRequest;
import com.AgroStack.dto.QuestionResponse;
import com.AgroStack.service.QuestionService;
import com.AgroStack.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<ApiResponse<QuestionResponse>> askQuestion(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody QuestionRequest request) {

        if (authHeader == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.<QuestionResponse>builder()
                            .success(false)
                            .message("User not logged in")
                            .data(null)
                            .build());
        }

        String token = authHeader.substring(7);

        if (!JwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.<QuestionResponse>builder()
                            .success(false)
                            .message("Invalid token")
                            .data(null)
                            .build());
        }

        Long userId = JwtUtil.extractUserId(token);

        return ResponseEntity.ok(questionService.askQuestion(request, userId));
    }

    @GetMapping("/{id}")
    public ApiResponse<QuestionResponse> getQuestionById(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String auth) {

        Long userId = null;
        if (auth != null && auth.startsWith("Bearer ")) {
            userId = JwtUtil.extractUserId(auth.substring(7));
        }

        return questionService.getQuestionById(id, userId);
    }

    @GetMapping
    public ApiResponse<Page<QuestionResponse>> getAllQuestions(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Long userId = getUserIdFromHeader(authHeader);
        return questionService.getAllQuestions(page, size, userId);
    }

    @GetMapping("/category/{category}")
    public ApiResponse<Page<QuestionResponse>> getByCategory(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Long userId = getUserIdFromHeader(authHeader);
        return questionService.getQuestionsByCategory(category, page, size, userId);
    }

    @PutMapping("/{id}")
    public ApiResponse<QuestionResponse> updateQuestion(
            @RequestHeader("Authorization") String auth,
            @PathVariable Long id,
            @RequestBody QuestionRequest request) {

        Long userId = JwtUtil.extractUserId(auth.substring(7));
        return questionService.updateQuestion(id, request, userId);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteQuestion(
            @RequestHeader("Authorization") String auth,
            @PathVariable Long id) {

        Long userId = JwtUtil.extractUserId(auth.substring(7));
        return questionService.deleteQuestion(id, userId);
    }

    @GetMapping("/search")
    public ApiResponse<Page<QuestionResponse>> searchQuestions(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Long userId = getUserIdFromHeader(authHeader);
        return questionService.searchQuestions(keyword, page, size, userId);
    }

    private Long getUserIdFromHeader(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return JwtUtil.extractUserId(authHeader.substring(7));
        }
        return null;
    }
}
