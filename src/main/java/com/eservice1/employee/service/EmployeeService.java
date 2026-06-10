package com.eservice1.employee.service;

import com.eservice1.employee.entity.Employee;
import com.eservice1.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository) {

        this.employeeRepository = employeeRepository;
    }

    public Employee save(Employee employee) {

        employee.setActive(true);

        return employeeRepository.save(employee);
    }
}