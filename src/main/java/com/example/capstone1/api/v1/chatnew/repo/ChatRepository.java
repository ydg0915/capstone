package com.example.capstone1.api.v1.chatnew.repo;

import com.example.capstone1.api.entity.Follow;
import com.example.capstone1.api.v1.chatnew.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Query("select b from Chat b where b.users.username = :username")
    List<Chat> findChatByUserName(@Param("username") String username);

    @Query("select b from Chat b where b.chatRoom.id = :roomId")
    Optional<List<Chat>> findChatByRoomId(@Param("roomId") long roomId);

    @Query("SELECT b FROM Chat b WHERE b.users.username = :username AND b.chatRoom.id = :roomId")
    List<Chat> findChatByUserNameAndRoomId(@Param("username") String username, @Param("roomId") long roomId);



}