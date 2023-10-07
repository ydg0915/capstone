package com.example.capstone1.api.v1.chatnew.mapper;

import com.example.capstone1.api.v1.chatnew.dto.ChatRoomRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomResponseDto;
import com.example.capstone1.api.v1.chatnew.entity.ChatRoom;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChatRoomMapper {
    ChatRoomResponseDto.Response chatRoomToChatRoomResponseDto(ChatRoom chatRoom);
    ChatRoom chatRoomRequestDtoPostToChatRoom(ChatRoomRequestDto.Post post);
    ChatRoom chatRoomRequestDtoPatchToChatRoom(ChatRoomRequestDto.Patch patch);
}
