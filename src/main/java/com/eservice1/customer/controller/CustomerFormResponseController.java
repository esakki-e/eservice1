package com.eservice1.customer.controller;

import com.eservice1.customer.dto.CustomerFormResponseDTO;
import com.eservice1.customer.entity.CustomerFormResponse;
import com.eservice1.customer.service.CustomerFormResponseService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/customer-form-responses")
public class CustomerFormResponseController {

    private final CustomerFormResponseService service;

    public CustomerFormResponseController(
            CustomerFormResponseService service) {

        this.service = service;
    }

    @PostMapping
    public CustomerFormResponse save(
            @RequestBody CustomerFormResponseDTO dto) {

        return service.save(dto);
    }

    @GetMapping("/{phoneNumber}")
    public List<CustomerFormResponse>
    getByPhoneNumber(
            @PathVariable String phoneNumber) {

        return service.getByPhoneNumber(
                phoneNumber
        );
    }
    @GetMapping("/autofill/{phoneNumber}")
    public Map<String, String> getAutoFill(
            @PathVariable String phoneNumber
    ) {
        return service.getAutoFillData(
                phoneNumber
        );
    }
}