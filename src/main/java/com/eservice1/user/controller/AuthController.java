package com.eservice1.user.controller;

import com.eservice1.user.dto.LoginRequest;
import com.eservice1.user.entity.User;
import com.eservice1.user.service.UserService;
import org.springframework.web.bind.annotation.*;

import com.eservice1.user.dto.AuthResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(
            UserService userService) {

        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(
            @RequestBody User user) {

        return userService.register(user);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request) {

        return userService.login(request);
    }

    @PostMapping("/owner")
    public User createOwner() {

        return userService.createOwner();
    }
}