package com.eservice1.employee.controller;

import com.eservice1.employee.entity.Receipt;
import com.eservice1.employee.service.ReceiptService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import com.eservice1.employee.repository.ReceiptRepository;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.io.File;

@RestController
@RequestMapping("/receipts")
public class ReceiptController {

    private final ReceiptService receiptService;

    private final ReceiptRepository receiptRepository;

    public ReceiptController(
            ReceiptService receiptService,
            ReceiptRepository receiptRepository) {

        this.receiptService = receiptService;
        this.receiptRepository = receiptRepository;
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadReceipt(
            @PathVariable Long id) {

        Receipt receipt =
                receiptRepository.findById(id)
                        .orElseThrow();

        File file =
                new File(receipt.getFilePath());

        Resource resource =
                new FileSystemResource(file);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" +
                                receipt.getFileName() +
                                "\""
                )
                .body(resource);
    }

    @PostMapping("/{taskId}/upload")
    public Receipt uploadReceipt(
            @PathVariable Long taskId,
            @RequestParam MultipartFile file)
            throws IOException {

        return receiptService.uploadReceipt(
                taskId,
                file
        );
    }
}