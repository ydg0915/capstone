package com.example.capstone1.api.v1.chatnew.entity;

import com.example.capstone1.api.entity.BaseTime;
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
    private String roomId;// 방 번호

    @Column
    private String nickname;//채팅을 보낸 사람

    @Column
    private String message;// 메세지

    @OneToMany(mappedBy = "chatRoom", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<ChatMid> chatMids = new ArrayList<>();

}
