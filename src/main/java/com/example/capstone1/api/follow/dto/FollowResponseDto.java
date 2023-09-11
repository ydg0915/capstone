package com.example.capstone1.api.follow.dto;

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
        private String User;
        private String UserName;

    }


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ListResponse {
        private int id; //팔로우 식별아이디
        private String UserId; //유저아이디
        private String UserName; //유저 이름
    }
}
