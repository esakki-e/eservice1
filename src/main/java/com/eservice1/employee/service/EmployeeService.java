package com.eservice1.employee.service;

import com.eservice1.employee.entity.Employee;
import com.eservice1.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import com.eservice1.user.entity.User;
import com.eservice1.user.repository.UserRepository;
import com.eservice1.common.Role;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository,
            UserRepository userRepository) {

        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
    }
    public Employee promoteUser(
            Long userId) {

        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow();

        if (user.getRole() ==
                Role.EMPLOYEE) {

            throw new RuntimeException(
                    "Already an employee"
            );
        }

        user.setRole(
                Role.EMPLOYEE
        );

        userRepository.save(user);
        Employee existing =
                employeeRepository
                        .findByPhoneNumber(
                                user.getPhoneNumber()
                        );

        if (existing != null) {

            throw new RuntimeException(
                    "Employee already exists"
            );
        }

        Employee employee =
                new Employee();

        employee.setName(
                user.getName()
        );

        employee.setPhoneNumber(
                user.getPhoneNumber()
        );

        employee.setActive(true);

        return employeeRepository
                .save(employee);
    }
    public Employee save(Employee employee) {

        employee.setActive(true);

        Employee savedEmployee =
                employeeRepository.save(employee);

        User user = new User();

        user.setName(
                employee.getName()
        );

        user.setPhoneNumber(
                employee.getPhoneNumber()
        );

        user.setPassword(
                employee.getPassword()
        );

        user.setRole(
                Role.EMPLOYEE
        );

        userRepository.save(user);

        return savedEmployee;
    }
}