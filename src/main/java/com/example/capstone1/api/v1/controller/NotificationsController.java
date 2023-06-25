package com.example.capstone1.api.v1.controller;

import com.example.capstone1.api.v1.dto.Response;
import com.example.capstone1.api.v1.dto.response.NotificationResponseDto;
import com.example.capstone1.api.v1.service.NotificationsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/notifications")
@RestController
public class NotificationsController {

    private final NotificationsService notificationsService;
    private final Response response;

    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(@RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        return notificationsService.subscribe(lastEventId);
    }

    @GetMapping
    public ResponseEntity<?> getAllNotifications() {
        List<NotificationResponseDto.NotificationInfo> notificationInfos = notificationsService.getAllNotifications();
        return response.success(notificationInfos, "알림 목록 조회에 성공했습니다.");
    }

    @PatchMapping("/{notificationId}")
    public ResponseEntity<?> read(@PathVariable Long notificationId) {
        notificationsService.read(notificationId);
        return response.success("알림 조회에 성공했습니다.");
    }

    @GetMapping("/count")
    public ResponseEntity<?> count() {
        int count = notificationsService.count();
        return response.success(count, "알림 개수 조회에 성공했습니다.");
    }
}
