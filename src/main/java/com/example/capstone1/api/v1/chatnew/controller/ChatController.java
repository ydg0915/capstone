package com.example.capstone1.api.v1.chatnew.controller;

import com.example.capstone1.api.enums.MessageType;
import com.example.capstone1.api.v1.chatnew.dto.ChatRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatResponseDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomResponseDto;
import com.example.capstone1.api.v1.chatnew.service.ChatService;
import com.example.capstone1.api.v1.dto.Response;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@Slf4j
@RequiredArgsConstructor
public class ChatController{

    // 아래에서 사용되는 convertAndSend 를 사용하기 위해서 서언
    // convertAndSend 는 객체를 인자로 넘겨주면 자동으로 Message 객체로 변환 후 도착지로 전송한다.
    private final SimpMessageSendingOperations template;
    private final ChatService chatService;
    private final Response response;

    @MessageMapping("/chat/{roomNo}")
    public void enterUser(@DestinationVariable(value = "roomNo") final String chatRoomNo,
            @Payload ChatRequestDto.Post chat, SimpMessageHeaderAccessor headerAccessor){
        log.info(chat.getMessage());
        log.info(chat.getUsername());

        if(MessageType.ENTER.equals(chat.getType())){
            //채팅방에 유저 추가 및 UserUUID 반환
            ChatResponseDto.Response chat1 = chatService.sendMessage(chat);
            log.info("ENTER!!!!!!!");
            log.info("chat1 : {}",chat1.getType());
            log.info("ENTER!!!!!!!");
            chat1.setMessage(chat1.getSender() + "님이 입장하셨습니다.");
            template.convertAndSend("/sub/chat/"+chatRoomNo,chat1);

        } else if (MessageType.TALK.equals(chat.getType())) {
            log.info("TALK!!!!!!!");
            log.info("chat : {}",chat.getType());
            log.info("TALK!!!!!!!");
            ChatResponseDto.Response response = chatService.sendMessage(chat);
            template.convertAndSend("/sub/chat/"+chatRoomNo,response);

        }


    }


    // 채팅방에 속한 채팅 반환
    @GetMapping("/chatroom/chatList")
    public ResponseEntity userList(@RequestParam long roomId){
        List<ChatResponseDto.ListResponse> responses =chatService.getChatList(roomId);
        return response.success(responses, "채팅 조회에 성공했습니다.");
    }



    /*
    //유저 퇴장 시에는 EventListener 를 통해서 유저 퇴장을 확인
    @EventListener
    public void webSocketDisconnectListener(SessionDisconnectEvent event){

        log.info("DisconnectEvent : {}",event);

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        // stomp 세션에 있던 uuid 와 roomId 를 확인하여 채팅방 유저 리스트와 room에서 해당 유저를 삭제
        String userUUID = (String) headerAccessor.getSessionAttributes().get("userUUID");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");

        log.info("headAccessor : {}",headerAccessor);

        // 채팅방 유저 -1
        repository.decreaseUser(roomId);

        //채팅방 유저 리스트에서 UUID 유저 닉네임 조회 및 리스트에서 유저 삭제
        String userName = chatService.getUserName(roomId, userUUID);
        chatService.deleteUser(roomId,userUUID);

        if(userName != null){
            log.info("User Disconnected : " + userName);

            ChatRequestDto chat = ChatRequestDto.builder()
                    .type(ChatRequestDto.MessageType.LEAVE)
                    .sender(userName)
                    .message(userName + "님이 퇴장하였습니다.")
                    .build();

            template.convertAndSend("/sub/chat/room/" + roomId,chat);
        }
    }

 */

/*
    // 채팅에 참여한 유저 닉네임 중복 확인
    @GetMapping("/duplicateName")
    @ResponseBody
    public String isDuplicateName(@RequestParam("roomId")String roomId ,
                                  @RequestParam("username")String username){

        String userName = chatService.isDuplicateName(roomId, username);
        log.info("DuplicateName : {}", userName);

        return userName;
    }

 */


}

