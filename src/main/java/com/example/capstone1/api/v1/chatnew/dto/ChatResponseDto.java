package com.example.capstone1.api.v1.chatnew.dto;


import com.example.capstone1.api.enums.MessageType;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatResponseDto {
    //메시지 타입 :  입장 채팅
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private MessageType type; //메시지 타입
        private Long roomId;// 방 번호
        private String sender;//채팅을 보낸 사람
        private String message;// 메세지
        private LocalDateTime createDate; // 채팅 발송 시간
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ListResponse {
        private String sender;//채팅을 보낸 사람
        private String message;// 메세지
        private LocalDateTime createDate; // 채팅 발송 시간
    }

}
