package com.eservice1.customer.dto;

public class CustomerFormResponseDTO {

    private Long fieldId;

    private String phoneNumber;

    private String value;

    public Long getFieldId() {
        return fieldId;
    }

    public void setFieldId(Long fieldId) {
        this.fieldId = fieldId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(
            String phoneNumber) {

        this.phoneNumber = phoneNumber;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}