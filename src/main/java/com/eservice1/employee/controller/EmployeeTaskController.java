package com.eservice1.employee.controller;

import com.eservice1.employee.dto.EmployeeDashboardStatsDTO;
import com.eservice1.employee.entity.Employee;
import com.eservice1.employee.entity.Priority;
import com.eservice1.employee.entity.Task;
import com.eservice1.employee.service.TaskService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.bind.annotation.RequestBody;
import com.eservice1.common.dto.PageResponseDTO;
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
    public PageResponseDTO<Task> getTasks(

            @PathVariable
            Long employeeId,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size,

            @RequestParam(required = false)
            String search,

            @RequestParam(required = false)
            String phone,

            @RequestParam(required = false)
            String status

    ) {

        return taskService.getTasks(

                employeeId,

                page,

                size,

                search,

                phone,

                status

        );

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


    @PostMapping("/{requestId}/self-assign")
    public Task selfAssign(
            @PathVariable Long requestId,
            Authentication authentication) {

        return taskService.selfAssign(
                requestId,
                authentication.getName()
        );
    }
    @PostMapping("/{requestId}/assign/{employeeId}")
    public Task assignEmployee(
            @PathVariable Long requestId,
            @PathVariable Long employeeId) {

        System.out.println("ASSIGN CONTROLLER HIT");
        System.out.println("REQUEST ID = " + requestId);
        System.out.println("EMPLOYEE ID = " + employeeId);

        return taskService.assignEmployee(
                requestId,
                employeeId
        );
    }
    @PostMapping("/upload-result")
    public String uploadResult(
            @RequestParam("file")
            MultipartFile file,

            @RequestParam("taskId")
            Long taskId)
            throws Exception {

        taskService.uploadResult(
                taskId,
                file
        );

        return "SUCCESS";
    }
    @GetMapping("/dashboard/stats")
    public EmployeeDashboardStatsDTO getDashboardStats(
            Authentication authentication
    ) {

        return taskService.getDashboardStats(
                authentication.getName()
        );

    }
}