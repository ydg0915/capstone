package com.example.capstone1.api.v1.controller;

import com.example.capstone1.api.v1.dto.Response;
import com.example.capstone1.api.v1.dto.request.CommentRequestDto;
import com.example.capstone1.api.v1.dto.response.CommentResponseDto;
import com.example.capstone1.api.v1.service.CommentsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/posts/{postId}/comments")
@RestController
public class CommentsController {

    private final CommentsService commentsService;
    private final Response response;

    @GetMapping
    public ResponseEntity<?> getAllCommentsAndRepliesByPostId(@PathVariable Long postId) {
        List<CommentResponseDto.CommentInfo> commentInfos = commentsService.getAllCommentsAndRepliesByPostId(postId);
        return response.success(commentInfos, "댓글 목록 조회에 성공했습니다.");
    }

    @PostMapping
    public ResponseEntity<?> createComment(@PathVariable Long postId,
                                           @Valid CommentRequestDto.CreateComment create) {
        commentsService.createComment(postId, create);
        return response.success("댓글 작성에 성공했습니다.");
    }

    @PatchMapping("/{commentId}")
    ResponseEntity<?> updateComment(@PathVariable Long postId,
                                    @PathVariable Long commentId,
                                    @Valid CommentRequestDto.CreateComment update) {
        commentsService.updateComment(postId, commentId, update);
        return response.success("댓글 수정에 성공했습니다.");
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long postId,
                                           @PathVariable Long commentId) {
        commentsService.deleteComment(postId, commentId);
        return response.success("댓글 삭제에 성공했습니다.");
    }

    @PostMapping("/{commentId}/replies")
    public ResponseEntity<?> createReply(@PathVariable Long postId,
                                         @PathVariable Long commentId,
                                         @Valid CommentRequestDto.CreateReply create) {
        commentsService.createReply(postId, commentId, create);
        return response.success("대댓글 작성에 성공했습니다.");
    }

    @PatchMapping("/replies/{replyId}")
    ResponseEntity<?> updateReply(@PathVariable Long postId,
                                    @PathVariable Long replyId,
                                    @Valid CommentRequestDto.CreateReply update) {
        commentsService.updateReply(postId, replyId, update);
        return response.success("대댓글 수정에 성공했습니다.");
    }

    @DeleteMapping("/replies/{replyId}")
    public ResponseEntity<?> deleteReply(@PathVariable Long postId,
                                         @PathVariable Long replyId) {
        commentsService.deleteReply(postId, replyId);
        return response.success("대댓글 삭제에 성공했습니다.");
    }

}
