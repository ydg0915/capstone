package com.example.capstone1.api.v1.controller;


import com.example.capstone1.api.v1.dto.Response;
import com.example.capstone1.api.v1.dto.request.LogoRequestDto;

import com.example.capstone1.api.v1.dto.response.BookMarkResponseDto;
import com.example.capstone1.api.v1.dto.response.LogoResponseDto;
import com.example.capstone1.api.v1.service.LogoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/Logo")
@Validated
@AllArgsConstructor
public class LogoController {
    private final LogoService logoService;
    private final Response response;




    @PatchMapping(value = "/upload-images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity patchLogoImage(LogoRequestDto.PatchImage patchImage) {
        LogoResponseDto.Response response1= logoService.uploadLogoImage(patchImage.getImages());
        return response.success(response1, "로고 이미지 생성에 성공했습니다.");
    }

    @GetMapping
    public ResponseEntity GetLogoImage(@Positive @RequestParam Long logoId){
        LogoResponseDto.Response response1= logoService.GetImage(logoId);
        return response.success(response1, "로고 이미지 조회에 성공했습니다.");
    }


}


