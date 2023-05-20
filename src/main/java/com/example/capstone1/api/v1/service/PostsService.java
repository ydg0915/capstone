package com.example.capstone1.api.v1.service;

import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.dto.Response;
import com.example.capstone1.api.v1.dto.request.PostRequestDto;
import com.example.capstone1.api.v1.dto.response.PostResponseDto;
import com.example.capstone1.api.v1.repository.PostsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class PostsService {
    private final PostsRepository postsRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private final Response response;


    public ResponseEntity<?> getAllPosts() {

        List<Posts> posts = postsRepository.findAll();
        if (posts.isEmpty())
            return response.success("아직 등록된 게시글이 없습니다.");
        else {
            List<PostResponseDto.PostInfo> postInfos = new ArrayList<>();
            for (Posts post : posts) {
                PostResponseDto.PostInfo postInfo = PostResponseDto.PostInfo.builder()
                        .id(post.getId())
                        .title(post.getTitle())
                        .content(post.getContent())
                        .username(post.getUser().getUsername())
                        .build();

                postInfos.add(postInfo);
            }

            return response.success(postInfos, "전체 게시글 조회에 성공했습니다.", HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getPostById(Long id) {

        Optional<Posts> optionalPost = postsRepository.findById(id);
        if (optionalPost.isEmpty()) {
            throw new RuntimeException("Post not found with ID: " + id);
        }

        Posts post = optionalPost.get();

        PostResponseDto.PostInfo postInfo = PostResponseDto.PostInfo.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .username(post.getUser().getUsername())
                .build();

        return response.success(postInfo, "게시글 조회에 성공했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> create(PostRequestDto.Create create) {

        String username = SecurityUtil.getCurrentUsername();

        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        Posts post = Posts.builder()
                .title(create.getTitle())
                .content(create.getContent())
                .user(user)
                .build();

        postsRepository.save(post);

        return response.success("게시글 작성에 성공했습니다.");
    }

    public ResponseEntity<?> update(PostRequestDto.Update update, Long id) {

        Optional<Posts> optionalPost = postsRepository.findById(id);
        if (optionalPost.isEmpty()) {
            throw new RuntimeException("Post not found with ID: " + id);
        }

        Posts post = optionalPost.get();

        String username = SecurityUtil.getCurrentUsername();
        if (!post.getUser().getUsername().equals(username)) {
            return response.fail("접근 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        post.setTitle(update.getTitle());
        post.setContent(update.getContent());

        postsRepository.save(post);

        return response.success("게시글 수정에 성공했습니다.");
    }

    public ResponseEntity<?> delete(Long id) {

        Optional<Posts> optionalPost = postsRepository.findById(id);
        if (optionalPost.isEmpty()) {
            throw new RuntimeException("Post not found with ID: " + id);
        }

        Posts post = optionalPost.get();

        String username = SecurityUtil.getCurrentUsername();
        if (!post.getUser().getUsername().equals(username)) {
            return response.fail("접근 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        postsRepository.delete(post);

        return response.success("게시글 삭제에 성공했습니다.");
    }
}
