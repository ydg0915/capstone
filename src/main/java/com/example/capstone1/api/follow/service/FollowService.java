/*package com.example.capstone1.api.follow.service;


import com.example.capstone1.api.exception.BusinessLogicException;
import com.example.capstone1.api.exception.ExceptionCode;
import com.example.capstone1.api.follow.entity.Follow;
import com.example.capstone1.api.follow.repository.FollowRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class FollowService {


    private final FollowRepository followRepository;
    private final FollowService followService;

    //Create
    public Follow createFollow(Follow follow, int followId) {
        Follow follow1 = followService.verifiedFollow(followId);


        return followRepository.save(follow);
    }

    // Read
    public Follow findFollow(int followId) {
        Follow follow = verifiedFollow(followId);
        return follow;
    }

    // Delete
    public void deleteFollow(int followId) {
        Follow pa = verifiedFollow(followId);
        followRepository.delete(pa);
    }

    // 멤버 검증
    public Follow verifiedFollow(int followId) {

        Optional<Follow> follow = followRepository.findById(followId);
        return follow.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FOLLOW_NOT_FOUND));

    }

}


 */