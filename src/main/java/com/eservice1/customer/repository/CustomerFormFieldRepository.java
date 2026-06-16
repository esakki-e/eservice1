package com.eservice1.customer.repository;

import com.eservice1.customer.entity.CustomerFormField;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerFormFieldRepository
        extends JpaRepository<CustomerFormField, Long> {

    List<CustomerFormField>
    findByActiveTrue();
}