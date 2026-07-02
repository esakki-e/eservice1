package com.eservice1.feedback.service;

import com.eservice1.feedback.dto.FeedbackDTO;
import com.eservice1.feedback.entity.Feedback;
import com.eservice1.feedback.repository.FeedbackRepository;
import com.eservice1.submission.entity.CustomerRequest;
import com.eservice1.submission.entity.RequestStatus;
import com.eservice1.submission.repository.CustomerRequestRepository;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    private final CustomerRequestRepository requestRepository;

    public FeedbackService(
            FeedbackRepository feedbackRepository,
            CustomerRequestRepository requestRepository
    ) {

        this.feedbackRepository = feedbackRepository;
        this.requestRepository = requestRepository;
    }

    public Feedback submitFeedback(
            FeedbackDTO dto
    ) {

        CustomerRequest request =
                requestRepository.findById(dto.getRequestId())
                        .orElseThrow();

        if (feedbackRepository.existsByRequestId(request.getId())) {

            throw new RuntimeException(
                    "Feedback already submitted."
            );

        }

        if (request.getStatus() != RequestStatus.COMPLETED) {

            throw new RuntimeException(
                    "Only completed requests can be rated."
            );

        }

        Feedback feedback = new Feedback();

        feedback.setRequest(request);

        feedback.setService(
                request.getService()
        );

        feedback.setCustomerPhone(
                request.getPhoneNumber()
        );

        feedback.setRating(
                dto.getRating()
        );

        feedback.setComment(
                dto.getComment()
        );

        return feedbackRepository.save(
                feedback
        );

    }

}