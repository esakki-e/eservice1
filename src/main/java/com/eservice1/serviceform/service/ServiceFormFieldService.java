package com.eservice1.serviceform.service;

import com.eservice1.common.exception.DuplicateResourceException;
import com.eservice1.common.exception.InvalidOperationException;
import com.eservice1.common.exception.ResourceNotFoundException;
import com.eservice1.serviceform.entity.ServiceFormField;
import com.eservice1.serviceform.repository.ServiceFormFieldRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;
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
        if (field.getFieldName() == null ||
                field.getFieldName().isBlank()) {

            throw new InvalidOperationException(
                    "Field name cannot be empty."
            );
        }
        if (repository.existsByServiceIdAndFieldName(
                field.getServiceId(),
                field.getFieldName())) {

            throw new DuplicateResourceException(
                    "Field already exists."
            );
        }
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
    }
    @Transactional
    public ServiceFormField update(
            Long id,
            ServiceFormField updated) {
        if (updated.getFieldName() == null ||
                updated.getFieldName().isBlank()) {

            throw new InvalidOperationException(
                    "Field name cannot be empty."
            );
        }
        ServiceFormField field =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Service form field not found."
                                )
                        );

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
    }@Transactional
    public void deleteField(Long id) {

        ServiceFormField field = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Service form field not found."
                        )
                );

        repository.delete(field);    }
}