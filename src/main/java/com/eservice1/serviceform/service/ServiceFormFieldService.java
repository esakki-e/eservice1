package com.eservice1.serviceform.service;

import com.eservice1.serviceform.entity.ServiceFormField;
import com.eservice1.serviceform.repository.ServiceFormFieldRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceFormFieldService {

    private final ServiceFormFieldRepository repository;

    public ServiceFormFieldService(
            ServiceFormFieldRepository repository
    ) {
        this.repository = repository;
    }

    public ServiceFormField save(
            ServiceFormField field
    ) {
        return repository.save(field);
    }

    public List<ServiceFormField>
    getByService(Long serviceId) {

        return repository.findByServiceId(
                serviceId
        );
    }

    public List<ServiceFormField>
    getActiveByService(Long serviceId) {

        return repository
                .findByServiceIdAndActiveTrue(
                        serviceId
                );
    }public ServiceFormField update(
            Long id,
            ServiceFormField updated) {

        ServiceFormField field =
                repository.findById(id)
                        .orElseThrow();

        field.setFieldName(
                updated.getFieldName()
        );

        field.setFieldType(
                updated.getFieldType()
        );

        field.setRequiredField(
                updated.getRequiredField()
        );

        return repository.save(field);
    }public void deleteField(Long id) {

        repository.deleteById(id);
    }
}