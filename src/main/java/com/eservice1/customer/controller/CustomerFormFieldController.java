package com.eservice1.customer.controller;

import com.eservice1.customer.entity.CustomerFormField;
import com.eservice1.customer.service.CustomerFormFieldService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer-form-fields")
public class CustomerFormFieldController {

    private final CustomerFormFieldService service;

    public CustomerFormFieldController(
            CustomerFormFieldService service) {

        this.service = service;
    }

    @PostMapping
    public CustomerFormField create(
            @RequestBody CustomerFormField field) {

        return service.create(field);
    }

    @GetMapping
    public List<CustomerFormField> getAll() {

        return service.getAll();
    }

    @GetMapping("/active")
    public List<CustomerFormField> getActive() {

        return service.getActive();
    }
}