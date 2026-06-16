package com.eservice1.serviceform.repository;

import com.eservice1.serviceform.entity.ServiceFormField;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceFormFieldRepository
        extends JpaRepository<ServiceFormField, Long> {

    List<ServiceFormField>
    findByServiceId(Long serviceId);

    List<ServiceFormField>
    findByServiceIdAndActiveTrue(
            Long serviceId
    );
}