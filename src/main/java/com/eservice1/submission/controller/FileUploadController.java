package com.eservice1.submission.controller;

import com.eservice1.submission.entity.UploadedDocument;
import com.eservice1.submission.service.FileUploadService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/requests")
public class FileUploadController {

    private final FileUploadService fileUploadService;

    public FileUploadController(
            FileUploadService fileUploadService) {

        this.fileUploadService = fileUploadService;
    }

    @PostMapping("/{requestId}/upload")
    public UploadedDocument uploadDocument(
            @PathVariable Long requestId,
            @RequestParam String documentName,
            @RequestParam String fileName,
            @RequestParam String filePath) {

        return fileUploadService.saveDocument(
                requestId,
                documentName,
                fileName,
                filePath
        );
    }
}