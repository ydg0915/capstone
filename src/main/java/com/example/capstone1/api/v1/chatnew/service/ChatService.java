package com.example.capstone1.api.v1.chatnew.service;

import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.exception.BusinessLogicException;
import com.example.capstone1.api.exception.ExceptionCode;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.chatnew.dto.ChatRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatResponseDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomResponseDto;
import com.example.capstone1.api.v1.chatnew.entity.Chat;
import com.example.capstone1.api.v1.chatnew.entity.ChatMid;
import com.example.capstone1.api.v1.chatnew.entity.ChatRoom;
import com.example.capstone1.api.v1.chatnew.mapper.ChatMapper;
import com.example.capstone1.api.v1.chatnew.mapper.ChatRoomMapper;
import com.example.capstone1.api.v1.chatnew.repo.ChatMidRepository;
import com.example.capstone1.api.v1.chatnew.repo.ChatRepository;
import com.example.capstone1.api.v1.chatnew.repo.ChatRoomRepository;
import com.example.capstone1.api.v1.repository.UsersRepository;
import com.example.capstone1.api.v1.service.UsersService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
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
    private final ChatRoomMapper chatRoomMapper;
    private final ChatMidRepository chatMidRepository;
    private final ChatMapper chatMapper;


    /*// 전체 채팅방 조회
    public List<ChatRoom> findAllRoom(){
        //채팅방 생성 순서를 최근순으로 반환
        List chatRooms = new ArrayList<>(chatRoomMap.values());
        Collections.reverse(chatRooms);

        return chatRooms;
    }


     */

    public ChatResponseDto.Response sendMessage(ChatRequestDto.Post chat){
        String username = SecurityUtil.getCurrentUsername();

        Chat chat1 = chatMapper.chatRequestDtoPostToChat(chat);

        ChatRoom chatRoom = chatRoomRepository.findChatRoomByRoomId(chat1.getRoomId());
        Optional<Users> users = usersRepository.findByUsername(username);

        ChatMid chatMid = new ChatMid();

        if(users.isPresent()){
            Users users1 = users.get();
            chatMid.setNickname(chat1.getNickname());
            chatMid.setChat(chat1);
            chatMid.setChatRoom(chatRoom);
            chatMid.setUsers(users1);
            ChatMid chatMidRepo = chatMidRepository.save(chatMid);

        }

        ChatResponseDto.Response chatMidRepo = chatMapper.chatToChatResponseDto(chat1);


        return chatMidRepo;



    }



    // roomId 기준으로 채팅방 찾기
    public ChatRoom findByRoomId(String roomId){

        ChatRoom room= chatRoomRepository.findChatRoomByRoomId(roomId);
        return room;
    }

    // roomName 으로 채팅방 만들기
    public ChatRoomResponseDto.Response createChatRoom(ChatRoomRequestDto.Post post){
        ChatRoom post1 = chatRoomMapper.chatRoomRequestDtoPostToChatRoom(post);
        log.info(post);
        String username = SecurityUtil.getCurrentUsername();

        //채팅룸 생성
        ChatRoom chatRoom = new ChatRoom();

        //유저 찾기
        Optional<Users> users = usersRepository.findByUsername(username);
        Users users1 = users.get();

        //채팅룸 생성2
        String RoomId = UUID.randomUUID().toString();
        String nickname = post1.getNickname();
        String roomName = post1.getRoomName();

        long userCount =0;
        post1.setRoomId(RoomId);
        post1.setUserCount(userCount);
        log.info(post1.getRoomName());
        log.info(post1.getNickname());
        //여기까지 된다

        chatRoomRepository.save(post1);

        //response
        ChatRoomResponseDto.Response response = chatRoomMapper.chatRoomToChatRoomResponseDto(post1);
        log.info("------여기 2번 ");
        log.info(response);
        log.info(response.getChatRoomId());
        log.info(response.getNickname());
        log.info("------여기 2번 ");
        return response;
    }

    // 채팅방 인원 +1
    public void increaseUser(String roomId){

        ChatRoom chatRoom = chatRoomRepository.findChatRoomByRoomId(roomId);
        chatRoom.setUserCount(chatRoom.getUserCount()+1);
        chatRoomRepository.save(chatRoom);
    }

    // 채팅방 인원 -1
    public void decreaseUser(String roomId){

        ChatRoom chatRoom = chatRoomRepository.findChatRoomByRoomId(roomId);
        chatRoom.setUserCount(chatRoom.getUserCount()-1);
    }

    //채팅방 유저 리스트에 유저추가 -> 이거 유저 미드에 넣으면 되지 않을까 ?
    //유저 미드에서 채팅방 찾고 그 채팅방에서 유저 네임을 찾으면 될듯
    public ChatMid addUser(ChatRequestDto.Post chat){

        Chat chat1 = chatMapper.chatRequestDtoPostToChat(chat);
        String username = SecurityUtil.getCurrentUsername();
        //채팅 아이디로 채팅방 찾기
        ChatRoom chatRoom = chatRoomRepository.findChatRoomByRoomId(chat.getRoomId());

        //채팅

        //새롭게 입장하고 싶어하는 유저
        Users users = new Users();
        users = usersService.getUsers(username);

        //아이디 중복 확인 후 userList에 추가
        ChatMid chatMid = new ChatMid();
        ChatMid chatMid1 = new ChatMid();
        List<ChatMid> chatMidList = new ArrayList<>();
        chatMidList = users.getChatMids();
        List<ChatMid> chatMids = chatMidRepository.findChatRoomByRoomId(chat.getRoomId());

        for(int i=1;i<chatMids.size();i++){
            Users users1 = chatMids.get(i).getUsers(); //원래 있던 유저
            if(users1.equals(users)){
                throw new BusinessLogicException(ExceptionCode.USERS_ALREADY_EXIST);
            }
            else{
                chatMid.setChatRoom(chatRoom);
                chatMid.setUsers(users);
                chatMid.setNickname(chat1.getNickname());
                chatMid.setChat(chat1);
                //채팅 미드에 넣어준다.
                chatMid1 = chatMidRepository.save(chatMid);
                chatMidList.add(chatMid1);

                //유저에 채팅 미드를 넣어준다.
                users.setChatMids(chatMidList);
                usersRepository.save(users);

            }
        }

        return chatMid;
    }



    // 채팅방 유저 이름 중복 확인
    public String isDuplicateName(String roomId,String username){

        ChatRoom chatRoom = chatRoomRepository.findChatRoomByRoomId(roomId);
        String temp = username;

        // 만약 username이 중복이라면 랜덤한 숫자를 붙여준다.
        // 이 때 랜덤한 숫자를 붙였을때 getUserList 안에 있는 닉네임이라면 다시 랜덤한 숫자 붙이기
        while(chatRoom.getNickname().equals(temp)){
            int ranNum = (int) (Math.random() * 100) + 1;
            temp = username+ranNum;
        }

        return temp;
    }
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