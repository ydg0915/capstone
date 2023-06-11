package com.example.capstone1.api.v1.repository;

import com.example.capstone1.api.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Long> {
    List<Comments> findAllByPostId(Long postId);
}
