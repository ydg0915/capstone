package com.example.capstone1.api.entity;

import com.example.capstone1.api.v1.dto.request.CommentRequestDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class Comments extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn
    private Users user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn
    private Posts post;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    @ColumnDefault("FALSE")
    private boolean isDeleted;

    @OneToMany(mappedBy = "comment", orphanRemoval = true)
    private List<Replies> replies = new ArrayList<>();

    public void updateFields(CommentRequestDto.CreateComment update) {
        this.content = update.getContent();
    }
}
