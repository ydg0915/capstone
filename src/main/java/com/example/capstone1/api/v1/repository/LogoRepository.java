package com.example.capstone1.api.v1.repository;


import com.example.capstone1.api.entity.BookMark;
import com.example.capstone1.api.entity.Logo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LogoRepository extends JpaRepository<Logo, Long> {


}
