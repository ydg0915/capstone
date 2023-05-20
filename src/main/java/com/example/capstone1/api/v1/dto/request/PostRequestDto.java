package com.example.capstone1.api.v1.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class PostRequestDto {

    @Getter
    @Setter
    public static class Create {

        @NotBlank(message = "제목을 입력해주세요")
        private String title;
        @NotBlank(message = "내용을 입력해주세요")
        private String content;
    }

    @Getter
    @Setter
    public static class Update {

        @NotBlank(message = "제목을 입력해주세요")
        private String title;
        @NotBlank(message = "내용을 입력해주세요")
        private String content;
    }
}
