package com.example.capstone1.api.v1.repository;


import com.example.capstone1.api.entity.BookMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookMarkRepository extends JpaRepository<BookMark, Long> {

    @Query("select b from BookMark b where b.users.id=:UsersId")
    List<BookMark> findBookMarkByUsersId(Long UsersId);

/*
    @Modifying
    @Transactional
    @Query("delete from BookMark bookmark where bookmark.id=:bookMarkId")
    void deleteBookMarkById(long bookMarkId);

 */


}
