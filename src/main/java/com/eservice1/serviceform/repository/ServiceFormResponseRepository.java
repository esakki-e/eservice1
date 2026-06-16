package com.eservice1.serviceform.repository;

import com.eservice1.serviceform.entity.ServiceFormResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceFormResponseRepository
        extends JpaRepository<ServiceFormResponse, Long> {

    List<ServiceFormResponse>
    findByRequestId(Long requestId);

    ServiceFormResponse
    findByRequestIdAndFieldId(
            Long requestId,
            Long fieldId
    );
}