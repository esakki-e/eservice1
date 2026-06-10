package com.eservice1.submission.repository;

import com.eservice1.submission.entity.UploadedDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadedDocumentRepository
        extends JpaRepository<UploadedDocument, Long> {
}