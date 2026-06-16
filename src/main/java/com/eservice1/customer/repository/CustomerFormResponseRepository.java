package com.eservice1.customer.repository;

import com.eservice1.customer.entity.CustomerFormResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerFormResponseRepository
        extends JpaRepository<CustomerFormResponse, Long> {

    List<CustomerFormResponse>
    findByPhoneNumber(
            String phoneNumber
    );
}