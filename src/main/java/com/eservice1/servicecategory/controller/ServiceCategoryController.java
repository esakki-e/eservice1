package com.eservice1.servicecategory.controller;

import com.eservice1.servicecategory.entity.ServiceCategory;
import com.eservice1.servicecategory.repository.ServiceCategoryRepository;

import com.eservice1.servicecategory.service.ServiceCategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/service-categories")
public class ServiceCategoryController {

    private final ServiceCategoryService service;

    public ServiceCategoryController(
            ServiceCategoryService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<ServiceCategory> getAllCategories() {

        return service.getAllCategories();

    }

    @GetMapping("/{id}")
    public ServiceCategory getCategory(
            @PathVariable Long id
    ) {

        return service.getCategory(id);

    }

    @PostMapping
    public ServiceCategory createCategory(
            @RequestBody ServiceCategory category
    ) {

        return service.createCategory(category);

    }

    @PutMapping("/{id}")
    public ServiceCategory updateCategory(

            @PathVariable Long id,

            @RequestBody ServiceCategory category

    ) {

        return service.updateCategory(
                id,
                category
        );

    }

    @DeleteMapping("/{id}")
    public void deleteCategory(
            @PathVariable Long id
    ) {

        service.deleteCategory(id);

    }
    @GetMapping("/active")
    public List<ServiceCategory> getActiveCategories() {

        return service.getActiveCategories();

    }

}