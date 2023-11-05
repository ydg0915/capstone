package com.example.capstone1.api.v1.chatnew.mapper;

import com.example.capstone1.api.v1.chatnew.dto.ChatResponseDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomResponseDto;
import com.example.capstone1.api.v1.chatnew.entity.ChatRoom;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ChatRoomMapper {
    default ChatRoomResponseDto.Response chatRoomToChatRoomResponseDto(ChatRoom chatRoom){
        ChatRoomResponseDto.Response response = new ChatRoomResponseDto.Response();
        response.setUserCount(chatRoom.getUserCount());
        response.setOwnUserName(chatRoom.getUsers().getUsername());
        response.setUsername(chatRoom.getUsername());
        response.setRoomName(chatRoom.getRoomName());
        response.setId(chatRoom.getId());

        return response;
    }
    ChatRoom chatRoomRequestDtoPostToChatRoom(ChatRoomRequestDto.Post post);
    ChatRoom chatRoomRequestDtoPatchToChatRoom(ChatRoomRequestDto.Patch patch);

    default List<ChatRoomResponseDto.ListResponse> ChatRoomToChatRoomResponseList(List<ChatRoom> chatRooms){
        List<ChatRoomResponseDto.ListResponse> chatList = chatRooms.stream()
                .map(chatRoom -> {
                    ChatRoomResponseDto.ListResponse chat = new ChatRoomResponseDto.ListResponse();
                    chat.setRoomName(chatRoom.getRoomName());
                    chat.setId(chatRoom.getId());
                    chat.setUserCount(chatRoom.getUserCount());
                    chat.setCreateDate(chatRoom.getCreateDate());
                    return chat;
                })
                .sorted(Comparator.comparing(ChatRoomResponseDto.ListResponse::getCreateDate))
                .collect(Collectors.toList());

        return chatList;
    }
}
