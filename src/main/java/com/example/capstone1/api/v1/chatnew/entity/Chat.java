package com.example.capstone1.api.v1.chatnew.entity;

import com.example.capstone1.api.entity.BaseTime;
import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.enums.MessageType;
import com.example.capstone1.api.v1.chatnew.dto.ChatResponseDto;
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
public class Chat extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;


    @Column(nullable = false)
    private MessageType type; //메시지 타입

    @Column
    private Long roomId;// 방 번호

    @Column
    private String message;// 메세지

    @ManyToOne
    @JoinColumn(name = "USERS_ID")
    private Users users; //메시지 보낸 사람


    @ManyToOne
    @JoinColumn(name = "ChatRoom_ID")
    private ChatRoom chatRoom;

}
