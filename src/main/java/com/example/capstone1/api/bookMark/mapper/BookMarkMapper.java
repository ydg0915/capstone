package com.example.capstone1.api.bookMark.mapper;


import com.example.capstone1.api.bookMark.dto.BookMarkResponseDto;
import com.example.capstone1.api.bookMark.entity.BookMark;
import com.example.capstone1.api.entity.Posts;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface BookMarkMapper {

    BookMarkResponseDto.Response BookMarkToBookMarkResponseDto(Long id, Long PostId, String title);

    default List<BookMarkResponseDto.ListResponse> BookMarkToResponse(List<BookMark> bookMark, List<Posts> posts){
        List<BookMarkResponseDto.ListResponse> response = new ArrayList<>();
        for(int i=0;i<bookMark.size();i++){
            BookMarkResponseDto.ListResponse re = new BookMarkResponseDto.ListResponse();
            re.setId(bookMark.get(i).getId());
            re.setPostsId(posts.get(i).getId());
            re.setTitle(posts.get(i).getTitle());
            re.setName(bookMark.get(i).getUsers().getUsername());
            response.add(re);
        }
        return response;

    }




}
