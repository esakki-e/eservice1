package com.eservice1.submission.service;

import com.eservice1.service.entity.PortalService;
import com.eservice1.service.repository.PortalServiceRepository;
import com.eservice1.submission.dto.CustomerRequestDTO;
import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.entity.RequestStatus;
import com.eservice1.submission.repository.CustomerRequestRepository;
import org.springframework.stereotype.Service;

import com.eservice1.employee.entity.Priority;
import com.eservice1.employee.entity.Task;
import com.eservice1.employee.entity.TaskStatus;
import com.eservice1.employee.repository.TaskRepository;
@Service
public class CustomerRequestService {

    private final CustomerRequestRepository requestRepository;
    private final PortalServiceRepository serviceRepository;

    private final TaskRepository taskRepository;
    public CustomerRequestService(
            CustomerRequestRepository requestRepository,
            PortalServiceRepository serviceRepository,
            TaskRepository taskRepository) {

        this.requestRepository = requestRepository;
        this.serviceRepository = serviceRepository;
        this.taskRepository = taskRepository;
    }

    public CustomerRequest createRequest(CustomerRequestDTO dto) {

        PortalService service =
                serviceRepository.findById(dto.getServiceId())
                        .orElseThrow();

        CustomerRequest request = new CustomerRequest();

        request.setCustomerName(dto.getCustomerName());
        request.setPhoneNumber(dto.getPhoneNumber());
        request.setService(service);
        request.setStatus(RequestStatus.PENDING);

        CustomerRequest savedRequest =
                requestRepository.save(request);

        Task task = new Task();

        task.setRequest(savedRequest);
        task.setStatus(TaskStatus.PENDING);
        task.setPriority(Priority.MEDIUM);

        taskRepository.save(task);

        return savedRequest;
    }
}