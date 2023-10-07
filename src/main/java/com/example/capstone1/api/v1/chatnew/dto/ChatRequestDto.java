package com.example.capstone1.api.v1.chatnew.dto;


import com.example.capstone1.api.enums.MessageType;
import lombok.*;

public class ChatRequestDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {

        //메시지 타입 :  입장 채팅
        private MessageType type; //메시지 타입
        private String roomId;
        private String nickname;//채팅을 보낸 사람
        private String message;// 메세지


    }



}
