package com.example.capstone1.api.bookMark.repository;


import com.example.capstone1.api.bookMark.entity.BookMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookMarkRepository extends JpaRepository<BookMark, Integer> {

    @Query("select b from BookMark b where b.users.id=:UsersId")
    List<BookMark> findBookMarkByUsersId(Long UsersId);
}
