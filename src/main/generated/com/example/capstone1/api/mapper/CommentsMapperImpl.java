package com.example.capstone1.api.mapper;

import com.example.capstone1.api.entity.Comments;
import com.example.capstone1.api.entity.Comments.CommentsBuilder;
import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.v1.dto.request.CommentRequestDto.CreateComment;
import com.example.capstone1.api.v1.dto.response.CommentResponseDto.CommentInfo;
import com.example.capstone1.api.v1.dto.response.CommentResponseDto.ReplyInfo;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-25T22:13:15+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.14.1 (Azul Systems, Inc.)"
)
@Component
public class CommentsMapperImpl implements CommentsMapper {

    @Override
    public Comments toComment(CreateComment create, Users user, Posts post) {
        if ( create == null && user == null && post == null ) {
            return null;
        }

        CommentsBuilder comments = Comments.builder();

        if ( create != null ) {
            comments.content( create.getContent() );
        }
        if ( post != null ) {
            comments.post( post );
            comments.user( post.getUser() );
        }
        comments.replies( new ArrayList<>() );

        return comments.build();
    }

    @Override
    public CommentInfo toCommentInfo(Comments comment, List<ReplyInfo> replyInfos) {
        if ( comment == null && replyInfos == null ) {
            return null;
        }

        CommentInfo commentInfo = new CommentInfo();

        if ( comment != null ) {
            commentInfo.setUserId( commentUserId( comment ) );
            commentInfo.setUsername( commentUserUsername( comment ) );
            commentInfo.setId( comment.getId() );
            commentInfo.setContent( comment.getContent() );
        }
        if ( replyInfos != null ) {
            List<ReplyInfo> list = replyInfos;
            if ( list != null ) {
                commentInfo.setReplyInfos( new ArrayList<ReplyInfo>( list ) );
            }
        }

        return commentInfo;
    }

    private Long commentUserId(Comments comments) {
        if ( comments == null ) {
            return null;
        }
        Users user = comments.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String commentUserUsername(Comments comments) {
        if ( comments == null ) {
            return null;
        }
        Users user = comments.getUser();
        if ( user == null ) {
            return null;
        }
        String username = user.getUsername();
        if ( username == null ) {
            return null;
        }
        return username;
    }
}
