package com.eservice1.admin.controller;

import com.eservice1.service.entity.PortalService;
import com.eservice1.service.service.PortalServiceService;
import org.springframework.web.bind.annotation.*;
import com.eservice1.service.dto.CreateServiceRequest;

import java.util.List;

@RestController
@RequestMapping("/admin/services")
public class AdminServiceController {

    private final PortalServiceService service;

    public AdminServiceController(PortalServiceService service) {
        this.service = service;
    }

    @PostMapping
    public PortalService createService(
            @RequestBody CreateServiceRequest request) {

        return service.createService(
                request
        );
    }

    @GetMapping
    public List<PortalService> getAllServices() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable Long id) {
        service.delete(id);
    }
    @PutMapping("/{id}")
    public PortalService updateService(
            @PathVariable Long id,
            @RequestBody PortalService updatedService) {

        PortalService serviceToUpdate =
                service.getById(id);

        serviceToUpdate.setServiceName(
                updatedService.getServiceName()
        );

        serviceToUpdate.setDescription(
                updatedService.getDescription()
        );

        serviceToUpdate.setActive(
                updatedService.getActive()
        );

        return service.save(serviceToUpdate);
    }
}





























































































































































































































































































