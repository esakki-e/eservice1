package com.eservice1.serviceform.controller;

import com.eservice1.serviceform.dto.ServiceFormResponseDTO;
import com.eservice1.serviceform.entity.ServiceFormResponse;
import com.eservice1.serviceform.service.ServiceFormResponseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.eservice1.serviceform.dto.ServiceFormResponseViewDTO;

@RestController
@RequestMapping("/service-form-responses")
public class ServiceFormResponseController {

    private final ServiceFormResponseService service;

    public ServiceFormResponseController(
            ServiceFormResponseService service
    ) {
        this.service = service;
    }

    @PostMapping
    public void save(
            @RequestBody
            List<ServiceFormResponseDTO> responses
    ) {
        service.saveResponses(
                responses
        );
    }

    @GetMapping("/{requestId}")
    public List<ServiceFormResponse> get(
            @PathVariable Long requestId
    ) {
        return service.getResponses(
                requestId
        );
    }
    @GetMapping("/request/{requestId}")
    public List<ServiceFormResponseViewDTO>
    getResponseDetails(
            @PathVariable Long requestId
    ) {

        return service.getResponseDetails(
                requestId
        );
    }
}