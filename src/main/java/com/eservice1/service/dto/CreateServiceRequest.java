package com.eservice1.service.dto;

import java.util.List;

public class CreateServiceRequest {

    private String serviceName;

    private String description;

    private Boolean active;

    private List<String> documents;

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(
            String serviceName) {

        this.serviceName =
                serviceName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description) {

        this.description =
                description;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(
            Boolean active) {

        this.active = active;
    }

    public List<String> getDocuments() {
        return documents;
    }

    public void setDocuments(
            List<String> documents) {

        this.documents =
                documents;
    }
}