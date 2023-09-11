package com.example.capstone1.api.follow.mapper;


import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.follow.dto.FollowRequestDto;
import com.example.capstone1.api.follow.dto.FollowResponseDto;
import com.example.capstone1.api.follow.entity.Follow;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface FollowMapper {

    FollowResponseDto.Response FollowToFollowResponseDto(Follow follow);


    Follow FollowRequestDtoPostToFollow(FollowRequestDto.Post post);



}
