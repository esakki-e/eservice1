package com.eservice1.employee.repository;

import com.eservice1.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Employee findByPhoneNumber(
            String phoneNumber
    );
}