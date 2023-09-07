package com.example.capstone1.api.bookMark.service;


import com.example.capstone1.api.bookMark.entity.BookMark;
import com.example.capstone1.api.bookMark.repository.BookMarkRepository;
import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.exception.BusinessLogicException;
import com.example.capstone1.api.exception.CustomException;
import com.example.capstone1.api.exception.ExceptionCode;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.repository.UsersRepository;
import com.example.capstone1.api.v1.service.PostsService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BookMarkService {

    private final BookMarkRepository bookMarkRepository;
    private final UsersRepository usersRepository;
    private final PostsService postsService;
    //create
    public BookMark createBookMark(Long postId){

        String username = SecurityUtil.getCurrentUsername();
        //유저 찾기
        Optional<Users> users = usersRepository.findByUsername(username);
        Users users1 = users.get();
        //포스트 찾기
        Posts posts = postsService.findPost(postId);
        BookMark bookMark = new BookMark();
        bookMark.setUsers(users1);
        bookMark.setPosts(posts);

        return bookMarkRepository.save(bookMark);

    }


    //read
    public List<BookMark> findBookMark(){ //사용자 북마크 리스트
        String username = SecurityUtil.getCurrentUsername();
        //유저 찾기
        Optional<Users> users = usersRepository.findByUsername(username);
        Users users1 = users.get();
        Long UserId = users1.getId();
        List<BookMark> bookMarkList = bookMarkRepository.findBookMarkByUsersId(UserId);
        return bookMarkList;

    }


    //Delete
    public void deleteBookMark(int bookMarkId){
        BookMark bookMark = verifiedBookMark(bookMarkId);
        bookMarkRepository.delete(bookMark);
    }


    // 멤버 검증
    public BookMark verifiedBookMark(int bookMarkId) {

        Optional<BookMark> bookMark = bookMarkRepository.findById(bookMarkId);
        return bookMark.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND));

    }


}
