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
/*
@RestController
@RequestMapping("/follow")
@Validated
@AllArgsConstructor
public class FollowController {

    private final FollowService followService;
    private final FollowMapper followMapper;

    // Create
    @PostMapping
    public ResponseEntity postFollow(@Valid @RequestBody FollowRequestDto.Post post) {
        Follow follow = followService.createFollow(followMapper.FollowRequestDtoPostToFollow(post), post.getCommentId());
        FollowResponseDto.Response response = followMapper.FollowToFollowResponseDto(follow);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Read
    @GetMapping("/{follow-id}")
    public ResponseEntity getFollow(@Positive @PathVariable("follow-id") int followId) {
        Follow follow=followService.findFollow(followId);
        FollowResponseDto.Response response = followMapper.FollowToFollowResponseDto((follow));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // Delete
    @DeleteMapping("/{follow-id}")
    public ResponseEntity deleteMember(@Positive @PathVariable("follow-id") int followId) {
        followService.deleteFollow(followId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


 */