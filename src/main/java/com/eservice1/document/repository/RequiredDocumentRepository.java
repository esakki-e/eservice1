package com.eservice1.document.repository;

import com.eservice1.document.entity.RequiredDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequiredDocumentRepository extends JpaRepository<RequiredDocument, Long> {

    List<RequiredDocument> findByServiceId(Long serviceId);

}