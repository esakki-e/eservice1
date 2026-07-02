package com.eservice1.feedback.repository;

import com.eservice1.feedback.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepository
        extends JpaRepository<Feedback, Long> {

    Optional<Feedback> findByRequestId(Long requestId);

    List<Feedback> findByServiceId(Long serviceId);

    boolean existsByRequestId(Long requestId);

}