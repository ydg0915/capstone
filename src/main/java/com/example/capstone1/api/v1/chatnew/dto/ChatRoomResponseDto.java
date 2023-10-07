package com.example.capstone1.api.v1.chatnew.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


public class ChatRoomResponseDto {


    @Getter
    @AllArgsConstructor
    public static class Response {
        private long chatRoomId;
        private String roomId;
        private String roomName;// 채팅방 이름
        private long userCount; // 채팅방 인원수
        private String nickname; //닉네임
    }






}