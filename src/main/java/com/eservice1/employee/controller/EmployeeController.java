package com.eservice1.employee.controller;

import com.eservice1.employee.entity.Employee;
import com.eservice1.employee.repository.EmployeeRepository;
import com.eservice1.employee.service.EmployeeService;
import org.springframework.web.bind.annotation.*;
import com.eservice1.employee.dto.EmployeeDTO;
import com.eservice1.employee.repository.TaskRepository;
import com.eservice1.employee.entity.TaskStatus;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final EmployeeRepository employeeRepository;
    private final TaskRepository
            taskRepository;public EmployeeController(
            EmployeeService employeeService,
            EmployeeRepository employeeRepository,
            TaskRepository taskRepository) {

        this.employeeService =
                employeeService;

        this.employeeRepository =
                employeeRepository;

        this.taskRepository =
                taskRepository;
    }

    @PostMapping
    public Employee createEmployee(
            @RequestBody Employee employee) {

        return employeeService.save(employee);
    }
    @GetMapping
    public List<EmployeeDTO> getEmployees() {

        return employeeRepository
                .findAll()
                .stream()
                .map(employee -> {

                    EmployeeDTO dto =
                            new EmployeeDTO();

                    dto.setId(
                            employee.getId()
                    );

                    dto.setName(
                            employee.getName()
                    );

                    dto.setPhoneNumber(
                            employee.getPhoneNumber()
                    );

                    dto.setActive(
                            employee.getActive()
                    );

                    dto.setTaskCount(
                            taskRepository
                                    .countByEmployeeId(
                                            employee.getId()
                                    )
                    );
                    dto.setCompletedTasks(
                            taskRepository
                                    .countByEmployeeIdAndStatus(
                                            employee.getId(),
                                            TaskStatus.COMPLETED
                                    )
                    );
                    return dto;

                })
                .toList();
    }

    @PostMapping("/promote/{userId}")
    public Employee promoteUser(
            @PathVariable Long userId) {

        return employeeService
                .promoteUser(userId);
    }


}