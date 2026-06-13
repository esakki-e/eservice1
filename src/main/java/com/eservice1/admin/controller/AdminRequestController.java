package com.eservice1.admin.controller;

import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.repository.CustomerRequestRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/requests")
public class AdminRequestController {

    private final CustomerRequestRepository
            requestRepository;

    public AdminRequestController(
            CustomerRequestRepository requestRepository) {

        this.requestRepository =
                requestRepository;
    }

    @GetMapping
    public java.util.List<CustomerRequest>
    getAllRequests() {

        return requestRepository.findAll();
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
                .findByPhoneNumber(phoneNumber);
    }

    @GetMapping("/test")
    public String test() {

        return "WORKING";
    }
}