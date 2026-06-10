package com.eservice1.submission.entity;

import com.eservice1.service.entity.PortalService;
import jakarta.persistence.*;

@Entity
@Table(name = "customer_requests")
public class CustomerRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;

    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private PortalService service;

    public CustomerRequest() {
    }

    public Long getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public PortalService getService() {
        return service;
    }

    public void setService(PortalService service) {
        this.service = service;
    }
}