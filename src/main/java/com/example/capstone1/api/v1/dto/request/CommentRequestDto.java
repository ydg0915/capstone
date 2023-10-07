package com.example.capstone1.api.v1.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class CommentRequestDto {

    @Getter
    @Setter
    public static class CreateComment {
        @NotBlank(message = "내용을 입력해주세요")
        private String content;
    }

    @Getter
    @Setter
    public static class CreateReply {
        @NotBlank(message = "내용을 입력해주세요")
        private String content;
    }
}
