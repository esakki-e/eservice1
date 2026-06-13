package com.eservice1.service.controller;

import com.eservice1.service.entity.PortalService;
import com.eservice1.service.service.PortalServiceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
public class ServiceController {

    private final PortalServiceService service;

    public ServiceController(
            PortalServiceService service) {

        this.service = service;
    }

    @GetMapping
    public List<PortalService> getServices() {

        return service.getAll();
    }
}