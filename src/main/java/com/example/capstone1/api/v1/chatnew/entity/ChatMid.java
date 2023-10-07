package com.example.capstone1.api.v1.chatnew.entity;

import com.example.capstone1.api.entity.BaseTime;
import com.example.capstone1.api.entity.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
public class ChatMid extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long chatMidId; // 챗 미드 아이디

    @ManyToOne
    @JoinColumn(name = "chatId")
    private Chat chat; //채팅 정보

    @ManyToOne
    @JoinColumn(name = "USERS_ID")
    private Users users; //유저 정보

    @ManyToOne
    @JoinColumn(name = "chatRoomId")
    private ChatRoom chatRoom; //채팅방 정보

    @Column
    private String nickname;


}
