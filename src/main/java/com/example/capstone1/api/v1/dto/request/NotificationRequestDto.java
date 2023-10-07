package com.example.capstone1.api.v1.dto.request;

import com.example.capstone1.api.entity.Users;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class NotificationRequestDto {

    @Builder
    @Getter
    @Setter
    public static class Send {
        @NotBlank(message = "내용을 입력해주세요")
        private String content;

        @NotEmpty(message = "url을 입력해주세요")
        private String url;

        @NotNull
        private Users receiver;
    }
}
