package com.example.capstone1.api.v1.chatnew.mapper;

import com.example.capstone1.api.v1.chatnew.dto.ChatRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatResponseDto;
import com.example.capstone1.api.v1.chatnew.entity.Chat;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChatMapper {
    ChatResponseDto.Response chatToChatResponseDto(Chat chat);
    Chat chatRequestDtoPostToChat(ChatRequestDto.Post post);

}
