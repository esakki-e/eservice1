package com.eservice1.admin.controller;

import com.eservice1.admin.dto.DashboardStatsDTO;
import com.eservice1.employee.repository.EmployeeRepository;
import com.eservice1.submission.entity.RequestStatus;
import com.eservice1.submission.repository.CustomerRequestRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/dashboard")
public class AdminDashboardController {

    private final CustomerRequestRepository requestRepository;
    private final EmployeeRepository employeeRepository;

    public AdminDashboardController(
            CustomerRequestRepository requestRepository,
            EmployeeRepository employeeRepository) {

        this.requestRepository = requestRepository;
        this.employeeRepository = employeeRepository;
    }

    @GetMapping("/stats")
    public DashboardStatsDTO getStats() {

        long totalRequests =
                requestRepository.count();

        long totalEmployees =
                employeeRepository.count();

        long pendingRequests =
                requestRepository
                        .findAll()
                        .stream()
                        .filter(r ->
                                r.getStatus() ==
                                        RequestStatus.PENDING
                        )
                        .count();

        long completedRequests =
                requestRepository
                        .findAll()
                        .stream()
                        .filter(r ->
                                r.getStatus() ==
                                        RequestStatus.COMPLETED
                        )
                        .count();

        return new DashboardStatsDTO(
                totalRequests,
                totalEmployees,
                pendingRequests,
                completedRequests
        );
    }
}