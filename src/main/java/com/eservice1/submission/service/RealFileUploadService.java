package com.eservice1.submission.service;

import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.entity.UploadedDocument;
import com.eservice1.submission.repository.CustomerRequestRepository;
import com.eservice1.submission.repository.UploadedDocumentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class RealFileUploadService {

    private final UploadedDocumentRepository documentRepository;
    private final CustomerRequestRepository requestRepository;

    public RealFileUploadService(
            UploadedDocumentRepository documentRepository,
            CustomerRequestRepository requestRepository) {

        this.documentRepository = documentRepository;
        this.requestRepository = requestRepository;
    }

    public UploadedDocument uploadFile(
            Long requestId,
            String documentName,
            MultipartFile file) throws IOException {

        CustomerRequest request =
                requestRepository.findById(requestId)
                        .orElseThrow();

        String uploadDir = System.getProperty("user.dir")
                + File.separator
                + "uploads"
                + File.separator;

        File directory = new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = file.getOriginalFilename();

        String filePath = uploadDir + fileName;

        System.out.println("Saving to: " + filePath);

        file.transferTo(new File(filePath));

        UploadedDocument document =
                new UploadedDocument();

        document.setDocumentName(documentName);
        document.setFileName(fileName);
        document.setFilePath(filePath);
        document.setRequest(request);

        return documentRepository.save(document);
    }
}