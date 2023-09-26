package com.example.capstone1.api.v1.controller;


import com.example.capstone1.api.v1.dto.Response;
import com.example.capstone1.api.v1.dto.response.BookMarkResponseDto;
import com.example.capstone1.api.v1.service.BookMarkService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/bookmark")
@Validated
@AllArgsConstructor
public class bookMarkController {
    
    private final BookMarkService bookMarkService;
    private final Response response;
    
    // Create
    @PostMapping
    public ResponseEntity postBookMark(@Positive @RequestParam Long postId){
        BookMarkResponseDto.Response responses = bookMarkService.createBookMark(postId);
        return response.success(responses, "북마크 생성에 성공했습니다.");
    }


    // Read
    @GetMapping
    public ResponseEntity getBookMark(){
        //북마크, 포스트 동시에 리스트로 받아야 한다.
        List<BookMarkResponseDto.ListResponse> responses = bookMarkService.findBookMark();
        return response.success(responses, "북마크 조회에 성공했습니다.");
    }


    // Delete
    @DeleteMapping("/{bookmarkId}")
    public ResponseEntity deleteBookMark(@Positive @PathVariable("bookmarkId") long bookMarkId) {
        bookMarkService.deleteBookMark(bookMarkId);
        return response.success("북마크 삭제에 성공했습니다.");
    }
}


