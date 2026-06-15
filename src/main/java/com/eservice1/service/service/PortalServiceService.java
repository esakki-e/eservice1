package com.eservice1.service.service;

import com.eservice1.service.entity.PortalService;
import com.eservice1.service.repository.PortalServiceRepository;
import org.springframework.stereotype.Service;
import com.eservice1.service.dto.CreateServiceRequest;
import com.eservice1.document.entity.RequiredDocument;
import com.eservice1.document.repository.RequiredDocumentRepository;
import java.util.List;

@Service
public class PortalServiceService {
    private final PortalServiceRepository repository;

    private final RequiredDocumentRepository
            documentRepository;

    public PortalServiceService(
            PortalServiceRepository repository,
            RequiredDocumentRepository documentRepository) {

        this.repository = repository;
        this.documentRepository =
                documentRepository;
    }

    public PortalService save(PortalService service) {
        return repository.save(service);
    }

    public PortalService createService(
            CreateServiceRequest request) {

        PortalService service =
                new PortalService();

        service.setServiceName(
                request.getServiceName()
        );

        service.setDescription(
                request.getDescription()
        );

        service.setActive(
                request.getActive()
        );

        PortalService savedService =
                repository.save(service);

        for (String documentName
                : request.getDocuments()) {

            if (documentName == null
                    || documentName.isBlank()) {
                continue;
            }

            RequiredDocument document =
                    new RequiredDocument();

            document.setDocumentName(
                    documentName
            );

            document.setService(
                    savedService
            );

            documentRepository.save(
                    document
            );
        }

        return savedService;
    }

    public List<PortalService> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public PortalService getById(Long id) {
        return repository.findById(id)
                .orElseThrow();
    }

}