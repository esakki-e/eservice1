package com.eservice1.service.service;

import com.eservice1.service.entity.PortalService;
import com.eservice1.service.repository.PortalServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortalServiceService {

    private final PortalServiceRepository repository;

    public PortalServiceService(PortalServiceRepository repository) {
        this.repository = repository;
    }

    public PortalService save(PortalService service) {
        return repository.save(service);
    }

    public List<PortalService> getAll() {
        return repository.findAll();
    }
}