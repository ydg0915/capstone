package com.example.capstone1.api.v1.chatnew.service;


import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.chatnew.dto.ChatResponseDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomResponseDto;
import com.example.capstone1.api.v1.chatnew.entity.Chat;
import com.example.capstone1.api.v1.chatnew.entity.ChatRoom;
import com.example.capstone1.api.v1.chatnew.mapper.ChatMapper;
import com.example.capstone1.api.v1.chatnew.mapper.ChatRoomMapper;
import com.example.capstone1.api.v1.chatnew.repo.ChatRepository;
import com.example.capstone1.api.v1.chatnew.repo.ChatRoomRepository;
import com.example.capstone1.api.v1.repository.UsersRepository;
import com.example.capstone1.api.v1.service.UsersService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
@AllArgsConstructor
@Log4j2
//추후 DB와 연결 시 Service 와 Repository 로 분리 예정
public class ChatRoomService {

    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UsersService usersService;
    private final UsersRepository usersRepository;
    private final ChatRoomMapper chatRoomMapper;
    private final ChatMapper chatMapper;




    // roomName 으로 채팅방 만들기
    public ChatRoomResponseDto.Response createChatRoom(ChatRoomRequestDto.Post post){
        String username = SecurityUtil.getCurrentUsername();
        //log.info(post.getUsername()+"여기서 확인!!!!!!");
        ChatRoom post1 = chatRoomMapper.chatRoomRequestDtoPostToChatRoom(post);
        long userCount =0;
        post1.setUserCount(userCount);
        log.info(post1.getRoomName());


        //채팅방의 주인을 유저 엔티티에 넣어야 됨
        Optional<Users> users = usersRepository.findByUsername(post.getUsername());
        Users users1 = users.get();
        //log.info("여기!!!!!!내가 확인해야됨 !!!1"  + users1.getUsername());
        post1.setUsers(users1);

        //채팅을 신청한 사람의 이름
        post1.setUsername(username);

        chatRoomRepository.save(post1);

        //response
        ChatRoomResponseDto.Response response = chatRoomMapper.chatRoomToChatRoomResponseDto(post1);
        log.info("------여기 2번 ");
        log.info(response);
        log.info(response.getId());
        log.info("------여기 2번 ");
        return response;
    }


    public List<ChatRoomResponseDto.ListResponse> findAllRoom() {
        String username = SecurityUtil.getCurrentUsername();
        List<Chat> chats = chatRepository.findChatByUserName(username);
        Set<ChatRoom> chatRooms = new HashSet<>(); // HashSet을 사용하여 중복 제거
        for (int i = 0; i < chats.size(); i++) {
            ChatRoom chatRoom = chats.get(i).getChatRoom();
            chatRooms.add(chatRoom); // 이미 존재하는 chatRoom은 무시됨
        }

        List<ChatRoomResponseDto.ListResponse> chatList = chatRoomMapper.ChatRoomToChatRoomResponseList(new ArrayList<>(chatRooms));
        return chatList;
    }


    // username 기준으로 채팅방 찾기
    public List<ChatRoomResponseDto.ListResponse> findChatRoomByUserName(){
        String username = SecurityUtil.getCurrentUsername();
        log.info("username!!!!!!!"+username);
        List<ChatRoom> room= chatRoomRepository.findChatRoomByUsername(username);
        List<ChatRoomResponseDto.ListResponse> chatList = chatRoomMapper.ChatRoomToChatRoomResponseList(room);
        return chatList;
    }

    // 채팅방 인원 +1
    public void increaseUser(long roomId){

        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(roomId);
        ChatRoom chatRoom1 = chatRoom.get();
        log.info("여기 채팅 인원 +1 ");
        log.info(chatRoom1);
        log.info("여기 채팅 인원 +2 ");
        log.info(chatRoom1.getRoomName());
        log.info(chatRoom1.getUserCount());
        chatRoom1.setUserCount(chatRoom1.getUserCount()+1);

        chatRoomRepository.save(chatRoom1);
    }

    // 채팅방 인원 -1
    public void decreaseUser(long roomId){

        ChatRoom chatRoom = chatRoomRepository.findChatRoomByRoomId(roomId);
        chatRoom.setUserCount(chatRoom.getUserCount()-1);
        chatRoomRepository.save(chatRoom);
    }

    //채팅방에서 유저가 나갈때
    public List<ChatResponseDto.ListResponse> exitChat(long roomId,String username){
        List<Chat> chats = chatRepository.findChatByUserNameAndRoomId(username,roomId);
        List<ChatResponseDto.ListResponse> chatList = new ArrayList<>();
        for(int i=0;i<chats.size();i++){
            Chat chat = new Chat();
            ChatResponseDto.ListResponse ls = new ChatResponseDto.ListResponse();
            chat = chats.get(i);
            chat.setUsers(null);
            chatRepository.save(chat);
            String name = "알수없는 유저 ";
            ls.setSender(name);
            ls.setMessage(chat.getMessage());
            ls.setCreateDate(chat.getCreateDate());
            chatList.add(ls);
        }

        ChatRoom chatRoom = chatRoomRepository.findChatRoomByRoomId(roomId);

        if(chatRoom.getUserCount()==0){
            chatRoomRepository.save(chatRoom);
        }else{
            chatRoom.setUserCount(chatRoom.getUserCount()-1);
        }

        return chatList;
    }







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