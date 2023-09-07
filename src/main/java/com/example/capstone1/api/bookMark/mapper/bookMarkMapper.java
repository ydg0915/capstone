package com.example.capstone1.api.bookMark.mapper;


import com.example.capstone1.api.bookMark.dto.BookMarkResponseDto;
import com.example.capstone1.api.bookMark.entity.BookMark;
import com.example.capstone1.api.entity.Posts;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface bookMarkMapper {

    BookMarkResponseDto.Response BookMarkToBookMarkResponseDto(BookMark bookMark, Long PostId, String UserLoginId);

    default List<BookMarkResponseDto.ListResponse> BookMarkToResponse(List<BookMark> bookMark, List<Posts> posts){
        List<BookMarkResponseDto.ListResponse> response = new ArrayList<>();
        for(int i=0;i< response.size();i++){
            BookMarkResponseDto.ListResponse re = new BookMarkResponseDto.ListResponse();
            re.setPostsId(posts.get(i).getId());
            re.setTitle(posts.get(i).getTitle());
            response.add(re);
        }
        return response;

    }




}
