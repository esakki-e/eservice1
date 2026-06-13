package com.eservice1.submission.controller;

import com.eservice1.submission.entity.UploadedDocument;
import com.eservice1.submission.repository.UploadedDocumentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documents")
public class UploadedDocumentController {

    private final UploadedDocumentRepository
            documentRepository;

    public UploadedDocumentController(
            UploadedDocumentRepository documentRepository) {

        this.documentRepository =
                documentRepository;
    }

    @GetMapping("/request/{requestId}")
    public List<UploadedDocument>
    getDocumentsByRequestId(
            @PathVariable Long requestId) {

        return documentRepository
                .findByRequestId(requestId);
    }
}