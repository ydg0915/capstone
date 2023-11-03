package com.example.capstone1.api.v1.service;



import com.example.capstone1.api.entity.Logo;
import com.example.capstone1.api.exception.BusinessLogicException;
import com.example.capstone1.api.exception.ExceptionCode;
import com.example.capstone1.api.mapper.BookMarkMapper;
import com.example.capstone1.api.mapper.LogoMapper;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.utils.S3Uploader;
import com.example.capstone1.api.v1.dto.response.BookMarkResponseDto;
import com.example.capstone1.api.v1.dto.response.LogoResponseDto;
import com.example.capstone1.api.v1.repository.BookMarkRepository;
import com.example.capstone1.api.v1.repository.LogoRepository;
import com.example.capstone1.api.v1.repository.UsersRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Log4j2
public class LogoService {

    private final LogoRepository logoRepository;
    private final S3Uploader s3Uploader;
    private final LogoMapper logoMapper;
    //create

    public LogoResponseDto.Response uploadLogoImage(List<MultipartFile> multipartFiles) {
        String username = SecurityUtil.getCurrentUsername();
        Logo logo = new Logo();
        Logo logo1 = logoRepository.save(logo);
        // 이미지 파일 이름만 추출
        List<String> saveImages = s3Uploader.autoImagesUploadAndDelete(logo1.getImages(), multipartFiles);
        log.info("여기이미지 확인!!!!!!"+ saveImages.get(0));
        log.info("여기이미지 확인!!!!!!"+ saveImages.get(1));
        logo1.setImages(saveImages);
        logoRepository.save(logo1);
        LogoResponseDto.Response response = logoMapper.LogoToLogoResponseDto(logo1);
        log.info("여기 이미지확인222@!!!!!"+response.getImages().get(0));
        log.info("여기 이미지확인222@!!!!"+ response.getImages().get(1));
        return response;
    }

    public Logo verifiedLogo(long logoId) {
        Optional<Logo> logo = logoRepository.findById(logoId);
        return logo.orElseThrow(() -> new BusinessLogicException(ExceptionCode.LOGO_NOT_FOUND));

    }


    public LogoResponseDto.Response GetImage(long logoId){
        String username = SecurityUtil.getCurrentUsername();
        Logo logo = verifiedLogo(logoId);
        log.info(logo.getImages().get(0));
        log.info(logo.getImages().get(1));
        LogoResponseDto.Response response = logoMapper.LogoToLogoResponseDto(logo);
        return response;
    }


}
