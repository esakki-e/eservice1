package com.eservice1.submission.service;

import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.entity.UploadedDocument;
import com.eservice1.submission.repository.CustomerRequestRepository;
import com.eservice1.submission.repository.UploadedDocumentRepository;
import org.springframework.stereotype.Service;

@Service
public class FileUploadService {

    private final UploadedDocumentRepository documentRepository;
    private final CustomerRequestRepository requestRepository;

    public FileUploadService(
            UploadedDocumentRepository documentRepository,
            CustomerRequestRepository requestRepository) {

        this.documentRepository = documentRepository;
        this.requestRepository = requestRepository;
    }

    public UploadedDocument saveDocument(
            Long requestId,
            String documentName,
            String fileName,
            String filePath) {

        CustomerRequest request =
                requestRepository.findById(requestId)
                        .orElseThrow();

        UploadedDocument document =
                new UploadedDocument();

        document.setDocumentName(documentName);
        document.setFileName(fileName);
        document.setFilePath(filePath);
        document.setRequest(request);

        return documentRepository.save(document);
    }
}