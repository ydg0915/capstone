package com.example.capstone1.api.v1.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class LogoRequestDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class PatchImage {
        private long id;
        private List<MultipartFile> images;
    }


}
