package com.eservice1.serviceform.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ServiceFormResponseDTO {

    @NotNull(message = "Request ID is required.")
    private Long requestId;

    @NotNull(message = "Field ID is required.")
    private Long fieldId;

    @NotBlank(message = "Value is required.")
    @Size(
            max = 500,
            message = "Value cannot exceed 500 characters."
    )
    private String value;

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public Long getFieldId() {
        return fieldId;
    }

    public void setFieldId(Long fieldId) {
        this.fieldId = fieldId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}