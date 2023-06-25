package com.example.capstone1.api.v1.repository;

import com.example.capstone1.api.entity.Notifications;
import com.example.capstone1.api.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationsRepository extends JpaRepository<Notifications, Long> {
    List<Notifications> findAllByReceiverOrderByCreateDateDesc(Users receiver);
}
