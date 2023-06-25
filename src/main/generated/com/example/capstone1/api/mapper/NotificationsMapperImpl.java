package com.example.capstone1.api.mapper;

import com.example.capstone1.api.entity.Notifications;
import com.example.capstone1.api.entity.Notifications.NotificationsBuilder;
import com.example.capstone1.api.v1.dto.request.NotificationRequestDto.Send;
import com.example.capstone1.api.v1.dto.response.NotificationResponseDto.NotificationInfo;
import com.example.capstone1.api.v1.dto.response.NotificationResponseDto.NotificationInfoForEmitter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-25T22:13:15+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.14.1 (Azul Systems, Inc.)"
)
@Component
public class NotificationsMapperImpl implements NotificationsMapper {

    @Override
    public Notifications toNotification(Send send) {
        if ( send == null ) {
            return null;
        }

        NotificationsBuilder notifications = Notifications.builder();

        notifications.content( send.getContent() );
        notifications.url( send.getUrl() );
        notifications.receiver( send.getReceiver() );

        return notifications.build();
    }

    @Override
    public NotificationInfo toNotificationInfo(Notifications notification) {
        if ( notification == null ) {
            return null;
        }

        NotificationInfo notificationInfo = new NotificationInfo();

        notificationInfo.setId( notification.getId() );
        notificationInfo.setContent( notification.getContent() );
        notificationInfo.setUrl( notification.getUrl() );
        notificationInfo.setRead( notification.isRead() );

        return notificationInfo;
    }

    @Override
    public NotificationInfoForEmitter toNotificationInfoForEmitter(Notifications notification) {
        if ( notification == null ) {
            return null;
        }

        NotificationInfoForEmitter notificationInfoForEmitter = new NotificationInfoForEmitter();

        notificationInfoForEmitter.setContent( notification.getContent() );
        notificationInfoForEmitter.setUrl( notification.getUrl() );

        return notificationInfoForEmitter;
    }
}
