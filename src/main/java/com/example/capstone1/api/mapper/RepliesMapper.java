package com.example.capstone1.api.mapper;

import com.example.capstone1.api.entity.Comments;
import com.example.capstone1.api.entity.Replies;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.v1.dto.request.CommentRequestDto;
import com.example.capstone1.api.v1.dto.response.CommentResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RepliesMapper {

    RepliesMapper INSTANCE = Mappers.getMapper(RepliesMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "comment", source = "comment")
    @Mapping(target = "content", source = "create.content")
    Replies toReply(CommentRequestDto.CreateReply create, Users user, Comments comment);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "username", source = "user.username")
    CommentResponseDto.ReplyInfo toReplyInfo(Replies reply);
}
