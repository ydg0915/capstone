package com.example.capstone1.api.v1.controller;

import com.example.capstone1.api.lib.Helper;
import com.example.capstone1.api.v1.dto.Response;
import com.example.capstone1.api.v1.dto.request.PostRequestDto;
import com.example.capstone1.api.v1.service.PostsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @GetMapping
    public ResponseEntity<?> getAllPosts() {
        return postsService.getAllPosts();
    }

    @PostMapping
    public ResponseEntity<?> create(@Validated @RequestBody PostRequestDto.Create create, @ApiIgnore Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }

        return postsService.create(create);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        return postsService.getPostById(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Validated @RequestBody PostRequestDto.Update update, @ApiIgnore Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }

        return postsService.update(update, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return postsService.delete(id);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(String query) {
        return postsService.search(query);
    }
}
