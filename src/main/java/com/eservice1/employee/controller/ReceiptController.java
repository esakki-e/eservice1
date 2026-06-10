package com.eservice1.employee.controller;

import com.eservice1.employee.entity.Receipt;
import com.eservice1.employee.service.ReceiptService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/receipts")
public class ReceiptController {

    private final ReceiptService receiptService;

    public ReceiptController(
            ReceiptService receiptService) {

        this.receiptService = receiptService;
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