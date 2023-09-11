package com.example.capstone1.api.follow.repository;


import com.example.capstone1.api.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("select b from Follow b where b.Userid=:UsersId")
    List<Follow> findFollowByUsersId(String UsersId); //유저 아이디로 팔로우 리스트 받기

    @Query("select b from Follow b where b.users.id=:usersId")
    Optional<Follow> findByUserid(long usersId);
}
