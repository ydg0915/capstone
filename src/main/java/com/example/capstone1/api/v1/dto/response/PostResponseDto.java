package com.example.capstone1.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class PostResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class PostInfo {
        private Long id;
        private String title;
        private String content;
        private String username;
    }
}
