package com.eservice1.service.dto;

import java.util.List;

public class CategoryServicesDTO {

    private Long id;

    private String name;

    private List<Long> serviceIds;

    public CategoryServicesDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Long> getServiceIds() {
        return serviceIds;
    }

    public void setServiceIds(List<Long> serviceIds) {
        this.serviceIds = serviceIds;
    }

}