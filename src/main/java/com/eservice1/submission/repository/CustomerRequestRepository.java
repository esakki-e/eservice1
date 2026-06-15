package com.eservice1.submission.repository;

import com.eservice1.submission.entity.CustomerRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface CustomerRequestRepository
        extends JpaRepository<CustomerRequest, Long> {
    List<CustomerRequest>
    findByPhoneNumberOrderByCreatedAtDesc(
            String phoneNumber
    );

    long countByCreatedAtBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    @Query("""
SELECT
c.service.serviceName,
COUNT(c)
FROM CustomerRequest c
GROUP BY c.service.serviceName
""")
    List<Object[]>
    getServiceRequestCounts();
}