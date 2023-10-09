package com.example.capstone1.api.v1.chatnew.mapper;

import com.example.capstone1.api.enums.MessageType;
import com.example.capstone1.api.v1.chatnew.dto.ChatRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatResponseDto;
import com.example.capstone1.api.v1.chatnew.entity.Chat;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface ChatMapper {
    default ChatResponseDto.Response chatToChatResponseDto(Chat chat){

        long roomid = chat.getChatRoom().getId();
        MessageType messageType = chat.getType();
        String sender = chat.getUsers().getUsername();
        String message = chat.getMessage();
        LocalDateTime createdDate = chat.getCreateDate();

        ChatResponseDto.Response chat1 = new ChatResponseDto.Response(messageType, roomid,
                sender,message,createdDate);

        return chat1;
    }
    Chat chatRequestDtoPostToChat(ChatRequestDto.Post post);

}
