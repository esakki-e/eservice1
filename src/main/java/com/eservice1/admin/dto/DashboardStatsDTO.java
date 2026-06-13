package com.eservice1.admin.dto;

public class DashboardStatsDTO {

    private long totalRequests;
    private long totalEmployees;
    private long pendingRequests;
    private long completedRequests;

    public DashboardStatsDTO(
            long totalRequests,
            long totalEmployees,
            long pendingRequests,
            long completedRequests) {

        this.totalRequests = totalRequests;
        this.totalEmployees = totalEmployees;
        this.pendingRequests = pendingRequests;
        this.completedRequests = completedRequests;
    }

    public long getTotalRequests() {
        return totalRequests;
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public long getPendingRequests() {
        return pendingRequests;
    }

    public long getCompletedRequests() {
        return completedRequests;
    }
}