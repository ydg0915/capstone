package com.example.capstone1.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class BookMarkResponseDto {

    @Getter
    @AllArgsConstructor
    public static class Response{
        private long id; //북마크 아이디
        private long PostId; //북마크한 게시글 아이디
        private String title; //북마크한 게시글 제목

    }


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ListResponse {
        private long id; //좋아요식별아이디
        private long PostsId; //포스트 아이디
        private String Title; //북마크한 포스트 이름
        private String name; // 해당 포스트를 올린 사용자 userName
    }
}
