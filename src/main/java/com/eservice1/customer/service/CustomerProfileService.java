package com.eservice1.customer.service;

import com.eservice1.customer.entity.CustomerProfile;
import com.eservice1.customer.repository.CustomerProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerProfileService {

    private final CustomerProfileRepository repository;

    public CustomerProfileService(
            CustomerProfileRepository repository) {

        this.repository = repository;
    }

    public CustomerProfile save(
            CustomerProfile profile) {

        return repository.save(profile);
    }
    public CustomerProfile getByPhone(
            String phoneNumber) {

        CustomerProfile profile =
                repository.findByPhoneNumber(
                        phoneNumber
                );

        if (profile == null) {

            throw new RuntimeException(
                    "Profile Not Found"
            );
        }

        return profile;
    }
}