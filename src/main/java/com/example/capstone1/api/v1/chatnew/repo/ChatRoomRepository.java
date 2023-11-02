package com.example.capstone1.api.v1.chatnew.repo;

import com.example.capstone1.api.entity.BaseTime;

import com.example.capstone1.api.entity.BookMark;
import com.example.capstone1.api.entity.Follow;
import com.example.capstone1.api.v1.chatnew.entity.Chat;
import com.example.capstone1.api.v1.chatnew.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    @Query("select b from ChatRoom b where b.id=:roomId")
    ChatRoom findChatRoomByRoomId(@Param("roomId") long roomId);

    @Query("select b from ChatRoom b where b.users.username=:username")
    List<ChatRoom> findChatRoomByUsername(@Param("username") String username);



}
