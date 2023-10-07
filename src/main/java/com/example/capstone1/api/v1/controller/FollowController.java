package com.example.capstone1.api.v1.controller;


import com.example.capstone1.api.v1.dto.Response;
import com.example.capstone1.api.v1.dto.response.FollowResponseDto;
import com.example.capstone1.api.mapper.FollowMapper;
import com.example.capstone1.api.v1.service.FollowService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/follow")
@Validated
@AllArgsConstructor
public class FollowController {

    private final FollowService followService;
    private final Response response;

    // Create
    @PostMapping
    public ResponseEntity postFollow(@Positive @RequestParam long UserId) { //팔로우 할 유저 로그인 아이디를 입력으로 받는다.
        FollowResponseDto.Response responses = followService.createFollow(UserId);
        return response.success(responses, "팔로우 생성에 성공했습니다.");
    }

    // Read
    @GetMapping()
    public ResponseEntity getFollow() {
        List<FollowResponseDto.ListResponse> responses=followService.findListFollow();
        return response.success(responses, "팔로우 목록 조회에 성공했습니다.");
    }


    // Delete
    @DeleteMapping("/{followId}")
    public ResponseEntity deleteMember(@Positive @PathVariable("followId") int followId) {
        followService.deleteFollow(followId);
        return response.success("팔로우 삭제에 성공했습니다.");
    }
}


