package com.eservice1.employee.controller;

import com.eservice1.employee.entity.Employee;
import com.eservice1.employee.repository.EmployeeRepository;
import com.eservice1.employee.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final EmployeeRepository employeeRepository;

    public EmployeeController(
            EmployeeService employeeService,
            EmployeeRepository employeeRepository) {

        this.employeeService = employeeService;
        this.employeeRepository = employeeRepository;
    }

    @PostMapping
    public Employee createEmployee(
            @RequestBody Employee employee) {

        return employeeService.save(employee);
    }

    @GetMapping
    public List<Employee> getEmployees() {

        return employeeRepository.findAll();
    }

    @PostMapping("/promote/{userId}")
    public Employee promoteUser(
            @PathVariable Long userId) {

        return employeeService
                .promoteUser(userId);
    }


}