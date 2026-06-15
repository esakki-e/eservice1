package com.eservice1.dashboard.controller;

import com.eservice1.dashboard.dto.DashboardResponse;
import com.eservice1.dashboard.service.DashboardService;
import com.eservice1.submission.repository.CustomerRequestRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.eservice1.dashboard.dto.ServiceAnalyticsDTO;
import java.util.List;
@RestController
public class DashboardController {

    private final DashboardService dashboardService;
    private final CustomerRequestRepository
            requestRepository;

    public DashboardController(
            DashboardService dashboardService,
            CustomerRequestRepository requestRepository) {

        this.dashboardService =
                dashboardService;

        this.requestRepository =
                requestRepository;
    }

    @GetMapping("/dashboard")
    public DashboardResponse getDashboard() {

        return dashboardService.getDashboard();
    }

    @GetMapping(
            "/dashboard/service-analytics"
    )
    public List<ServiceAnalyticsDTO>
    getServiceAnalytics() {

        return requestRepository
                .getServiceRequestCounts()
                .stream()
                .map(row -> {

                    ServiceAnalyticsDTO dto =
                            new ServiceAnalyticsDTO();

                    dto.setServiceName(
                            (String) row[0]
                    );

                    dto.setRequestCount(
                            (Long) row[1]
                    );

                    return dto;

                })
                .toList();
    }
}