package com.eservice1.document.repository;

import com.eservice1.document.entity.RequiredDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RequiredDocumentRepository
        extends JpaRepository<RequiredDocument, Long> {

    List<RequiredDocument> findByServiceId(Long serviceId);
    boolean existsByService_IdAndDocumentName(
            Long serviceId,
            String documentName
    );
    @Transactional
    @Modifying
    @org.springframework.data.jpa.repository.Query(
            "DELETE FROM RequiredDocument d WHERE d.service.id = :serviceId"
    )
    void deleteByService_Id(
            @org.springframework.data.repository.query.Param("serviceId")
            Long serviceId
    );
}