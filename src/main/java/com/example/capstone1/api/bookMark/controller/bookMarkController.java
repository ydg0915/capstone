package com.example.capstone1.api.bookMark.controller;


import com.example.capstone1.api.bookMark.dto.BookMarkResponseDto;
import com.example.capstone1.api.bookMark.service.BookMarkService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bookmark")
@Validated
@AllArgsConstructor
public class bookMarkController {
    
    private final BookMarkService bookMarkService;
    
    // Create
    @PostMapping
    public ResponseEntity postBookMark(@Positive @RequestParam Long postId){
        BookMarkResponseDto.Response response = bookMarkService.createBookMark(postId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    // Read
    @GetMapping
    public ResponseEntity getBookMark(){
        //북마크, 포스트 동시에 리스트로 받아야 한다.
        List<BookMarkResponseDto.ListResponse> response = bookMarkService.findBookMark();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }


    // Delete
    @DeleteMapping("/{bookmarkId}")
    public ResponseEntity deleteBookMark(@Positive @PathVariable("bookmarkId") long bookMarkId) {
        bookMarkService.deleteBookMark(bookMarkId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


