package com.example.capstone1.api.v1.controller;

import com.example.capstone1.api.v1.dto.Response;
import com.example.capstone1.api.v1.dto.request.UserRequestDto;
import com.example.capstone1.api.v1.dto.response.UserResponseDto;
import com.example.capstone1.api.v1.service.UsersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@RestController
public class UsersController {

    private final UsersService usersService;
    private final Response response;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@Valid UserRequestDto.SignUp signUp) {
        usersService.signUp(signUp);
        return response.success("회원가입에 성공했습니다.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid UserRequestDto.Login login) {
        UserResponseDto.TokenInfo tokenInfo = usersService.login(login);
        return response.success(tokenInfo, "로그인에 성공했습니다.");
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@Valid UserRequestDto.Reissue reissue) {
        UserResponseDto.TokenInfo tokenInfo = usersService.reissue(reissue);
        return response.success(tokenInfo, "Token 정보가 갱신되었습니다.");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@Valid UserRequestDto.Logout logout) {
        usersService.logout(logout);
        return response.success("로그아웃 되었습니다.");
    }

    @PatchMapping("/me")
    public ResponseEntity<?> updateMyUserInfo(@Valid @RequestBody UserRequestDto.Update update) {
        usersService.updateMyUserInfo(update);
        return response.success("회원 정보가 변경되었습니다.");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserInfoById(@PathVariable String userId) {
        UserResponseDto.UserInfo userInfo = usersService.getUserInfoById(userId);
        return response.success(userInfo, "회원 프로필 조회에 성공했습니다.");
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(String query) {
        List<UserResponseDto.UserInfoForSearching> userInfos = usersService.search(query);
        return response.success(userInfos, "회원 목록 조회에 성공했습니다.");
    }

    @GetMapping("/authority")
    public ResponseEntity<?> authority() {
        log.info("ADD ROLE_ADMIN");
        usersService.authority();
        return response.success();
    }

    @GetMapping("/userTest")
    public ResponseEntity<?> userTest() {
        log.info("ROLE_USER");
        return response.success();
    }

    @GetMapping("/adminTest")
    public ResponseEntity<?> adminTest() {
        log.info("ROLE_ADMIN TEST");
        return response.success();
    }

}
