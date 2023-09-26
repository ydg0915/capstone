package com.example.capstone1.api.v1.service;


import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.exception.BusinessLogicException;
import com.example.capstone1.api.exception.ExceptionCode;
import com.example.capstone1.api.v1.dto.response.FollowResponseDto;
import com.example.capstone1.api.entity.Follow;
import com.example.capstone1.api.mapper.FollowMapper;
import com.example.capstone1.api.v1.repository.FollowRepository;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FollowService {


    private final FollowRepository followRepository;
    private final FollowMapper followMapper;
    private final UsersRepository usersRepository;

    //Create
    public FollowResponseDto.Response createFollow(long userId) { //로그인 아이디, 팔로우 될 유저 아이디
        String username = SecurityUtil.getCurrentUsername(); //팔로우 하는 아이디
        Follow follow = new Follow();

        //팔로우 중복 확인
        List<Follow> followList = followRepository.findFollowByUsersId(username);
        for (Follow value : followList) {
            if (value.getUsers().getId().equals(userId)) {
                throw new BusinessLogicException(ExceptionCode.FOLLOW_ALREADY_EXISTS);
            }
        }

        //팔로우 생성
        Optional<Users> users1 = usersRepository.findById(userId); //팔로우 된 사람의 유저 정보 가져옴>
        Users users = users1.orElseThrow(() -> new NoSuchElementException("유저 정보를 찾을 수 없습니다."));
        follow.setUserid(username); //팔로우 하는 사람
        follow.setUsers(users);
        followRepository.save(follow);
        FollowResponseDto.Response response = followMapper.FollowToFollowResponseDto(follow);

        return response;
    }

    // Read
    public Follow findFollow(int followId) {
        Follow follow = verifiedFollow(followId);
        return follow;
    }

    public List<FollowResponseDto.ListResponse> findListFollow() {
        String username = SecurityUtil.getCurrentUsername();
        List<Follow> followList = followRepository.findFollowByUsersId(username);
        List<FollowResponseDto.ListResponse> responseList = followMapper.FollowToListFollowResponseDto(followList);
        return responseList;
    }

    // Delete
    public void deleteFollow(long followId) {
        String username = SecurityUtil.getCurrentUsername();
        Follow follow = verifiedFollow(followId);
        followRepository.delete(follow);
    }

    // 멤버 검증
    public Follow verifiedFollow(long followId) {

        Optional<Follow> follow = followRepository.findById(followId);
        return follow.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FOLLOW_NOT_FOUND));

    }

}

