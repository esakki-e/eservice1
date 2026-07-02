package com.eservice1.servicecategory.repository;

import com.eservice1.servicecategory.entity.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceCategoryRepository
        extends JpaRepository<ServiceCategory, Long> {

    boolean existsByName(String name);

    List<ServiceCategory> findByActiveTrue();

}