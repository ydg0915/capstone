package com.example.capstone1.api.v1.chatnew.entity;

import com.example.capstone1.api.entity.BaseTime;
import com.example.capstone1.api.entity.BookMark;
import com.example.capstone1.api.entity.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@Entity
public class ChatRoom extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String roomName;// 채팅방 이름

    @Column
    private long userCount; // 채팅방 인원수

    @Column
    private String username;//채팅을 신청한 사람의 이름

    @ManyToOne
    @JoinColumn(name = "USERS_ID")
    private Users users; //채팅방의 주인


    @OneToMany(mappedBy = "chatRoom", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Chat> chat = new ArrayList<>();



}