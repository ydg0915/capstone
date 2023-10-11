package com.example.capstone1.api.v1.chatnew.repo;

import com.example.capstone1.api.entity.Follow;
import com.example.capstone1.api.v1.chatnew.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Query("select b from Chat b where b.users.username=:username")
    List<Chat> findChatByUserName(String username);

    @Query("select b from Chat b where b.chatRoom.id=:roomId")
    Optional<List<Chat>> findChatByRoomId(long roomId);

    @Query("SELECT b FROM Chat b WHERE b.users.username=:username AND b.chatRoom.id=:roomId")
    List<Chat> findChatByUserNameAndRoomId(String username,long roomId);



}