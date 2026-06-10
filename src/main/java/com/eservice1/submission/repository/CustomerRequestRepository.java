package com.eservice1.submission.repository;

import com.eservice1.submission.entity.CustomerRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRequestRepository
        extends JpaRepository<CustomerRequest, Long> {
}