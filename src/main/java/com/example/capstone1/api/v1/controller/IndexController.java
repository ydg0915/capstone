package com.example.capstone1.api.v1.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class IndexController {

    @GetMapping("/")
    public String main() {
        return "main";
    }

    @GetMapping("/sign-up")
    public String signUp() {
        return "sign-up";
    }

    @GetMapping("/myspace")
    public String myspace() {
        return "myspace";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
