package com.eservice1.feedback.controller;

import com.eservice1.feedback.dto.FeedbackDTO;
import com.eservice1.feedback.entity.Feedback;
import com.eservice1.feedback.service.FeedbackService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    private final FeedbackService service;

    public FeedbackController(
            FeedbackService service
    ) {
        this.service = service;
    }

    @PostMapping
    public Feedback submitFeedback(
            @RequestBody FeedbackDTO dto
    ) {

        return service.submitFeedback(
                dto
        );

    }

}