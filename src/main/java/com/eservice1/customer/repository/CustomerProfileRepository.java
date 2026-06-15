package com.eservice1.customer.repository;

import com.eservice1.customer.entity.CustomerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerProfileRepository
        extends JpaRepository<CustomerProfile, Long> {

    CustomerProfile
    findByPhoneNumber(
            String phoneNumber
    );
}