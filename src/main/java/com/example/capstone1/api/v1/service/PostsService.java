package com.example.capstone1.api.v1.service;

import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.exception.CustomException;
import com.example.capstone1.api.mapper.PostsMapper;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.dto.request.PostRequestDto;
import com.example.capstone1.api.v1.dto.response.PostResponseDto;
import com.example.capstone1.api.v1.repository.PostsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.example.capstone1.api.exception.ErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class PostsService {
    private final PostsRepository postsRepository;
    private final CustomUserDetailsService customUserDetailsService;


    public List<PostResponseDto.PostInfoForBlock> getAllPosts(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createDate")
        );

        Page<Posts> posts = postsRepository.findAll(pageRequest);
        if (posts.isEmpty())
            return Collections.emptyList();
        else {
            List<PostResponseDto.PostInfoForBlock> postInfos = new ArrayList<>();
            for (Posts post : posts) {
                post.calculateTotalCommentsAndReplies();
                PostResponseDto.PostInfoForBlock postInfo = PostsMapper.INSTANCE.toPostInfoForBlock(post);
                postInfos.add(postInfo);
            }
            return postInfos;
        }
    }

    public List<PostResponseDto.PostInfoForBlock> getAllRecruitingPosts(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createDate")
        );

        Page<Posts> posts = postsRepository.findAllByIsCompletedFalse(pageRequest);
        if (posts.isEmpty())
            return Collections.emptyList();
        else {
            List<PostResponseDto.PostInfoForBlock> postInfos = new ArrayList<>();
            for (Posts post : posts) {
                post.calculateTotalCommentsAndReplies();
                PostResponseDto.PostInfoForBlock postInfo = PostsMapper.INSTANCE.toPostInfoForBlock(post);
                postInfos.add(postInfo);
            }
            return postInfos;
        }
    }

    public PostResponseDto.PostInfo getPostById(Long postId) {
        Posts post = postsRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        PostResponseDto.PostInfo postInfo = PostsMapper.INSTANCE.toPostInfo(post);

        return postInfo;
    }

    public void create(PostRequestDto.Create create) {
        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        Posts post = PostsMapper.INSTANCE.toPost(create, user);

        postsRepository.save(post);
    }

    public void update(PostRequestDto.Create update, Long postId) {
        Posts post = postsRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        String username = SecurityUtil.getCurrentUsername();
        if (!post.getUser().getUsername().equals(username)) {
            throw new CustomException(MISMATCH_USER);
        }

        post.updateFields(update);

        postsRepository.save(post);
    }

    public void complete(Long postId) {
        Posts post = postsRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        String username = SecurityUtil.getCurrentUsername();
        if (!post.getUser().getUsername().equals(username)) {
            throw new CustomException(MISMATCH_USER);
        }

        post.setCompleted(true);

        postsRepository.save(post);
    }

    public void delete(Long postId) {
        Posts post = postsRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        String username = SecurityUtil.getCurrentUsername();
        if (!post.getUser().getUsername().equals(username)) {
            throw new CustomException(MISMATCH_USER);
        }

        postsRepository.delete(post);
    }

    public List<PostResponseDto.PostInfoForBlock> searchPosts(String query) {
        List<Posts> posts = postsRepository.findByTitleContainingOrContentContaining(query);
        if (posts.isEmpty()) {
            return Collections.emptyList();
        }
        else {
            List<PostResponseDto.PostInfoForBlock> postInfos = new ArrayList<>();
            for (Posts post : posts) {
                PostResponseDto.PostInfoForBlock postInfo = PostsMapper.INSTANCE.toPostInfoForBlock(post);
                postInfos.add(postInfo);
            }
            return postInfos;
        }
    }

    public void updateView(Long postId) {
        postsRepository.updateView(postId);
    }
}
