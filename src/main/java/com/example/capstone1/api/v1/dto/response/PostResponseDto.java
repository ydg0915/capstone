package com.example.capstone1.api.v1.dto.response;

import com.example.capstone1.api.enums.Position;
import com.example.capstone1.api.enums.TechStack;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

public class PostResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class PostInfo {
        private Long id;
        private String username;
        private String title;
        private String content;
        private int recruitmentSize;
        private List<Position> position;
        private List<TechStack> techStack;
        private LocalDate recruitmentPeriod;
        private int expectedDuration;
    }
}
