package com.example.capstone1.api.bookMark.controller;


import com.example.capstone1.api.bookMark.dto.BookMarkResponseDto;
import com.example.capstone1.api.bookMark.entity.BookMark;
import com.example.capstone1.api.bookMark.mapper.bookMarkMapper;
import com.example.capstone1.api.bookMark.service.BookMarkService;
import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.service.PostsService;
import com.example.capstone1.api.v1.service.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bookMark")
@Validated
@AllArgsConstructor
public class bookMarkController {
    
    private final BookMarkService bookMarkService;
    private final bookMarkMapper bookMarkMapper;
    private final PostsService postsService;
    private final UsersService usersService;
    
    // Create
    @PostMapping
    public ResponseEntity postBookMark(@Positive @RequestParam Long postId){
        BookMark bookMark = bookMarkService.createBookMark(postId);
        String username = SecurityUtil.getCurrentUsername();
        Users users =  usersService.getUsers(username);
        String userLoginId = users.getUsername();
        BookMarkResponseDto.Response response= bookMarkMapper.BookMarkToBookMarkResponseDto(bookMark, postId, userLoginId);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    // Read
    @GetMapping
    public ResponseEntity getBookMark(){
        List<BookMark> bookMark = bookMarkService.findBookMark();
        List<Posts> posts = new ArrayList<>();

        //post 정보 하나씩 가져와서 리스트에 넣기
        for(int i=0;i<bookMark.size();i++){
            Posts posts1 = new Posts();
            long postId = bookMark.get(i).getPosts().getId();
            posts1 = postsService.findPost(postId);
            posts.add(posts1);
        }

        List<BookMarkResponseDto.ListResponse> response = bookMarkMapper.BookMarkToResponse(bookMark,posts);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }


    // Delete
    @DeleteMapping("/{bookMark-id}")
    public ResponseEntity deleteBookMark(@Positive @PathVariable("bookMark-id") int bookMarkId) {
        bookMarkService.deleteBookMark(bookMarkId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


