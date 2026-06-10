package com.eservice1.submission.controller;

import com.eservice1.submission.entity.UploadedDocument;
import com.eservice1.submission.service.RealFileUploadService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/requests")
public class RealFileUploadController {

    private final RealFileUploadService uploadService;

    public RealFileUploadController(
            RealFileUploadService uploadService) {

        this.uploadService = uploadService;
    }

    @PostMapping("/{requestId}/upload-file")
    public UploadedDocument uploadFile(
            @PathVariable Long requestId,
            @RequestParam String documentName,
            @RequestParam MultipartFile file)
            throws IOException {

        return uploadService.uploadFile(
                requestId,
                documentName,
                file
        );
    }
}