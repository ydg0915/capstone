package com.example.capstone1.api.v1.chatnew.mapper;

import com.example.capstone1.api.v1.chatnew.dto.ChatResponseDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomResponseDto;
import com.example.capstone1.api.v1.chatnew.entity.ChatRoom;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

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
        List<ChatRoomResponseDto.ListResponse> chatList = new ArrayList<>();
        for(int i=0;i<chatRooms.size();i++){
            ChatRoomResponseDto.ListResponse chat = new ChatRoomResponseDto.ListResponse();
            chat.setRoomName(chatRooms.get(i).getRoomName());
            chat.setId(chatRooms.get(i).getId());
            chat.setUserCount(chatRooms.get(i).getUserCount());
            chatList.add(chat);

        }
        return chatList;
    }
}
