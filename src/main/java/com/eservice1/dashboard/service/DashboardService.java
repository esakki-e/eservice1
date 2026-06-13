package com.eservice1.dashboard.service;

import com.eservice1.dashboard.dto.DashboardResponse;
import com.eservice1.employee.entity.Task;
import com.eservice1.employee.entity.TaskStatus;
import com.eservice1.employee.repository.EmployeeRepository;
import com.eservice1.employee.repository.TaskRepository;
import com.eservice1.service.repository.PortalServiceRepository;
import com.eservice1.submission.repository.CustomerRequestRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final PortalServiceRepository serviceRepository;
    private final CustomerRequestRepository requestRepository;
    private final EmployeeRepository employeeRepository;
    private final TaskRepository taskRepository;

    public DashboardService(
            PortalServiceRepository serviceRepository,
            CustomerRequestRepository requestRepository,
            EmployeeRepository employeeRepository,
            TaskRepository taskRepository) {

        this.serviceRepository = serviceRepository;
        this.requestRepository = requestRepository;
        this.employeeRepository = employeeRepository;
        this.taskRepository = taskRepository;
    }

    public DashboardResponse getDashboard() {

        DashboardResponse response =
                new DashboardResponse();

        response.setTotalServices(
                serviceRepository.count()
        );

        response.setTotalRequests(
                requestRepository.count()
        );

        response.setTotalEmployees(
                employeeRepository.count()
        );

        long pending =
                taskRepository.findAll()
                        .stream()
                        .filter(task ->
                                task.getStatus()
                                        != TaskStatus.COMPLETED)
                        .count();

        long completed =
                taskRepository.findAll()
                        .stream()
                        .filter(task ->
                                task.getStatus()
                                        == TaskStatus.COMPLETED)
                        .count();

        response.setPendingTasks(pending);
        response.setCompletedTasks(completed);

        return response;
    }
}