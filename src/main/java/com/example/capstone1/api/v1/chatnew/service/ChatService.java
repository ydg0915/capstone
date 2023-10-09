package com.example.capstone1.api.v1.chatnew.service;

import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.enums.MessageType;
import com.example.capstone1.api.exception.BusinessLogicException;
import com.example.capstone1.api.exception.ExceptionCode;
import com.example.capstone1.api.v1.chatnew.dto.ChatRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatResponseDto;
import com.example.capstone1.api.v1.chatnew.entity.Chat;
import com.example.capstone1.api.v1.chatnew.entity.ChatRoom;
import com.example.capstone1.api.v1.chatnew.mapper.ChatMapper;
import com.example.capstone1.api.v1.chatnew.repo.ChatRepository;
import com.example.capstone1.api.v1.chatnew.repo.ChatRoomRepository;
import com.example.capstone1.api.v1.repository.UsersRepository;
import com.example.capstone1.api.v1.service.UsersService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
@AllArgsConstructor
@Log4j2
//추후 DB와 연결 시 Service 와 Repository 로 분리 예정
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UsersService usersService;
    private final UsersRepository usersRepository;
    private final ChatRoomService chatRoomService;
    private final ChatMapper chatMapper;





    //채팅방 유저 리스트에 유저추가 -> 이거 유저 미드에 넣으면 되지 않을까 ?
    //유저 미드에서 채팅방 찾고 그 채팅방에서 유저 네임을 찾으면 될듯
    public ChatResponseDto.Response sendMessage(ChatRequestDto.Post chat){
        Chat chat1 = chatMapper.chatRequestDtoPostToChat(chat);

        //만약 enter이 존재한다면 예외처리
        if(MessageType.ENTER.equals(chat.getType())){
            //chatRoom에 이미 enter이 된 사람이라면 다시 접속 x
            //유저네임이랑 룸으로 유저 채팅리스트 가져옴
            List<Chat> a = chatRepository.findChatByUserNameAndRoomId(chat.getUsername(),chat.getRoomId());

            for(int i=0;i<a.size();i++){
                Chat chat2 = a.get(i);
                if(MessageType.ENTER.equals(chat2.getType())){
                    throw new BusinessLogicException(ExceptionCode.ENTER_ALREADY_EXISTS);
                }
            }
        }

        if(MessageType.ENTER.equals(chat.getType())){
            log.info("여기 엔터 확인111111");
            log.info(chat.getRoomId());
            //채팅방 유저 +1;
            chatRoomService.increaseUser(chat.getRoomId());
        }

        Optional<ChatRoom> chatRoom1 = chatRoomRepository.findById(chat.getRoomId());
        ChatRoom chatRoom = chatRoom1.get();
        String username = chat.getUsername();

        Optional<Users> users = usersRepository.findByUsername(username);

        chat1.setUsers(users.get());
        chat1.setChatRoom(chatRoom);
        log.info("Test!!!!!!!!!!!!!");
        log.info(chat1.getMessage());
        log.info(chat1.getType());
        log.info(chat1.getChatId());
        log.info(chat1.getUsers().getUsername());
        log.info(chat1.getChatRoom().getRoomName());
        log.info("Test!!!!!!!!!!!!!");


        Chat a = chatRepository.save(chat1);
        ChatResponseDto.Response response = chatMapper.chatToChatResponseDto(a);

        return response;
    }


/*
    // 채팅방 유저 이름 중복 확인
    public String isDuplicateName(String roomId,String username){

        ChatRoom chatRoom = chatRoomRepository.findChatRoomByRoomId(roomId);
        String temp = username;

        // 만약 username이 중복이라면 랜덤한 숫자를 붙여준다.
        // 이 때 랜덤한 숫자를 붙였을때 getUserList 안에 있는 닉네임이라면 다시 랜덤한 숫자 붙이기
        while(chatRoom.getUsername().equals(temp)){
            int ranNum = (int) (Math.random() * 100) + 1;
            temp = username+ranNum;
        }

        return temp;
    }

 */


/*
    // 채팅방 유저 리스트 삭제 ->이것도 유저 미드에서 삭제
    //미드에서 채팅 가져오자
    public void deleteUser(String roomId,String userUUID){
        ChatRoom chatRoom = chatRoomRepository.findChatRoomByRoomId(roomId);
        chatRoom.getUserList().remove(userUUID);
    }


 */
    /*
    // 채팅방에 참여한 유저 리스트
    public String getUserName(String roomId,String userUUID){
        ChatRoom chatRoom = chatRoomMap.get(roomId);

        return chatRoom.getUserList().get(userUUID);
    }

     */
/*
    //채팅방 전체 userList 조회
    public List<String> getUserList(String roomId){
        List<String> list = new ArrayList<>();

        ChatRoom chatRoom = chatRoomMap.get(roomId);

        chatRoom.getUserList().forEach((key,value) -> list.add(value));
        
        return list;
    }


 */
}