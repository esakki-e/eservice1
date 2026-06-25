package com.eservice1.admin.controller;

import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.repository.CustomerRequestRepository;
import org.springframework.web.bind.annotation.*;
import com.eservice1.admin.dto.AdminRequestDTO;
import com.eservice1.employee.entity.Task;
import com.eservice1.employee.repository.TaskRepository;

@RestController
@RequestMapping("/admin/requests")
public class AdminRequestController {

    private final CustomerRequestRepository
            requestRepository;
    private final TaskRepository taskRepository;
    public AdminRequestController(
            CustomerRequestRepository requestRepository,
            TaskRepository taskRepository) {

        this.requestRepository = requestRepository;
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public java.util.List<AdminRequestDTO> getAllRequests() {

        java.util.List<CustomerRequest> requests =
                requestRepository.findAll();

        return requests.stream()
                .map(request -> {

                    AdminRequestDTO dto =
                            new AdminRequestDTO();

                    dto.setId(
                            request.getId()
                    );

                    dto.setCustomerName(
                            request.getCustomerName()
                    );

                    dto.setPhoneNumber(
                            request.getPhoneNumber()
                    );

                    dto.setServiceName(
                            request.getService().getServiceName()                    );

                    dto.setStatus(
                            request.getStatus().name()
                    );

                    Task task =
                            taskRepository.findByRequestId(
                                    request.getId()
                            );

                    if (
                            task != null &&
                                    task.getEmployee() != null
                    ) {

                        dto.setAssignedEmployeeId(
                                task.getEmployee().getId()
                        );

                        dto.setAssignedEmployeeName(
                                task.getEmployee().getName()
                        );
                    }

                    return dto;

                })
                .toList();
    }

    @GetMapping("/{id}")
    public CustomerRequest getRequest(
            @PathVariable Long id) {

        return requestRepository
                .findById(id)
                .orElseThrow();
    }

    @GetMapping("/phone/{phoneNumber}")
    public java.util.List<CustomerRequest>
    getByPhoneNumber(
            @PathVariable String phoneNumber) {

        return requestRepository
                .findByPhoneNumberOrderByCreatedAtDesc(
                        phoneNumber

                );
    }

    @GetMapping("/test")
    public String test() {

        return "WORKING";
    }
}