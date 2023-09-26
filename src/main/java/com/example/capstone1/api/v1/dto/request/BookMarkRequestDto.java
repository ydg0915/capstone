package com.example.capstone1.api.v1.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class BookMarkRequestDto {
    @Getter
    @AllArgsConstructor
    public static class Post {


    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private int id; //좋아요식별아이디
    }
}
