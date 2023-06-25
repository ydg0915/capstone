package com.example.capstone1.api.v1.service;

import com.example.capstone1.api.entity.Notifications;
import com.example.capstone1.api.entity.Users;
import com.example.capstone1.api.exception.CustomException;
import com.example.capstone1.api.mapper.NotificationsMapper;
import com.example.capstone1.api.security.SecurityUtil;
import com.example.capstone1.api.v1.dto.request.NotificationRequestDto;
import com.example.capstone1.api.v1.dto.response.NotificationResponseDto;
import com.example.capstone1.api.v1.repository.EmittersRepository;
import com.example.capstone1.api.v1.repository.NotificationsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static com.example.capstone1.api.exception.ErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class NotificationsService {

    private final NotificationsRepository notificationsRepository;
    private final EmittersRepository emittersRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private Long DEFAULT_TIMEOUT = 60L * 1000L * 60L;

    public SseEmitter subscribe(String lastEventId) {
        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);
        Long userId = user.getId();
        String emitterId = makeTimeIncludeId(userId);

        SseEmitter emitter = emittersRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        emitter.onCompletion(() -> emittersRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emittersRepository.deleteById(emitterId));

        String eventId = makeTimeIncludeId(userId);
        sendNotification(emitter, eventId, emitterId, "EventStream Created. [userId=" + userId + "]");

        if (hasLostData(lastEventId)) {
            sendLostData(lastEventId, userId, emitterId, emitter);
        }

        return emitter;
    }

    public void send(NotificationRequestDto.Send send) {
        Notifications notification = NotificationsMapper.INSTANCE.toNotification(send);
        notificationsRepository.save(notification);

        String receiverId = String.valueOf(notification.getReceiver().getId());
        String eventId = receiverId + "_" + System.currentTimeMillis();
        Map<String, SseEmitter> emitters = emittersRepository.findAllEmitterStartWithByUserId(receiverId);
        emitters.forEach(
                (key, emitter) -> {
                    emittersRepository.saveEventCache(key, notification);
                    sendNotification(emitter, eventId, key, NotificationsMapper.INSTANCE.toNotificationInfoForEmitter(notification));
                }
        );
    }

    public List<NotificationResponseDto.NotificationInfo> getAllNotifications() {
        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        List<Notifications> notifications = notificationsRepository.findAllByReceiverOrderByCreateDateDesc(user);
        if (notifications.isEmpty())
            return Collections.emptyList();
        else {
            List<NotificationResponseDto.NotificationInfo> notificationInfos = new ArrayList<>();
            for (Notifications notification : notifications) {
                NotificationResponseDto.NotificationInfo notificationInfo = NotificationsMapper.INSTANCE.toNotificationInfo(notification);
                notificationInfos.add(notificationInfo);
            }
            return notificationInfos;
        }
    }

    public void read(Long notificationId) {
        Notifications notification = notificationsRepository.findById(notificationId)
                .orElseThrow(() -> new CustomException(NOTIFICATION_NOT_FOUND));

        String username = SecurityUtil.getCurrentUsername();
        if (!notification.getReceiver().getUsername().equals(username)) {
            throw new CustomException(MISMATCH_USER);
        }

        notification.setRead(true);
    }

    private String makeTimeIncludeId(Long userId) {
        return userId + "_" + System.currentTimeMillis();
    }

    private void sendNotification(SseEmitter emitter, String eventId, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(eventId)
                    .data(data));
        } catch (IOException exception) {
            emittersRepository.deleteById(emitterId);
        }
    }

    private boolean hasLostData(String lastEventId) {
        return !lastEventId.isEmpty();
    }

    private void sendLostData(String lastEventId, Long userId, String emitterId, SseEmitter emitter) {
        Map<String, Object> eventCaches = emittersRepository.findAllEventCacheStartWithByUserId(String.valueOf(userId));
        eventCaches.entrySet().stream()
                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                .forEach(entry -> sendNotification(emitter, entry.getKey(), emitterId, entry.getValue()));
    }
}
