package com.example.capstone1.api.v1.service;

import com.example.capstone1.api.entity.BookMark;
import com.example.capstone1.api.entity.Posts;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.exception.BusinessLogicException;
import com.example.capstone1.api.exception.CustomException;
import com.example.capstone1.api.exception.ExceptionCode;
import com.example.capstone1.api.mapper.PostsMapper;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.dto.request.PostRequestDto;
import com.example.capstone1.api.v1.dto.response.PostResponseDto;
import com.example.capstone1.api.v1.repository.PostsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.example.capstone1.api.exception.ErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class PostsService {
    private final PostsRepository postsRepository;
    private final CustomUserDetailsService customUserDetailsService;

    public List<PostResponseDto.PostInfoForBlock> getAllPosts(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createDate")
        );

        Page<Posts> posts = postsRepository.findAll(pageRequest);
        if (posts.isEmpty())
            return Collections.emptyList();
        else {
            List<PostResponseDto.PostInfoForBlock> postInfos = new ArrayList<>();
            for (Posts post : posts) {
                post.calculateTotalCommentsAndReplies();
                PostResponseDto.PostInfoForBlock postInfo = PostsMapper.INSTANCE.toPostInfoForBlock(post);
                postInfos.add(postInfo);
            }
            return postInfos;
        }
    }

    public List<PostResponseDto.PostInfoForBlock> getAllRecruitingPosts(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createDate")
        );

        Page<Posts> posts = postsRepository.findAllByIsCompletedFalse(pageRequest);
        if (posts.isEmpty())
            return Collections.emptyList();
        else {
            List<PostResponseDto.PostInfoForBlock> postInfos = new ArrayList<>();
            for (Posts post : posts) {
                post.calculateTotalCommentsAndReplies();
                PostResponseDto.PostInfoForBlock postInfo = PostsMapper.INSTANCE.toPostInfoForBlock(post);
                postInfos.add(postInfo);
            }
            return postInfos;
        }
    }

    public PostResponseDto.PostInfo getPostById(Long postId) {
        Posts post = postsRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        PostResponseDto.PostInfo postInfo = PostsMapper.INSTANCE.toPostInfo(post);

        return postInfo;
    }

    public void create(PostRequestDto.Create create) {
        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        Posts post = PostsMapper.INSTANCE.toPost(create, user);

        postsRepository.save(post);
    }

    public void update(PostRequestDto.Create update, Long postId) {
        Posts post = postsRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        String username = SecurityUtil.getCurrentUsername();
        if (!post.getUser().getUsername().equals(username)) {
            throw new CustomException(MISMATCH_USER);
        }

        post.updateFields(update);

        postsRepository.save(post);
    }

    public void complete(Long postId) {
        Posts post = postsRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        String username = SecurityUtil.getCurrentUsername();
        if (!post.getUser().getUsername().equals(username)) {
            throw new CustomException(MISMATCH_USER);
        }

        post.setCompleted(true);

        postsRepository.save(post);
    }

    public void delete(Long postId) {
        Posts post = postsRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        String username = SecurityUtil.getCurrentUsername();
        if (!post.getUser().getUsername().equals(username)) {
            throw new CustomException(MISMATCH_USER);
        }

        postsRepository.delete(post);
    }

    public List<PostResponseDto.PostInfoForBlock> searchPosts(String query) {
        List<Posts> posts = postsRepository.findByTitleContainingOrContentContaining(query);
        if (posts.isEmpty()) {
            return Collections.emptyList();
        }
        else {
            List<PostResponseDto.PostInfoForBlock> postInfos = new ArrayList<>();
            for (Posts post : posts) {
                PostResponseDto.PostInfoForBlock postInfo = PostsMapper.INSTANCE.toPostInfoForBlock(post);
                postInfos.add(postInfo);
            }
            return postInfos;
        }
    }

    public void updateView(Long postId) {
        postsRepository.updateView(postId);
    }


    public Posts findPost(Long PostId) { //포스트 Id로 포스트 반환
        Posts posts = verifiedHotel(PostId);
        return posts;
    }

    //북마크아이디에 속해있는 포스트 아이디를 받아서 리스트로 반환
    public List<Posts> findListPost(List<BookMark> bookMark){
        List<Posts> posts = new ArrayList<>();

        //post 정보 하나씩 가져와서 리스트에 넣기
        for (int i = 0; i < bookMark.size(); i++) {
            long postId = bookMark.get(i).getPosts().getId();
            Optional<Posts> optionalPosts = postsRepository.findById(postId);

            Posts posts1 = optionalPosts.orElseThrow(() -> new NoSuchElementException("Posts 객체를 찾을 수 없습니다."));

            posts.add(posts1);
        }

        return posts;
    }


    public Posts verifiedHotel(Long PostId) {
        Optional<Posts> post = postsRepository.findById(PostId);
        return post.orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

    }


}
