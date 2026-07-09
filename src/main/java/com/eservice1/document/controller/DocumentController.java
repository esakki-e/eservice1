package com.eservice1.document.controller;

import com.eservice1.common.exception.ResourceNotFoundException;
import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.entity.UploadedDocument;
import com.eservice1.submission.repository.CustomerRequestRepository;
import com.eservice1.submission.repository.UploadedDocumentRepository;
import com.eservice1.submission.service.RealFileUploadService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/documents")
public class DocumentController {

    private final RealFileUploadService uploadService;

    private final UploadedDocumentRepository documentRepository;

    public DocumentController(

            UploadedDocumentRepository documentRepository,

            RealFileUploadService uploadService

    ) {

        this.documentRepository = documentRepository;

        this.uploadService = uploadService;

    }
    @PostMapping("/upload")
    public UploadedDocument uploadFile(

            @RequestParam Long requestId,

            @RequestParam MultipartFile file,

            @RequestParam(defaultValue = "false")
            boolean isResult

    ) throws IOException {

        return uploadService.uploadFile(

                requestId,

                file.getOriginalFilename(),

                file,

                isResult
        );
    }
    @GetMapping("/request/{requestId}")
    public java.util.List<UploadedDocument>
    getDocumentsByRequest(
            @PathVariable Long requestId
    ) {

        return documentRepository
                .findByRequest_IdAndResultDocument(

                        requestId,

                        false

                );
    }

    @GetMapping("/request/{requestId}/results")
    public java.util.List<UploadedDocument>
    getResultDocuments(

            @PathVariable Long requestId

    ) {

        return documentRepository
                .findByRequest_IdAndResultDocument(

                        requestId,

                        true

                );

    }
}