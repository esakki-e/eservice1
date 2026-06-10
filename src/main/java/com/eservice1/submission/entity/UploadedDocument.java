package com.eservice1.submission.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "uploaded_documents")
public class UploadedDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String documentName;

    private String fileName;

    private String filePath;

    @ManyToOne
    @JoinColumn(name = "request_id")
    private CustomerRequest request;

    public UploadedDocument() {
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

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public CustomerRequest getRequest() {
        return request;
    }

    public void setRequest(CustomerRequest request) {
        this.request = request;
    }
}