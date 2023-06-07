package com.example.capstone1.api.mapper;

import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.v1.dto.request.PostRequestDto;
import com.example.capstone1.api.v1.dto.response.PostResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")

public interface PostsMapper {

    PostsMapper INSTANCE = Mappers.getMapper(PostsMapper.class);

    Posts toPost(PostRequestDto.Create create);

    PostResponseDto.PostInfo toPostInfo(Posts post);
}
