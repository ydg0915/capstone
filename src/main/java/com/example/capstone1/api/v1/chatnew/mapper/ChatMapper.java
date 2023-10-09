package com.example.capstone1.api.v1.chatnew.mapper;

import com.example.capstone1.api.enums.MessageType;
import com.example.capstone1.api.v1.chatnew.dto.ChatRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatResponseDto;
import com.example.capstone1.api.v1.chatnew.entity.Chat;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    default List<ChatResponseDto.ListResponse> chatToChatListResponseDto(List<Chat> chat){
        List<ChatResponseDto.ListResponse> chatList = new ArrayList<>();
        for(int i=0;i<chat.size();i++){
            ChatResponseDto.ListResponse chat1 = new ChatResponseDto.ListResponse();
            chat1.setSender(chat.get(i).getUsers().getUsername());
            chat1.setMessage(chat.get(i).getMessage());
            chat1.setCreateDate(chat.get(i).getCreateDate());
            chatList.add(chat1);
        }
        return chatList;
    }
    Chat chatRequestDtoPostToChat(ChatRequestDto.Post post);

}
