package com.example.capstone1.api.v1.repository;

import com.example.capstone1.api.entity.Replies;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepliesRepository extends JpaRepository<Replies, Long> {
    List<Replies> findAllByCommentId(Long commentId);
    boolean existsByCommentId(Long commentId);
}
