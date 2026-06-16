package com.eservice1.serviceform.controller;

import com.eservice1.serviceform.entity.ServiceFormField;
import com.eservice1.serviceform.service.ServiceFormFieldService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/service-form-fields")
public class ServiceFormFieldController {

    private final ServiceFormFieldService service;

    public ServiceFormFieldController(
            ServiceFormFieldService service
    ) {
        this.service = service;
    }

    @PostMapping
    public ServiceFormField create(
            @RequestBody ServiceFormField field
    ) {
        return service.save(field);
    }

    @GetMapping("/service/{serviceId}")
    public List<ServiceFormField> getFields(
            @PathVariable Long serviceId
    ) {
        return service.getByService(
                serviceId
        );
    }

    @GetMapping("/service/{serviceId}/active")
    public List<ServiceFormField> getActiveFields(
            @PathVariable Long serviceId
    ) {
        return service.getActiveByService(
                serviceId
        );
    }
    @PutMapping("/{id}")
    public ServiceFormField update(
            @PathVariable Long id,
            @RequestBody ServiceFormField field
    ) {
        return service.update(
                id,
                field
        );
    }
    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {
        service.deleteField(id);
    }
}