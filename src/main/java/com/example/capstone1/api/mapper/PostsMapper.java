package com.example.capstone1.api.mapper;

import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.v1.dto.request.PostRequestDto;
import com.example.capstone1.api.v1.dto.response.PostResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")

public interface PostsMapper {

    PostsMapper INSTANCE = Mappers.getMapper(PostsMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "comments", expression = "java(new ArrayList<>())")
    Posts toPost(PostRequestDto.Create create, Users user);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "username", source = "user.username")
    PostResponseDto.PostInfo toPostInfo(Posts post);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "username", source = "user.username")
    PostResponseDto.PostInfoForBlock toPostInfoForBlock(Posts post);
}
