package com.example.capstone1.api.v1.service;

import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.enums.Authority;
import com.example.capstone1.api.jwt.JwtTokenProvider;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.dto.Response;
import com.example.capstone1.api.v1.dto.request.UserRequestDto;
import com.example.capstone1.api.v1.dto.response.UserResponseDto;
import com.example.capstone1.api.v1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class UsersService {

    private final CustomUserDetailsService customUserDetailsService;
    private final UsersRepository usersRepository;
    private final Response response;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RedisTemplate redisTemplate;

    public ResponseEntity<?> signUp(UserRequestDto.SignUp signUp) {
        if (usersRepository.existsByUsername(signUp.getUsername())) {
            return response.fail("이미 회원가입된 아이디입니다.", HttpStatus.BAD_REQUEST);
        }

        if (usersRepository.existsByEmail(signUp.getEmail())) {
            return response.fail("이미 회원가입된 이메일입니다.", HttpStatus.BAD_REQUEST);
        }

        Users user = Users.builder()
                .username(signUp.getUsername())
                .email(signUp.getEmail())
                .password(passwordEncoder.encode(signUp.getPassword()))
                .introduction("")
                .roles(Collections.singletonList(Authority.ROLE_USER.name()))
                .build();
        usersRepository.save(user);

        return response.success("회원가입에 성공했습니다.");
    }

    public ResponseEntity<?> login(UserRequestDto.Login login) {

        if (usersRepository.findByUsername(login.getUsername()).orElse(null) == null) {
            return response.fail("해당하는 유저가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        UsernamePasswordAuthenticationToken authenticationToken = login.toAuthentication();

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        UserResponseDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        redisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return response.success(tokenInfo, "로그인에 성공했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> reissue(UserRequestDto.Reissue reissue) {
        if (!jwtTokenProvider.validateToken(reissue.getRefreshToken())) {
            return response.fail("Refresh Token 정보가 유효하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(reissue.getAccessToken());

        String refreshToken = (String)redisTemplate.opsForValue().get("RT:" + authentication.getName());

        if(ObjectUtils.isEmpty(refreshToken)) {
            return response.fail("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
        }
        if(!refreshToken.equals(reissue.getRefreshToken())) {
            return response.fail("Refresh Token 정보가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        UserResponseDto.TokenInfo tokenInfo = jwtTokenProvider.generateAccessToken(authentication, reissue.getRefreshToken());

        redisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return response.success(tokenInfo, "Token 정보가 갱신되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> logout(UserRequestDto.Logout logout) {
        if (!jwtTokenProvider.validateToken(logout.getAccessToken())) {
            return response.fail("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(logout.getAccessToken());

        if (redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
            redisTemplate.delete("RT:" + authentication.getName());
        }

        Long expiration = jwtTokenProvider.getExpiration(logout.getAccessToken());
        redisTemplate.opsForValue()
                .set(logout.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);

        return response.success("로그아웃 되었습니다.");
    }

    public ResponseEntity<?> authority() {
        String username = SecurityUtil.getCurrentUsername();

        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        user.getRoles().add(Authority.ROLE_ADMIN.name());
        usersRepository.save(user);

        return response.success();
    }

    public ResponseEntity<?> updateUser(String username, UserRequestDto.Update update) {
        String currentUser = SecurityUtil.getCurrentUsername();
        if (!currentUser.equals(username)) {
            return response.fail("접근 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        if (update.getOldPassword() != null) {
            if (update.getNewPassword() == null)
                return response.fail("새로운 패스워드를 입력해주세요.", HttpStatus.BAD_REQUEST);

            if (!passwordEncoder.matches(update.getOldPassword(), user.getPassword())) {
                return response.fail("기존 패스워드가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
            }

            String newPassword = update.getNewPassword();
            user.setPassword(passwordEncoder.encode(newPassword));
        }
        if (update.getNewPassword() != null && update.getOldPassword() == null)
                return response.fail("기존 패스워드를 입력해주세요.", HttpStatus.BAD_REQUEST);

        if (update.getIntroduction() != null)
                user.setIntroduction(update.getIntroduction());

        usersRepository.save(user);

        return response.success("회원 정보가 변경되었습니다.");
    }

    public ResponseEntity<?> profile(String username) {
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        UserResponseDto.UserInfo userInfo = UserResponseDto.UserInfo.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .introduction(user.getIntroduction())
                .build();

        return response.success(userInfo, "회원 프로필 조회에 성공했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> search(String query) {
        List<Users> users = usersRepository.findByUsernameContaining(query);
        if (users.isEmpty())
            return response.success("'" + query + "'에 대한 검색결과가 없습니다.");
        else {
            List<UserResponseDto.UserInfo> userInfos = new ArrayList<>();
            for (Users user : users) {
                UserResponseDto.UserInfo userInfo = UserResponseDto.UserInfo.builder()
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .build();

                userInfos.add(userInfo);
            }
            return response.success(userInfos, "유저 조회에 성공했습니다.", HttpStatus.OK);
        }
    }
}
