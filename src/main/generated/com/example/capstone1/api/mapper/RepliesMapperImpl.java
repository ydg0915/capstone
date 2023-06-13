package com.example.capstone1.api.mapper;

import com.example.capstone1.api.entity.Comments;
import com.example.capstone1.api.entity.Replies;
import com.example.capstone1.api.entity.Replies.RepliesBuilder;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.v1.dto.request.CommentRequestDto.CreateReply;
import com.example.capstone1.api.v1.dto.response.CommentResponseDto.ReplyInfo;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-13T18:59:26+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.19 (Azul Systems, Inc.)"
)
@Component
public class RepliesMapperImpl implements RepliesMapper {

    @Override
    public Replies toReply(CreateReply create, Users user, Comments comment) {
        if ( create == null && user == null && comment == null ) {
            return null;
        }

        RepliesBuilder replies = Replies.builder();

        if ( create != null ) {
            replies.content( create.getContent() );
        }
        if ( user != null ) {
            replies.user( user );
        }
        if ( comment != null ) {
            replies.comment( comment );
        }

        return replies.build();
    }

    @Override
    public ReplyInfo toReplyInfo(Replies reply) {
        if ( reply == null ) {
            return null;
        }

        ReplyInfo replyInfo = new ReplyInfo();

        replyInfo.setUserId( replyUserId( reply ) );
        replyInfo.setUsername( replyUserUsername( reply ) );
        replyInfo.setId( reply.getId() );
        replyInfo.setContent( reply.getContent() );

        return replyInfo;
    }

    private Long replyUserId(Replies replies) {
        if ( replies == null ) {
            return null;
        }
        Users user = replies.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String replyUserUsername(Replies replies) {
        if ( replies == null ) {
            return null;
        }
        Users user = replies.getUser();
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
