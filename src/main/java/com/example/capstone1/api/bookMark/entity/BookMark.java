package com.example.capstone1.api.bookMark.entity;

import com.example.capstone1.api.entity.BaseTime;
import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class BookMark extends BaseTime { //좋아요
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; //좋아요식별아이디


    @ManyToOne
    @JoinColumn(name = "USERS_ID")
    private Users users;


    @ManyToOne
    @JoinColumn(name = "POSTS_ID")
    private Posts posts;


}
