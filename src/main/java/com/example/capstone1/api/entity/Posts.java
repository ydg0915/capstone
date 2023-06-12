package com.example.capstone1.api.entity;

import com.example.capstone1.api.enums.Position;
import com.example.capstone1.api.enums.TechStack;
import com.example.capstone1.api.v1.dto.request.PostRequestDto;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
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
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn
    private Users user;

    @Column(nullable = false)
    @Size(max = 50)
    private String title;

    @Column(nullable = false)
    @Size(max = 500)
    @Lob
    private String content;

    @Column(nullable = false)
    @Min(value = 1)
    @Max(value = 10)
    private int recruitmentSize;

    @Column(nullable = false)
    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    private List<Position> position;

    @Column(nullable = false)
    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    private List<TechStack> techStack;

    @Column(nullable = false)
    private LocalDate recruitmentPeriod;

    @Column(nullable = false)
    @Min(value = 1)
    @Max(value = 12)
    private int expectedDuration;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int view;

    @OneToMany(mappedBy = "post", cascade = ALL, orphanRemoval = true)
    private List<Comments> comments = new ArrayList<>();

    @Transient
    private int totalCommentsAndReplies;

    public void calculateTotalCommentsAndReplies() {
        int totalCommentsAndReplies = comments.size();
        for (Comments comment : comments) {
            totalCommentsAndReplies += comment.getReplies().size();
        }
        this.totalCommentsAndReplies = totalCommentsAndReplies;
    }

    public void updateFields(PostRequestDto.Create update) {
        this.title = update.getTitle();
        this.content = update.getContent();
        this.recruitmentSize = update.getRecruitmentSize();
        this.position = update.getPosition();
        this.techStack = update.getTechStack();
        this.recruitmentPeriod = update.getRecruitmentPeriod();
        this.expectedDuration = update.getExpectedDuration();
    }
}
