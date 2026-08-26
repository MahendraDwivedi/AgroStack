// package com.AgroStack.controller;

// import org.springframework.data.domain.Page;
// import org.springframework.web.bind.annotation.*;

// import com.AgroStack.dto.AnswerRequest;
// import com.AgroStack.dto.AnswerResponse;
// import com.AgroStack.dto.ApiResponse;
// import com.AgroStack.service.AnswerService;
// import com.AgroStack.util.JwtUtil;

// import lombok.RequiredArgsConstructor;

// @RestController
// @RequestMapping("/api/answers")
// @RequiredArgsConstructor
// public class AnswerController {

//     private final AnswerService answerService;

//     @PostMapping
//     public ApiResponse<AnswerResponse> addAnswer(
//             @RequestHeader(value = "Authorization", required = false) String authHeader,
//             @RequestBody AnswerRequest request) {

//         // 1️⃣ Check login
//         if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//             return ApiResponse.<AnswerResponse>builder()
//                     .success(false)
//                     .message("User not logged in")
//                     .data(null)
//                     .build();
//         }

//         String token = authHeader.substring(7);

//         // 2️⃣ Validate token
//         if (!JwtUtil.validateToken(token)) {
//             return ApiResponse.<AnswerResponse>builder()
//                     .success(false)
//                     .message("Invalid or expired token")
//                     .data(null)
//                     .build();
//         }

//         // // 3️⃣ Role check (EXPERT only)
//         // String role = JwtUtil.extractRole(token);

//         // 4️⃣ Attach logged-in user ID
//         Long userId = JwtUtil.extractUserId(token);

//         // 5️⃣ Call service
//         return answerService.addAnswer(request, userId);
//     }

//     @GetMapping("/question/{questionId}")
//     public ApiResponse<Page<AnswerResponse>> getByQuestion(
//             @RequestHeader(value = "Authorization", required = false) String authHeader,
//             @PathVariable Long questionId,
//             @RequestParam(defaultValue = "0") int page,
//             @RequestParam(defaultValue = "5") int size) {

//         Long userId = null;

//         if (authHeader != null && authHeader.startsWith("Bearer ")) {
//             String token = authHeader.substring(7);
//             if (JwtUtil.validateToken(token)) {
//                 userId = JwtUtil.extractUserId(token);
//             }
//         }

//         return answerService.getAnswersByQuestion(questionId, page, size, userId);
//     }

//     @PutMapping("/{questionId}/accept/{answerId}")
//     public ApiResponse<String> acceptAnswer(
//             @RequestHeader(value = "Authorization", required = false) String authHeader,
//             @PathVariable Long questionId,
//             @PathVariable Long answerId) {

//         if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//             return ApiResponse.<String>builder()
//                     .success(false)
//                     .message("User not logged in")
//                     .data(null)
//                     .build();
//         }

//         String token = authHeader.substring(7);

//         if (!JwtUtil.validateToken(token)) {
//             return ApiResponse.<String>builder()
//                     .success(false)
//                     .message("Invalid token")
//                     .data(null)
//                     .build();
//         }

//         Long userId = JwtUtil.extractUserId(token);
//         return answerService.acceptAnswer(questionId, answerId, userId);
//     }

//     @PostMapping("/{answerId}/vote")
//     public ApiResponse<String> voteAnswer(
//             @RequestHeader(value = "Authorization", required = false) String authHeader,
//             @PathVariable Long answerId,
//             @RequestParam String type) {

//         if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//             return ApiResponse.<String>builder()
//                     .success(false)
//                     .message("User not logged in")
//                     .data(null)
//                     .build();
//         }

//         String token = authHeader.substring(7);

//         if (!JwtUtil.validateToken(token)) {
//             return ApiResponse.<String>builder()
//                     .success(false)
//                     .message("Invalid token")
//                     .data(null)
//                     .build();
//         }

//         Long userId = JwtUtil.extractUserId(token);
//         return answerService.voteAnswer(answerId, userId, type);
//     }

//     @PutMapping("/{id}")
//     public ApiResponse<AnswerResponse> updateAnswer(
//             @RequestHeader("Authorization") String authHeader,
//             @PathVariable Long id,
//             @RequestParam String content) {

//         String token = authHeader.substring(7);
//         Long userId = JwtUtil.extractUserId(token);

//         return answerService.updateAnswer(id, content, userId);
//     }

//     @DeleteMapping("/{id}")
//     public ApiResponse<String> deleteAnswer(
//             @RequestHeader("Authorization") String authHeader,
//             @PathVariable Long id) {

//         String token = authHeader.substring(7);
//         Long userId = JwtUtil.extractUserId(token);

//         return answerService.deleteAnswer(id, userId);
//     }

// }


package com.AgroStack.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.AgroStack.dto.AnswerRequest;
import com.AgroStack.dto.AnswerResponse;
import com.AgroStack.dto.ApiResponse;
import com.AgroStack.service.AnswerService;
import com.AgroStack.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/answers")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    @PostMapping
    public ApiResponse<AnswerResponse> addAnswer(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody AnswerRequest request) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.<AnswerResponse>builder()
                    .success(false)
                    .message("User not logged in")
                    .data(null)
                    .build();
        }

        String token = authHeader.substring(7);

        if (!JwtUtil.validateToken(token)) {
            return ApiResponse.<AnswerResponse>builder()
                    .success(false)
                    .message("Invalid or expired token")
                    .data(null)
                    .build();
        }

        Long userId = JwtUtil.extractUserId(token);
        return answerService.addAnswer(request, userId);
    }

    @GetMapping("/question/{questionId}")
    public ApiResponse<Page<AnswerResponse>> getByQuestion(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable Long questionId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Long userId = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (JwtUtil.validateToken(token)) {
                userId = JwtUtil.extractUserId(token);
            }
        }

        return answerService.getAnswersByQuestion(questionId, page, size, userId);
    }

    @PutMapping("/{questionId}/accept/{answerId}")
    public ApiResponse<String> acceptAnswer(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable Long questionId,
            @PathVariable Long answerId) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("User not logged in")
                    .data(null)
                    .build();
        }

        String token = authHeader.substring(7);

        if (!JwtUtil.validateToken(token)) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("Invalid or expired token")
                    .data(null)
                    .build();
        }

        Long userId = JwtUtil.extractUserId(token);
        return answerService.acceptAnswer(questionId, answerId, userId);
    }

    @PostMapping("/{answerId}/vote")
    public ApiResponse<String> voteAnswer(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable Long answerId,
            @RequestParam String type) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("User not logged in")
                    .data(null)
                    .build();
        }

        String token = authHeader.substring(7);

        if (!JwtUtil.validateToken(token)) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("Invalid or expired token")
                    .data(null)
                    .build();
        }

        Long userId = JwtUtil.extractUserId(token);
        return answerService.voteAnswer(answerId, userId, type);
    }

    // ✅ FIXED: validation added
    @PutMapping("/{id}")
    public ApiResponse<AnswerResponse> updateAnswer(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable Long id,
            @RequestParam String content) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.<AnswerResponse>builder()
                    .success(false)
                    .message("User not logged in")
                    .data(null)
                    .build();
        }

        String token = authHeader.substring(7);

        if (!JwtUtil.validateToken(token)) {
            return ApiResponse.<AnswerResponse>builder()
                    .success(false)
                    .message("Invalid or expired token")
                    .data(null)
                    .build();
        }

        Long userId = JwtUtil.extractUserId(token);
        return answerService.updateAnswer(id, content, userId);
    }

    // ✅ FIXED: validation added
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteAnswer(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable Long id) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("User not logged in")
                    .data(null)
                    .build();
        }

        String token = authHeader.substring(7);

        if (!JwtUtil.validateToken(token)) {
            return ApiResponse.<String>builder()
                    .success(false)
                    .message("Invalid or expired token")
                    .data(null)
                    .build();
        }

        Long userId = JwtUtil.extractUserId(token);
        return answerService.deleteAnswer(id, userId);
    }
}
