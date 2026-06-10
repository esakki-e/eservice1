package com.eservice1.document.service;

import com.eservice1.document.entity.RequiredDocument;
import com.eservice1.document.repository.RequiredDocumentRepository;
import com.eservice1.service.entity.PortalService;
import com.eservice1.service.repository.PortalServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {

    private final RequiredDocumentRepository documentRepository;
    private final PortalServiceRepository serviceRepository;

    public DocumentService(
            RequiredDocumentRepository documentRepository,
            PortalServiceRepository serviceRepository) {

        this.documentRepository = documentRepository;
        this.serviceRepository = serviceRepository;
    }

    public RequiredDocument addDocument(
            Long serviceId,
            RequiredDocument document) {

        PortalService service =
                serviceRepository.findById(serviceId)
                        .orElseThrow();

        document.setService(service);

        return documentRepository.save(document);
    }

    public List<RequiredDocument> getDocuments(Long serviceId) {
        return documentRepository.findByServiceId(serviceId);
    }
}