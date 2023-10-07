package com.example.capstone1.api.v1.chatnew.dto;

import com.example.capstone1.api.entity.BaseTime;
import com.example.capstone1.api.enums.MessageType;
import com.example.capstone1.api.v1.chatnew.entity.ChatMid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


public class ChatRoomRequestDto{
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {

        //메시지 타입 :  입장 채팅
        private String roomName;// 채팅방 이름
        private String nickname; //생성한 사람의 닉네임


    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        //메시지 타입 :  입장 채팅
        private String roomName;// 채팅방 이름
        private String nickname; //닉네임


    }





}