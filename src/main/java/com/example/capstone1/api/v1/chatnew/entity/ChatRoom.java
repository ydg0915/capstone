package com.example.capstone1.api.v1.chatnew.entity;

import com.example.capstone1.api.entity.BaseTime;
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
    private Long chatRoomId;

    @Column
    private String roomId;  // 채팅방 아이디

    @Column
    private String roomName;// 채팅방 이름

    @Column
    private long userCount; // 채팅방 인원수

    @Column
    private String nickname; //닉네임

    @OneToMany(mappedBy = "chatRoom", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<ChatMid> chatMids = new ArrayList<>();

}