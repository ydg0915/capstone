package com.example.capstone1.api.v1.dto.response;

import lombok.Getter;
import lombok.Setter;

public class NotificationResponseDto {

    @Getter
    @Setter
    public static class NotificationInfoForEmitter {
        private String content;
        private String url;
    }

    @Getter
    @Setter
    public static class NotificationInfo {
        private Long id;
        private String content;
        private String url;
        private boolean isRead;
    }
}
