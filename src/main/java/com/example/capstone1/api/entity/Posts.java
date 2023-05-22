package com.example.capstone1.api.entity;

import com.example.capstone1.api.enums.Position;
import com.example.capstone1.api.enums.TechStack;
import lombok.*;

import javax.persistence.*;

import java.time.LocalDate;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class Posts extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;


    @ManyToOne(fetch = LAZY)
    @JoinColumn
    private Users user;

    @Column
    private String title;

    @Lob
    @Column
    private String content;

    @Column
    private int recruitmentSize;

    @Column
    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    private List<Position> position;

    @Column
    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    private List<TechStack> techStack;

    @Column
    private LocalDate recruitmentPeriod;

    @Column
    private int expectedDuration;
}
