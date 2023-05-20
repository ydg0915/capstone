package com.example.capstone1.api.v1.controller;

import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.lib.Helper;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.dto.Response;
import com.example.capstone1.api.v1.dto.request.PostRequestDto;
import com.example.capstone1.api.v1.dto.request.UserRequestDto;
import com.example.capstone1.api.v1.dto.response.PostResponseDto;
import com.example.capstone1.api.v1.dto.response.UserResponseDto;
import com.example.capstone1.api.v1.service.PostsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/posts")
@RestController
public class PostsController {
    private final PostsService postsService;
    private final Response response;


    @PostMapping
    public ResponseEntity<?> create(@Validated PostRequestDto.Create create, @ApiIgnore Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }

        String username = SecurityUtil.getCurrentUsername();

        return postsService.create(create, username);
    }

    @GetMapping("/{id}")
    public PostResponseDto.PostInfo getPostById(@PathVariable Long id) {
        Posts post = postsService.getPostById(id);

        return PostResponseDto.PostInfo.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .username(post.getUser().getUsername())
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Validated @RequestBody PostRequestDto.Update update, @ApiIgnore Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }

        Posts post = postsService.getPostById(id);

        String username = SecurityUtil.getCurrentUsername();
        if (!post.getUser().getUsername().equals(username)) {
            return response.fail("접근 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        return postsService.update(update, post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {

        Posts post = postsService.getPostById(id);

        String username = SecurityUtil.getCurrentUsername();
        if (!post.getUser().getUsername().equals(username)) {
            return response.fail("접근 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        return postsService.delete(post);
    }
}
