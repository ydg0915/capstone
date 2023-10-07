package com.example.capstone1.api.v1.chatnew.controller;

import com.example.capstone1.api.v1.chatnew.dto.ChatRoomRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomResponseDto;
import com.example.capstone1.api.v1.chatnew.entity.ChatRoom;
import com.example.capstone1.api.v1.chatnew.repo.ChatMidRepository;
import com.example.capstone1.api.v1.chatnew.repo.ChatRepository;
import com.example.capstone1.api.v1.chatnew.repo.ChatRoomRepository;
import com.example.capstone1.api.v1.chatnew.service.ChatService;
import com.example.capstone1.api.v1.dto.Response;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

@RestController
@RequestMapping("/ChatRoom")
@Validated
@Slf4j
@AllArgsConstructor
public class ChatRoomController {

    // ChatRepository Bean 가져오기
    private final ChatService chatService;
    private final Response response;


    // 채팅 리스트 확인
    // "/" 로 요청이 들어오면 전체 채팅방 리스트를 담아서 return
    @GetMapping("/")
    public String ChatRoomList(){

        //model.addAttribute("list",chatService.findAllRoom());
        //log.info("Show All CharList : {}",chatService.findAllRoom());

        return "roomList";
    }

    // 채팅방 생성 (리스트로 리다이렉트)
    @PostMapping("/chat/createroom")
    public ResponseEntity createRoom(@Valid @RequestBody ChatRoomRequestDto.Post post){

        ChatRoomResponseDto.Response responses = chatService.createChatRoom(post);
        return response.success(responses, "채팅방 생성에 성공했습니다.");
    }

    // 채팅방 입장 화면
    // 파라미터로 넘어오는 roomId를 확인 후 해당 roomId 를 기준으로
    // 채팅방을 찾아서 클라이언트를 chatroom 으로 보낸다.
    @GetMapping("/chat/joinroom")
    public String joinRoom(String roomId,Model model){

        log.info("roomId : {}",roomId);
        model.addAttribute("room",chatService.findByRoomId(roomId));

        return "chatroom";
    }
}