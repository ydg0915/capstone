package com.example.capstone1.api.v1.service;


import com.example.capstone1.api.v1.dto.response.BookMarkResponseDto;
import com.example.capstone1.api.entity.BookMark;
import com.example.capstone1.api.mapper.BookMarkMapper;
import com.example.capstone1.api.v1.repository.BookMarkRepository;
import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.exception.BusinessLogicException;
import com.example.capstone1.api.exception.ExceptionCode;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.repository.UsersRepository;
import com.example.capstone1.api.v1.service.PostsService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Log4j2
public class BookMarkService {

    private final BookMarkRepository bookMarkRepository;
    private final UsersRepository usersRepository;
    private final PostsService postsService;
    private final BookMarkMapper bookMarkMapper;
    //create
    public BookMarkResponseDto.Response createBookMark(Long postId){

        String username = SecurityUtil.getCurrentUsername();


        //유저 찾기
        Optional<Users> users = usersRepository.findByUsername(username);
        Users users1 = users.get();

        //중복확인
        List<BookMark> bookMarkList = bookMarkRepository.findBookMarkByUsersId(users1.getId());
        for (BookMark bookMark : bookMarkList) {
            if (bookMark.getPosts().getId().equals(postId)) {
                throw new BusinessLogicException(ExceptionCode.BOOKMARK_ALREADY_EXISTS);
            }
        }

        //포스트 찾기
        Posts posts = postsService.findPost(postId);



        //북마크 생성
        BookMark bookMark1=createB(users1, posts);

        long id = bookMark1.getId();
        long post=bookMark1.getPosts().getId();
        String title = bookMark1.getPosts().getTitle();

        BookMarkResponseDto.Response response= bookMarkMapper.BookMarkToBookMarkResponseDto(id, post, title);

        return response;

    }

    public BookMark createB(Users users, Posts posts){
        BookMark bookMark = new BookMark();
        bookMark.setUsers(users);
        bookMark.setPosts(posts);
        BookMark bo = bookMarkRepository.save(bookMark);
        return bo;

    }


    //read
    public List<BookMarkResponseDto.ListResponse> findBookMark(){ //사용자 북마크 리스트
        String username = SecurityUtil.getCurrentUsername();
        //유저 찾기
        Optional<Users> users = usersRepository.findByUsername(username);
        Users users1 = users.get();
        Long UserId = users1.getId();
        List<BookMark> bookMarkList = bookMarkRepository.findBookMarkByUsersId(UserId);
        List<Posts> posts=postsService.findListPost(bookMarkList);
        List<BookMarkResponseDto.ListResponse> response = bookMarkMapper.BookMarkToResponse(bookMarkList,posts);
        return response;

    }


    //Delete
    public void deleteBookMark(long bookMarkId){
        String username = SecurityUtil.getCurrentUsername();
        BookMark bookMark = verifiedBookMark(bookMarkId);
        bookMarkRepository.delete(bookMark);
    }


    // 멤버 검증
    public BookMark verifiedBookMark(long bookMarkId) {
        Optional<BookMark> bookMark = bookMarkRepository.findById(bookMarkId);
        return bookMark.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND));

    }


}