package com.example.capstone1.api.mapper;


import com.example.capstone1.api.v1.dto.response.FollowResponseDto;
import com.example.capstone1.api.entity.Follow;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface FollowMapper {

    default FollowResponseDto.Response FollowToFollowResponseDto(Follow follow){
        long id = follow.getId();
        String userid = follow.getUserid();
        String username = follow.getUsers().getUsername();

        FollowResponseDto.Response re = new FollowResponseDto.Response(id,userid,username);
    return re;
    };

    default List<FollowResponseDto.ListResponse> FollowToListFollowResponseDto(List<Follow> follows){
        List<FollowResponseDto.ListResponse> re = new ArrayList<>();
        for(int i=0;i<follows.size();i++){
            FollowResponseDto.ListResponse re1= new FollowResponseDto.ListResponse();
            long id = follows.get(i).getId();
            String userid = follows.get(i).getUserid();
            String username = follows.get(i).getUsers().getUsername();

            re1.setId(id);
            re1.setUserid(userid);
            re1.setUsername(username);
            re.add(re1);
        }

        return re;
    };

}
