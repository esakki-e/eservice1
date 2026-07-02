package com.eservice1.service.controller;

import com.eservice1.common.dto.PageResponseDTO;
import com.eservice1.service.entity.PortalService;
import com.eservice1.service.service.PortalServiceService;
import org.springframework.web.bind.annotation.*;
import com.eservice1.document.entity.RequiredDocument;
import com.eservice1.document.service.DocumentService;
import java.util.List;

@RestController
@RequestMapping("/services")
public class ServiceController {

    private final PortalServiceService service;
    private final DocumentService documentService;

    public ServiceController(
            PortalServiceService service,
            DocumentService documentService) {

        this.service = service;
        this.documentService = documentService;
    }

    @GetMapping
    public PageResponseDTO<PortalService> getAll(

            @RequestParam(defaultValue="0")
            int page,

            @RequestParam(defaultValue="9")
            int size,

            @RequestParam(required=false)
            String search

    ) {

        return service.getAll(

                page,

                size,

                search

        );

    }

    @GetMapping("/{serviceId}/documents")
    public List<RequiredDocument> getDocuments(
            @PathVariable Long serviceId) {

        return documentService.getDocuments(
                serviceId
        );
    }
}