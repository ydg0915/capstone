package com.example.capstone1.api.mapper;

import com.example.capstone1.api.entity.Notifications;
import com.example.capstone1.api.v1.dto.request.NotificationRequestDto;
import com.example.capstone1.api.v1.dto.response.NotificationResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface NotificationsMapper {

    NotificationsMapper INSTANCE = Mappers.getMapper(NotificationsMapper.class);

    @Mapping(target = "id", ignore = true)
    Notifications toNotification(NotificationRequestDto.Send send);

    NotificationResponseDto.NotificationInfo toNotificationInfo(Notifications notification);
    NotificationResponseDto.NotificationInfoForEmitter toNotificationInfoForEmitter(Notifications notification);
}
