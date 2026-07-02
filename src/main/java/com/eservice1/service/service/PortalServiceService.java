package com.eservice1.service.service;

import com.eservice1.service.entity.PortalService;
import com.eservice1.service.repository.PortalServiceRepository;
import org.springframework.stereotype.Service;
import com.eservice1.service.dto.CreateServiceRequest;
import com.eservice1.document.entity.RequiredDocument;
import com.eservice1.document.repository.RequiredDocumentRepository;
import java.util.List;
import com.eservice1.common.dto.PageResponseDTO;
import com.eservice1.common.util.PaginationMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public PageResponseDTO<PortalService> getAll(

            int page,

            int size,

            String search

    ) {

        if (search != null) {

            search = search.trim();

            if (search.isBlank()) {

                search = null;

            }

        }

        Pageable pageable =

                PageRequest.of(

                        page,

                        size,

                        Sort.by("id").descending()

                );

        Page<PortalService> services =

                repository.searchServices(

                        search,

                        pageable

                );

        return PaginationMapper.toResponse(
                services
        );

    }
    public PageResponseDTO<PortalService> getAll(

            int page,

            int size

    ) {

        return getAll(

                page,

                size,

                null

        );

    }
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public PortalService getById(Long id) {
        return repository.findById(id)
                .orElseThrow();
    }

}