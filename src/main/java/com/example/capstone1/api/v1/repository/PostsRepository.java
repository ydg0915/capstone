package com.example.capstone1.api.v1.repository;

import com.example.capstone1.api.entity.Posts;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface PostsRepository extends PagingAndSortingRepository<Posts, Long> {

    @Query("SELECT p FROM Posts p WHERE p.title LIKE %?1% OR p.content LIKE %?1%")
    List<Posts> findByTitleContainingOrContentContaining(String query);

    @Modifying
    @Query("update Posts p set p.view = p.view + 1 where p.id = :id")
    int updateView(Long id);
}
