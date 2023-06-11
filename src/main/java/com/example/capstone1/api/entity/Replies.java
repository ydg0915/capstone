package com.example.capstone1.api.entity;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class Replies extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn
    private Users user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn
    private Comments comment;

    @Column(nullable = false)
    private String content;

}
