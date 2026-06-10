package com.eservice1.document.entity;

import com.eservice1.service.entity.PortalService;
import jakarta.persistence.*;

@Entity
@Table(name = "required_documents")
public class RequiredDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String documentName;

    private Boolean mandatory;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private PortalService service;

    public RequiredDocument() {
    }

    public Long getId() {
        return id;
    }

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public Boolean getMandatory() {
        return mandatory;
    }

    public void setMandatory(Boolean mandatory) {
        this.mandatory = mandatory;
    }

    public PortalService getService() {
        return service;
    }

    public void setService(PortalService service) {
        this.service = service;
    }
}