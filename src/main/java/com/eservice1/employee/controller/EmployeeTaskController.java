package com.eservice1.employee.controller;

import com.eservice1.employee.entity.Priority;
import com.eservice1.employee.entity.Task;
import com.eservice1.employee.service.TaskService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;


import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/employee/tasks")
public class EmployeeTaskController {

    private final TaskService taskService;

    public EmployeeTaskController(
            TaskService taskService) {

        this.taskService = taskService;
    }

    @PostMapping
    public Task createTask(
            @RequestBody Task task) {

        return taskService.createTask(task);
    }

    @GetMapping
    public List<Task> getAllTasks() {

        return taskService.getAllTasks();
    }

    @GetMapping("/{employeeId}")
    public List<Task> getTasks(
            @PathVariable Long employeeId) {

        return taskService.getTasks(employeeId);
    }

    @PostMapping("/{taskId}/accept")
    public Task acceptTask(
            @PathVariable Long taskId) {

        return taskService.acceptTask(taskId);
    }

    @PostMapping("/{taskId}/complete")
    public Task completeTask(
            @PathVariable Long taskId) {

        return taskService.completeTask(taskId);
    }

    @PostMapping("/{taskId}/priority")
    public Task updatePriority(
            @PathVariable Long taskId,
            @RequestParam Priority priority) {

        return taskService.updatePriority(
                taskId,
                priority
        );
    }

    @PostMapping("/{taskId}/assign/{employeeId}")
    public Task assignEmployee(
            @PathVariable Long taskId,
            @PathVariable Long employeeId) {

        return taskService.assignEmployee(
                taskId,
                employeeId
        );
    }
    @PostMapping("/{requestId}/self-assign")
    public Task selfAssign(
            @PathVariable Long requestId,
            Authentication authentication) {

        return taskService.selfAssign(
                requestId,
                authentication.getName()
        );
    }
}