package com.example.capstone1.api.v1.chatnew.config;


import com.example.capstone1.api.exception.StompExceptionHandler;
import com.example.capstone1.api.v1.chatnew.handler.StompHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class SpringConfig implements WebSocketMessageBrokerConfigurer {

    private final StompHandler stompHandler;
    private final StompExceptionHandler stompExceptionHandler;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // stomp 접속 url -> /ws-stomp
        registry
                .setErrorHandler(stompExceptionHandler)
                .addEndpoint("/ws-stomp")
                .setAllowedOriginPatterns("*")
                .addInterceptors();
        }


    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 메시지를 구독하는 요청 url -> 메시지를 받을 때
        registry.enableSimpleBroker("/sub");
        // 메시지를 발행하는 요청 url -> 메시지를 보낼 때
        registry.setApplicationDestinationPrefixes("/pub");
    }


}