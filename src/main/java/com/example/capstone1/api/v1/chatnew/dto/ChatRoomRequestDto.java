package com.example.capstone1.api.v1.chatnew.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class ChatRoomRequestDto{
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        //메시지 타입 :  입장 채팅
        private String roomName;// 채팅방 이름
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {
        //메시지 타입 :  입장 채팅
        private String roomName;// 채팅방 이름
        private String username; //닉네임
    }

}