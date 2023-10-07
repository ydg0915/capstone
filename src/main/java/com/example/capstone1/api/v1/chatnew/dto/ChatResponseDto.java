package com.example.capstone1.api.v1.chatnew.dto;


import com.example.capstone1.api.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class ChatResponseDto {
    //메시지 타입 :  입장 채팅
    @Getter
    @AllArgsConstructor
    public static class Response {
        private MessageType type; //메시지 타입
        private String roomId;// 방 번호
        private String sender;//채팅을 보낸 사람
        private String message;// 메세지
        private String createDate; // 채팅 발송 시간
    }

}
