package com.eservice1.customer.service;

import com.eservice1.customer.entity.CustomerFormField;
import com.eservice1.customer.repository.CustomerFormFieldRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerFormFieldService {

    private final CustomerFormFieldRepository repository;

    public CustomerFormFieldService(
            CustomerFormFieldRepository repository) {

        this.repository = repository;
    }

    public CustomerFormField create(
            CustomerFormField field) {

        field.setActive(true);

        return repository.save(field);
    }

    public List<CustomerFormField> getAll() {

        return repository.findAll();
    }

    public List<CustomerFormField> getActive() {

        return repository.findByActiveTrue();
    }
}