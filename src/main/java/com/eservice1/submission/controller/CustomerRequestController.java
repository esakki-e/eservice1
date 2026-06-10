package com.eservice1.submission.controller;

import com.eservice1.submission.dto.CustomerRequestDTO;
import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.service.CustomerRequestService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/requests")
public class CustomerRequestController {

    private final CustomerRequestService requestService;

    public CustomerRequestController(
            CustomerRequestService requestService) {

        this.requestService = requestService;
    }

    @PostMapping
    public CustomerRequest createRequest(
            @RequestBody CustomerRequestDTO dto) {

        return requestService.createRequest(dto);
    }
}