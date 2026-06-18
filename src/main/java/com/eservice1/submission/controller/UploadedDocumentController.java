package com.eservice1.submission.controller;

import com.eservice1.submission.entity.UploadedDocument;
import com.eservice1.submission.repository.UploadedDocumentRepository;
import org.springframework.web.bind.annotation.*;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.nio.file.Path;
import java.nio.file.Paths;

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


    @GetMapping("/download/{documentId}")
    public ResponseEntity<Resource>
    downloadDocument(
            @PathVariable Long documentId)
            throws Exception {

        UploadedDocument document =
                documentRepository
                        .findById(documentId)
                        .orElseThrow();

        Path path =
                Paths.get(
                        document.getFilePath()
                );

        Resource resource =
                new UrlResource(
                        path.toUri()
                );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders
                                .CONTENT_DISPOSITION,
                        "attachment; filename=\""
                                + document.getFileName()
                                + "\""
                )
                .body(resource);
    }

}