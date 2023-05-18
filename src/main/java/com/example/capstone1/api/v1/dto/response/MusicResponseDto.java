package com.example.capstone1.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


public class MusicResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class TrackInfo {
        private String artistName;
        private String trackTitle;
        private String albumImageUrl;
    }
}
