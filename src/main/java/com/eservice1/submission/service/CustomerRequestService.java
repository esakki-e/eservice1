package com.eservice1.submission.service;

import com.eservice1.service.entity.PortalService;
import com.eservice1.service.repository.PortalServiceRepository;
import com.eservice1.submission.dto.CustomerRequestDTO;
import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.entity.PaymentStatus;
import com.eservice1.submission.entity.RequestStatus;
import com.eservice1.submission.repository.CustomerRequestRepository;
import org.springframework.stereotype.Service;

import com.eservice1.employee.entity.Priority;
import com.eservice1.employee.entity.Task;
import com.eservice1.employee.entity.TaskStatus;
import com.eservice1.employee.repository.TaskRepository;
import java.time.LocalDateTime;
import com.eservice1.admin.dto.AdminRequestDTO;
import com.eservice1.common.dto.PageResponseDTO;
import com.eservice1.common.util.PaginationMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
        request.setPaymentStatus(
                PaymentStatus.UNPAID
        );

        request.setAmount(0.0);
        request.setPaymentDate(null);

        request.setCreatedAt(
                LocalDateTime.now()
        );

        CustomerRequest savedRequest =
                requestRepository.save(request);

        Task task = new Task();

        task.setRequest(savedRequest);
        task.setStatus(TaskStatus.PENDING);
        task.setPriority(Priority.MEDIUM);


        taskRepository.save(task);

        return savedRequest;
    }public CustomerRequest updatePayment(
            Long requestId,
            PaymentStatus paymentStatus,
            Double amount
    ) {

        CustomerRequest request =
                requestRepository
                        .findById(requestId)
                        .orElseThrow();
        if(

                paymentStatus==PaymentStatus.PAID

                        &&

                        amount<=0

        ){

            throw new RuntimeException(

                    "Amount must be greater than zero."

            );

        }

        request.setPaymentStatus(
                paymentStatus
        );

        request.setAmount(amount);

        if(
                paymentStatus==
                        PaymentStatus.PAID
        ){

            request.setPaymentDate(
                    LocalDateTime.now()
            );

        }else{

            request.setPaymentDate(
                    null
            );

        }

        return requestRepository.save(request);

    }
    public PageResponseDTO<AdminRequestDTO> getAllRequests(

            int page,

            int size

    ) {

        Pageable pageable =

                PageRequest.of(

                        page,

                        size,

                        Sort.by("createdAt").descending()

                );

        Page<CustomerRequest> requests =

                requestRepository.findAll(pageable);

        Page<AdminRequestDTO> dtoPage =

                requests.map(request -> {

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
                            request.getService().getServiceName()
                    );

                    dto.setStatus(
                            request.getStatus().name()
                    );

                    dto.setCreatedAt(
                            request.getCreatedAt()
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

                });

        return PaginationMapper.toResponse(
                dtoPage
        );

    }
    public PageResponseDTO<CustomerRequest> getRequests(

            String phoneNumber,

            int page,

            int size

    ) {

        Pageable pageable =

                PageRequest.of(

                        page,

                        size,

                        Sort.by("createdAt").descending()

                );

        Page<CustomerRequest> requests =

                requestRepository
                        .findByPhoneNumberOrderByCreatedAtDesc(

                                phoneNumber,

                                pageable

                        );

        return PaginationMapper.toResponse(
                requests
        );

    }
}