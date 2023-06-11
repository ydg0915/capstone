package com.example.capstone1.api.mapper;

import com.example.capstone1.api.entity.Comments;
import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.v1.dto.request.CommentRequestDto;
import com.example.capstone1.api.v1.dto.response.CommentResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentsMapper {

    CommentsMapper INSTANCE = Mappers.getMapper(CommentsMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "isDeleted", ignore = true)
    @Mapping(target = "post", source = "post")
    @Mapping(target = "content", source = "create.content")
    Comments toComment(CommentRequestDto.CreateComment create, Users user, Posts post);

    @Mapping(target = "userId", source = "comment.user.id")
    @Mapping(target = "username", source = "comment.user.username")
    CommentResponseDto.CommentInfo toCommentInfo(Comments comment, List<CommentResponseDto.ReplyInfo> replyInfos);
}
