package com.eservice1.user.service;

import com.eservice1.common.Role;
import com.eservice1.user.dto.LoginRequest;
import com.eservice1.user.entity.User;
import com.eservice1.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(
            UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    public User register(User user) {

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {

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

        return user;
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