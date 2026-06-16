package com.eservice1.customer.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "customer_form_fields")
public class CustomerFormField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fieldName;

    private String fieldType;

    private Boolean requiredField;

    private Boolean active;

    public CustomerFormField() {
    }

    public Long getId() {
        return id;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getFieldType() {
        return fieldType;
    }

    public void setFieldType(String fieldType) {
        this.fieldType = fieldType;
    }

    public Boolean getRequiredField() {
        return requiredField;
    }

    public void setRequiredField(Boolean requiredField) {
        this.requiredField = requiredField;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}