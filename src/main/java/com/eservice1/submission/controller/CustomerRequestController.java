package com.eservice1.submission.controller;

import com.eservice1.submission.dto.CustomerRequestDTO;
import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.service.CustomerRequestService;
import org.springframework.web.bind.annotation.*;

import com.eservice1.submission.repository.CustomerRequestRepository;

@RestController
@RequestMapping("/requests")
public class CustomerRequestController {

    private final CustomerRequestService requestService;
    private final CustomerRequestRepository
            requestRepository;

    public CustomerRequestController(
            CustomerRequestService requestService,
            CustomerRequestRepository requestRepository) {

        this.requestService = requestService;
        this.requestRepository = requestRepository;
    }

    @PostMapping
    public CustomerRequest createRequest(
            @RequestBody CustomerRequestDTO dto) {

        return requestService.createRequest(dto);
    }
    @GetMapping("/phone/{phoneNumber}")
    public java.util.List<CustomerRequest>
    getByPhoneNumber(
            @PathVariable String phoneNumber) {

        return requestRepository
                .findByPhoneNumber(phoneNumber);
    }

}

