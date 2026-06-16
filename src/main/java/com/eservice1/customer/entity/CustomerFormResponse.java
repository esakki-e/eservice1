package com.eservice1.customer.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "customer_form_responses")
public class CustomerFormResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "field_id")
    private CustomerFormField field;

    @Column(length = 2000)
    private String value;

    public CustomerFormResponse() {
    }

    public Long getId() {
        return id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(
            String phoneNumber) {

        this.phoneNumber = phoneNumber;
    }

    public CustomerFormField getField() {
        return field;
    }

    public void setField(
            CustomerFormField field) {

        this.field = field;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}