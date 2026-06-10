package com.eservice1.submission.service;

import com.eservice1.service.entity.PortalService;
import com.eservice1.service.repository.PortalServiceRepository;
import com.eservice1.submission.dto.CustomerRequestDTO;
import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.entity.RequestStatus;
import com.eservice1.submission.repository.CustomerRequestRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerRequestService {

    private final CustomerRequestRepository requestRepository;
    private final PortalServiceRepository serviceRepository;

    public CustomerRequestService(
            CustomerRequestRepository requestRepository,
            PortalServiceRepository serviceRepository) {

        this.requestRepository = requestRepository;
        this.serviceRepository = serviceRepository;
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

        return requestRepository.save(request);
    }
}