package com.eservice1.employee.dto;

public class RecentRequestDTO {

    private Long id;

    private String customerName;

    private String serviceName;

    private Double amount;

    private String paymentStatus;

    private String status;

    public RecentRequestDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(
            String customerName) {

        this.customerName =
                customerName;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(
            String serviceName) {

        this.serviceName =
                serviceName;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(
            Double amount) {

        this.amount =
                amount;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(
            String paymentStatus) {

        this.paymentStatus =
                paymentStatus;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status) {

        this.status =
                status;
    }

}