package com.example.capstone1.api.v1.dto.response;

import com.example.capstone1.api.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

public class FollowResponseDto {

    @Getter
    @AllArgsConstructor
    public static class Response{
        private Long id; //팔로우 식별아이디
        private String userid; //팔로우 한 사람
        private String username;//팔로우 된 사람

    }


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ListResponse {
        private Long id; //팔로우 식별아이디
        private String userid; //팔로우 한 사람
        private String username;//팔로우 된 사람
    }
}
