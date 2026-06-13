package com.eservice1.submission.repository;

import com.eservice1.submission.entity.UploadedDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UploadedDocumentRepository
        extends JpaRepository<UploadedDocument, Long> {

    List<UploadedDocument> findByRequestId(
            Long requestId
    );
}