package com.eservice1.user.service;

import com.eservice1.common.Role;
import com.eservice1.user.dto.LoginRequest;
import com.eservice1.user.entity.User;
import com.eservice1.user.repository.UserRepository;
import org.springframework.stereotype.Service;


import com.eservice1.config.JwtService;
import com.eservice1.user.dto.AuthResponse;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final JwtService jwtService;

    public UserService(
            UserRepository userRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public User register(User user) {

        return userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {

        User user =
                userRepository.findByPhoneNumber(
                        request.getPhoneNumber()
                ).orElseThrow();

        if (!user.getPassword()
                .equals(request.getPassword())) {

            throw new RuntimeException(
                    "Invalid Password"
            );
        }

        String token =
                jwtService.generateToken(
                        user.getPhoneNumber()
                );

        return new AuthResponse(token);
    }
    public User createOwner() {

        User owner = new User();

        owner.setName("Owner");
        owner.setPhoneNumber("9999999999");
        owner.setPassword("owner123");
        owner.setRole(Role.OWNER);

        return userRepository.save(owner);
    }
}