package com.example.capstone1.api.v1.service;

import com.example.capstone1.api.entity.Comments;
import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Replies;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.exception.CustomException;
import com.example.capstone1.api.mapper.CommentsMapper;
import com.example.capstone1.api.mapper.RepliesMapper;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.dto.request.CommentRequestDto;
import com.example.capstone1.api.v1.dto.response.CommentResponseDto;
import com.example.capstone1.api.v1.repository.CommentsRepository;
import com.example.capstone1.api.v1.repository.PostsRepository;
import com.example.capstone1.api.v1.repository.RepliesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.example.capstone1.api.exception.ErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class CommentsService {

    private final CustomUserDetailsService customUserDetailsService;
    private final PostsRepository postsRepository;
    private final CommentsRepository commentsRepository;
    private final RepliesRepository repliesRepository;

    public List<CommentResponseDto.CommentInfo> getAllCommentsAndRepliesByPostId(@PathVariable Long postId) {
        if (!postsRepository.existsById(postId)) {
            throw new CustomException(POST_NOT_FOUND);
        }

        List<Comments> comments = commentsRepository.findAllByPostId(postId);
        if (comments.isEmpty()) {
            return Collections.emptyList();
        } else {
            List<CommentResponseDto.CommentInfo> commentInfos = new ArrayList<>();
            for (Comments comment : comments) {
                List<CommentResponseDto.ReplyInfo> replyInfos = new ArrayList<>();

                List<Replies> replies = repliesRepository.findAllByCommentId(comment.getId());
                if (replies.isEmpty()) {
                    replyInfos = Collections.emptyList();
                } else {
                    for (Replies reply : replies) {
                        CommentResponseDto.ReplyInfo replyInfo = RepliesMapper.INSTANCE.toReplyInfo(reply);
                        replyInfos.add(replyInfo);
                    }
                }

                CommentResponseDto.CommentInfo commentInfo = new CommentResponseDto.CommentInfo();
                if (comment.isDeleted()) {
                    commentInfo.setContent("[삭제된 댓글입니다.]");
                    commentInfo.setReplyInfos(replyInfos);
                } else {
                    commentInfo = CommentsMapper.INSTANCE.toCommentInfo(comment, replyInfos);
                }

                commentInfos.add(commentInfo);
            }
            return commentInfos;
        }
    }

    public void createComment(Long postId, CommentRequestDto.CreateComment create) {
        Optional<Posts> optionalPost = postsRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new CustomException(POST_NOT_FOUND);
        }

        Posts post = optionalPost.get();

        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        Comments comment = CommentsMapper.INSTANCE.toComment(create, user, post);

        commentsRepository.save(comment);
    }

    public void deleteComment(Long postId, Long commentId) {
        if (!postsRepository.existsById(postId)) {
            throw new CustomException(POST_NOT_FOUND);
        }

        Optional<Comments> optionalComment = commentsRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            throw new CustomException(COMMENT_NOT_FOUND);
        }

        Comments comment = optionalComment.get();

        String username = SecurityUtil.getCurrentUsername();
        if (!comment.getUser().getUsername().equals(username)) {
            throw new CustomException(MISMATCH_USER);
        }

        if (repliesRepository.existsByCommentId(commentId)) {
            comment.setDeleted(true);
            commentsRepository.save(comment);
        } else {
            commentsRepository.delete(comment);
        }
    }

    public void createReply(Long postId, Long commentId, CommentRequestDto.CreateReply create) {
        if (!postsRepository.existsById(postId)) {
            throw new CustomException(POST_NOT_FOUND);
        }

        Optional<Comments> optionalComment = commentsRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            throw new CustomException(COMMENT_NOT_FOUND);
        }

        Comments comment = optionalComment.get();

        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        Replies reply = RepliesMapper.INSTANCE.toReply(create, user, comment);

        repliesRepository.save(reply);
    }

    public void deleteReply(Long postId, Long replyId) {
        if (!postsRepository.existsById(postId)) {
            throw new CustomException(POST_NOT_FOUND);
        }

        Optional<Replies> optionalReply = repliesRepository.findById(replyId);
        if (optionalReply.isEmpty()) {
            throw new CustomException(REPLY_NOT_FOUND);
        }

        Replies reply = optionalReply.get();

        String username = SecurityUtil.getCurrentUsername();
        if (!reply.getUser().getUsername().equals(username)) {
            throw new CustomException(MISMATCH_USER);
        }

        repliesRepository.delete(reply);

        Comments comment = reply.getComment();
        if (comment.isDeleted()) {
            commentsRepository.delete(comment);
        }
    }

}
