package com.example.capstone1.api.v1.chatnew.controller;

import com.example.capstone1.api.v1.chatnew.dto.ChatResponseDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomRequestDto;
import com.example.capstone1.api.v1.chatnew.dto.ChatRoomResponseDto;
import com.example.capstone1.api.v1.chatnew.entity.ChatRoom;
import com.example.capstone1.api.v1.chatnew.service.ChatRoomService;
import com.example.capstone1.api.v1.chatnew.service.ChatService;
import com.example.capstone1.api.v1.dto.Response;
import com.example.capstone1.api.v1.dto.response.UserResponseDto;
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
import java.util.List;

@RestController
@RequestMapping("/chatroom")
@Validated
@Slf4j
@AllArgsConstructor
public class ChatRoomController {

    // ChatRepository Bean 가져오기
    private final ChatService chatService;
    private final Response response;
    private final ChatRoomService chatRoomService;


    // 채팅 리스트 확인
    // "/" 로 요청이 들어오면 전체 채팅방 리스트를 담아서 return
    @GetMapping("/chatRoomList")
    public ResponseEntity ChatRoomList(){
        List<ChatRoomResponseDto.ListResponse> responses = chatRoomService.findAllRoom();
        return response.success(responses, "유저 채팅방 리스트 조회에 성공했습니다.");

    }

    // 채팅방 생성 (리스트로 리다이렉트)
    @PostMapping("/CreateRoom")
    public ResponseEntity createRoom(@RequestBody ChatRoomRequestDto.Post post){
        ChatRoomResponseDto.Response responses = chatRoomService.createChatRoom(post);
        return response.success(responses, "채팅방 생성에 성공했습니다.");
    }

    //채팅방에 속한 유저  조회
    @GetMapping("/joinUser")
    public ResponseEntity joinRoom(@RequestParam long roomId){
        List<UserResponseDto.UserInfo> responses = chatService.getUserList(roomId);
        return response.success(responses, "채팅방에 속한 유저 조회에 성공했습니다..");
    }

    @GetMapping("/exitUser")
    public ResponseEntity Exituser(@RequestParam long roomId,String username){

        List<ChatResponseDto.ListResponse> responses = chatRoomService.exitChat(roomId,username);
        return response.success(responses, "채팅방에 속한 유저 삭제에 성공했습니다..");
    }
}