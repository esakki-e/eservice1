package com.eservice1.submission.service;

import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.entity.RequestStatus;
import com.eservice1.submission.entity.UploadedDocument;
import com.eservice1.submission.repository.CustomerRequestRepository;
import com.eservice1.submission.repository.UploadedDocumentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import com.eservice1.common.exception.InvalidOperationException;
import com.eservice1.common.exception.ResourceNotFoundException;

import java.util.Set;
import java.util.UUID;
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
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Request not found."
                                )
                        );
        if (request.getStatus() == RequestStatus.COMPLETED) {

            throw new InvalidOperationException(
                    "Cannot upload documents for a completed request."
            );

        }
        if (file.isEmpty()) {

            throw new InvalidOperationException(
                    "Please select a file."
            );

        }
        if (file.getSize() > 5 * 1024 * 1024) {

            throw new InvalidOperationException(
                    "Maximum file size is 5 MB."
            );

        }
        Set<String> allowedTypes = Set.of(

                "application/pdf",

                "image/jpeg",

                "image/png"

        );

        if (!allowedTypes.contains(file.getContentType())) {

            throw new InvalidOperationException(
                    "Only PDF, JPG and PNG files are allowed."
            );

        }
        if (documentName == null ||

                documentName.isBlank()) {

            throw new InvalidOperationException(
                    "Document name cannot be empty."
            );

        }
        String uploadDir = System.getProperty("user.dir")
                + File.separator
                + "uploads"
                + File.separator;

        File directory = new File(uploadDir);

        if (!directory.exists() && !directory.mkdirs()) {

            throw new IOException(
                    "Unable to create upload directory."
            );

        }

        String originalName =
                file.getOriginalFilename();

        String extension = "";

        if (originalName != null &&
                originalName.contains(".")) {

            extension = originalName.substring(
                    originalName.lastIndexOf(".")
            );

        }

        String fileName =
                UUID.randomUUID() + extension;
        String filePath = uploadDir + fileName;

        //System.out.println("Saving to: " + filePath);

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