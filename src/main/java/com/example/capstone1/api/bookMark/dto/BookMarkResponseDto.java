package com.example.capstone1.api.bookMark.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class BookMarkResponseDto {

    @Getter
    @AllArgsConstructor
    public static class Response{
        private int id;
        private long PostId;
        private String UserLoginId;

    }


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ListResponse {
        private int id; //좋아요식별아이디
        private long PostsId; //포스트 아이디
        private String Title; //포스트 이름
    }
}
