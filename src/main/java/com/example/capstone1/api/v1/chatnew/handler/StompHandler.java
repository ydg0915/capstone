package com.example.capstone1.api.v1.chatnew.handler;

import com.example.capstone1.api.exception.BusinessLogicException;
import com.example.capstone1.api.exception.ExceptionCode;
import com.example.capstone1.api.jwt.JwtTokenProvider;
import com.example.capstone1.api.v1.chatnew.config.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;


import java.util.Map;


@Component
@Slf4j
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class StompHandler implements ChannelInterceptor {


    private final JwtTokenProvider jwtTokenProvider;
    private static final String BEARER_PREFIX = "Bearer";


    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        printStompHead(headerAccessor);

        log.info("연결확인!!");
        StompCommand command = headerAccessor.getCommand();
        if (!command.equals(StompCommand.CONNECT)) {
            return message;
        }


        String authorization = String.valueOf(headerAccessor.getNativeHeader("Authorization"));
        log.info("여기!!!" + authorization);

        String token = authorization.substring(8, authorization.length() - 1);
        log.info("여기토큰!!"+token);
        jwtTokenProvider.validateToken(token);
        log.info("검증 통과");
        return message;
    }

    private void printStompHead(StompHeaderAccessor headerAccessor) {
        Map<String, Object> headers = headerAccessor.toMap();
        for (Map.Entry<String, Object> entry : headers.entrySet()) {
            String headerName = entry.getKey();
            Object headerValue = entry.getValue();
            log.info("Header - {}: {}", headerName, headerValue);
        }
    }
}
