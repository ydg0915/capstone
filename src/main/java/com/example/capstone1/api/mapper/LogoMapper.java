package com.example.capstone1.api.mapper;


import com.example.capstone1.api.entity.Logo;
import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.v1.dto.response.LogoResponseDto;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface LogoMapper {


    default LogoResponseDto.Response LogoToLogoResponseDto(Logo logo){
        LogoResponseDto.Response response = new LogoResponseDto.Response();
        List<String> img = new ArrayList<>();
        for(int i=0;i<logo.getImages().size();i++){
            img.add(logo.getImages().get(i));
        }
        response.setImages(img);
        response.setId(logo.getId());

        return response;
    }

    


}
