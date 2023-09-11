package com.example.capstone1.api.follow.controller;


import com.example.capstone1.api.follow.dto.FollowRequestDto;
import com.example.capstone1.api.follow.dto.FollowResponseDto;
import com.example.capstone1.api.follow.entity.Follow;
import com.example.capstone1.api.follow.mapper.FollowMapper;
import com.example.capstone1.api.follow.service.FollowService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/follow")
@Validated
@AllArgsConstructor
public class FollowController {

    private final FollowService followService;
    private final FollowMapper followMapper;

    // Create
    @PostMapping
    public ResponseEntity postFollow(@Positive @RequestParam long UserId) { //팔로우 할 유저 로그인 아이디를 입력으로 받는다.
        FollowResponseDto.Response response = followService.createFollow(UserId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Read
    @GetMapping()
    public ResponseEntity getFollow() {
        List<FollowResponseDto.ListResponse> response=followService.findListFollow();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // Delete
    @DeleteMapping("/{followId}")
    public ResponseEntity deleteMember(@Positive @PathVariable("followId") int followId) {
        followService.deleteFollow(followId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


