package com.eservice1.servicecategory.service;

import com.eservice1.service.entity.PortalService;
import com.eservice1.service.repository.PortalServiceRepository;
import com.eservice1.servicecategory.entity.ServiceCategory;
import com.eservice1.servicecategory.repository.ServiceCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceCategoryService {

    private final ServiceCategoryRepository categoryRepository;

    private final PortalServiceRepository serviceRepository;

    public ServiceCategoryService(
            ServiceCategoryRepository categoryRepository,
            PortalServiceRepository serviceRepository
    ) {
        this.categoryRepository = categoryRepository;
        this.serviceRepository = serviceRepository;
    }

    public List<ServiceCategory> getAllCategories() {

        return categoryRepository.findAll();

    }

    public ServiceCategory getCategory(
            Long id
    ) {

        return categoryRepository.findById(id)
                .orElseThrow();

    }

    public ServiceCategory createCategory(
            ServiceCategory category
    ) {

        if (categoryRepository.existsByName(category.getName())) {

            throw new RuntimeException(
                    "Category already exists"
            );

        }

        return categoryRepository.save(category);

    }

    public ServiceCategory updateCategory(
            Long id,
            ServiceCategory request
    ) {

        ServiceCategory category =
                categoryRepository.findById(id)
                        .orElseThrow();

        category.setName(
                request.getName()
        );

        category.setActive(
                request.getActive()
        );

        category.setServiceIds(
                request.getServiceIds()
        );

        return categoryRepository.save(category);

    }

    public void deleteCategory(
            Long id
    ) {

        categoryRepository.deleteById(id);

    }public List<ServiceCategory> getActiveCategories() {

        return categoryRepository.findByActiveTrue();

    }

}