package com.example.capstone1.api.v1.repository;

import com.example.capstone1.api.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostsRepository extends JpaRepository<Posts, Long> {
}
