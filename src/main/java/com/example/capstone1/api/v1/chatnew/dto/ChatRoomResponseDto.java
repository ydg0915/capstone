package com.example.capstone1.api.v1.chatnew.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


public class ChatRoomResponseDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private long id; //채팅방 아이디
        private String roomName;// 채팅방 이름
        private String username; //채팅을 요청한 사람의 이름
        private String ownUserName; //채팅을 요청당한 사람의 이름
        private long userCount; // 채팅방 인원수
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ListResponse {
        private long id; //채팅방 아이디
        private String roomName;// 채팅방 이름
        private long userCount; // 채팅방 인원수
        private LocalDateTime createDate;
    }





}