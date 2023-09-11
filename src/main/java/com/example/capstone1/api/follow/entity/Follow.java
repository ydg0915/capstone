package com.example.capstone1.api.follow.entity;

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
public class Follow extends BaseTime { //좋아요
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; //팔로우 식별 아이디

    @Column
    private String Userid; //팔로우 하는 사람

    @ManyToOne
    @JoinColumn(name = "USERS_ID")
    private Users users; //팔로우 된 사람



}