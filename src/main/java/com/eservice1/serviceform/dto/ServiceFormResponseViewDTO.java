package com.eservice1.serviceform.dto;

public class ServiceFormResponseViewDTO {

    private String fieldName;

    private String value;

    public ServiceFormResponseViewDTO(
            String fieldName,
            String value
    ) {
        this.fieldName = fieldName;
        this.value = value;
    }

    public String getFieldName() {
        return fieldName;
    }

    public String getValue() {
        return value;
    }
}