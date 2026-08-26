package com.AgroStack.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import okhttp3.RequestBody;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

        @Value("${gemini.api.key}")
        private String apiKey;

        // ✅ VERIFIED WORKING MODEL FROM ListModels
        private static final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-3.6-flash:generateContent?key=";

        @PostMapping("/chat")
        public String chat(@org.springframework.web.bind.annotation.RequestBody String prompt) throws IOException {

                // ⏱ Increase timeouts to avoid SocketTimeoutException
                OkHttpClient client = new OkHttpClient.Builder()
                                .connectTimeout(30, TimeUnit.SECONDS)
                                .readTimeout(60, TimeUnit.SECONDS)
                                .writeTimeout(30, TimeUnit.SECONDS)
                                .build();

                // 🔒 Escape prompt safely for JSON
                String agriculturePrompt = """
                                You are an AI assistant specialized exclusively in agriculture.

                                You can answer questions related to:
                                crops, farming, soil, irrigation, fertilizers, pesticides,
                                plant diseases, seeds, livestock, agricultural machinery,
                                agricultural technology, farm management, organic farming,
                                horticulture, agricultural weather, and agricultural schemes.

                                If the user's question is not related to agriculture,
                                do not answer it.

                                Respond exactly:
                                "I can only help with agriculture-related questions."

                                User question:
                                """ + prompt;

                String safePrompt = agriculturePrompt
                                .replace("\\", "\\\\")
                                .replace("\"", "\\\"")
                                .replace("\n", "\\n");

                String json = """
                                {
                                  "contents": [{
                                    "parts": [{
                                      "text": "%s"
                                    }]
                                  }]
                                }
                                """.formatted(safePrompt);

                RequestBody body = RequestBody.create(
                                json,
                                MediaType.parse("application/json; charset=utf-8"));

                Request request = new Request.Builder()
                                .url(GEMINI_URL + apiKey)
                                .post(body)
                                .build();

                try (Response response = client.newCall(request).execute()) {

                        String raw = response.body() != null ? response.body().string() : "";

                        if (!response.isSuccessful()) {
                                throw new RuntimeException(
                                                "❌ Gemini API error: " + response.code() + " → " + raw);
                        }

                        // ✅ SAFE JSON PARSING (NO STRING HACKS)
                        ObjectMapper mapper = new ObjectMapper();
                        JsonNode root = mapper.readTree(raw);

                        JsonNode textNode = root
                                        .path("candidates")
                                        .path(0)
                                        .path("content")
                                        .path("parts")
                                        .path(0)
                                        .path("text");

                        return textNode.isMissingNode()
                                        ? "No AI response"
                                        : textNode.asText();
                }
        }
}
