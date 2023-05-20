package com.example.capstone1.api.v1.service;

import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.v1.dto.Response;
import com.example.capstone1.api.v1.dto.request.PostRequestDto;
import com.example.capstone1.api.v1.repository.PostsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class PostsService {
    private final PostsRepository postsRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private final Response response;


    public Posts getPostById(Long id) {
        Optional<Posts> post = postsRepository.findById(id);
        if (post.isEmpty()) {
            throw new RuntimeException("Post not found with ID: " + id);
        }
        return post.get();
    }

    public ResponseEntity<?> create(PostRequestDto.Create create, String username) {
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        Posts post = Posts.builder()
                .title(create.getTitle())
                .content(create.getContent())
                .user(user)
                .build();

        postsRepository.save(post);

        return response.success("게시글 작성에 성공했습니다.");
    }

    public ResponseEntity<?> update(PostRequestDto.Update update, Posts post) {

        post.setTitle(update.getTitle());
        post.setContent(update.getContent());

        postsRepository.save(post);

        return response.success("게시글 수정에 성공했습니다.");
    }

    public ResponseEntity<?> delete(Posts post) {

        postsRepository.delete(post);

        return response.success("게시글 삭제에 성공했습니다.");
    }
}
