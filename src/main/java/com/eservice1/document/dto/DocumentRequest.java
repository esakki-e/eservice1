package com.eservice1.document.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
public class DocumentRequest {

    @NotBlank(message = "Document name is required.")
    @Size(
            max = 100,
            message = "Document name cannot exceed 100 characters."
    )
    private String documentName;

    @NotNull(message = "Mandatory status is required.")
    private Boolean mandatory;

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
}