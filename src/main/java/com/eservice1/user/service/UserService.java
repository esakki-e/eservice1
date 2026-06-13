package com.eservice1.user.service;

import com.eservice1.common.Role;
import com.eservice1.user.dto.LoginRequest;
import com.eservice1.user.entity.User;
import com.eservice1.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import com.eservice1.employee.repository.EmployeeRepository;
import com.eservice1.employee.entity.Employee;


import com.eservice1.config.JwtService;
import com.eservice1.user.dto.AuthResponse;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final EmployeeRepository
            employeeRepository;

    private final JwtService jwtService;

    public UserService(
            UserRepository userRepository,
            JwtService jwtService,
            EmployeeRepository employeeRepository) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.employeeRepository =
                employeeRepository;
    }

    public User register(User user) {

        return userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {

        User user =
                userRepository.findByPhoneNumber(
                        request.getPhoneNumber()
                ).orElseThrow();
        System.out.println("LOGIN USER = " + user.getName());
        System.out.println("ROLE = " + user.getRole());
        System.out.println("DB PASSWORD = " + user.getPassword());
        System.out.println("REQUEST PASSWORD = " + request.getPassword());

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

        Long employeeId = null;

        if (user.getRole() == Role.EMPLOYEE) {

            Employee employee =
                    employeeRepository
                            .findByPhoneNumber(
                                    user.getPhoneNumber()
                            );

            if (employee != null) {
                employeeId =
                        employee.getId();
            }
        }

        return new AuthResponse(
                token,
                user.getRole().name(),
                employeeId
        );
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