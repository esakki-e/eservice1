package com.eservice1.document.controller;

import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.entity.UploadedDocument;
import com.eservice1.submission.repository.CustomerRequestRepository;
import com.eservice1.submission.repository.UploadedDocumentRepository;
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

    private final UploadedDocumentRepository
            documentRepository;

    private final CustomerRequestRepository
            requestRepository;

    public DocumentController(
            UploadedDocumentRepository documentRepository,
            CustomerRequestRepository requestRepository) {

        this.documentRepository =
                documentRepository;

        this.requestRepository =
                requestRepository;
    }
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable Long id)
            throws Exception {

        UploadedDocument document =
                documentRepository
                        .findById(id)
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
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\""
                                + document.getFileName()
                                + "\""
                )
                .body(resource);
    }
    @PostMapping("/upload")
    public String uploadFile(
            @RequestParam("file")
            MultipartFile file,
            @RequestParam("requestId")
            Long requestId)
            throws IOException {

        System.out.println(
                "FILE RECEIVED = "
                        + file.getOriginalFilename()
        );

        String uploadDir =
                System.getProperty("user.dir")
                        + File.separator
                        + "uploads"
                        + File.separator;

        File dir = new File(uploadDir);

        if (!dir.exists()) {
            dir.mkdirs();
        }

        String filePath =
                uploadDir
                        + file.getOriginalFilename();

        file.transferTo(
                new File(filePath)
        );

        CustomerRequest request =
                requestRepository
                        .findById(requestId)
                        .orElseThrow();

        UploadedDocument document =
                new UploadedDocument();

        document.setDocumentName(
                file.getOriginalFilename()
        );

        document.setFileName(
                file.getOriginalFilename()
        );

        document.setFilePath(
                filePath
        );

        document.setRequest(
                request
        );

        documentRepository.save(
                document
        );

        return "File uploaded successfully";
    }
}