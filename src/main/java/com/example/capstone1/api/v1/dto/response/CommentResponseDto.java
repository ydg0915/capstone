package com.example.capstone1.api.v1.dto.response;

import com.example.capstone1.api.entity.Replies;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class CommentResponseDto {

    @Getter
    @Setter
    public static class CommentInfo {
        private Long id;
        private Long userId;
        private String username;
        private String content;
        private List<ReplyInfo> replyInfos;
    }

    @Getter
    @Setter
    public static class ReplyInfo {
        private Long id;
        private Long userId;
        private String username;
        private String content;
    }
}
