package com.eservice1.admin.dto;

public class DashboardStatsDTO {

    private long totalRequests;

    private long totalEmployees;

    private long pendingRequests;

    private long assignedRequests;

    private long inProgressRequests;

    private long completedRequests;

    public DashboardStatsDTO(

            long totalRequests,

            long totalEmployees,

            long pendingRequests,

            long assignedRequests,

            long inProgressRequests,

            long completedRequests

    ) {

        this.totalRequests = totalRequests;

        this.totalEmployees = totalEmployees;

        this.pendingRequests = pendingRequests;

        this.assignedRequests = assignedRequests;

        this.inProgressRequests = inProgressRequests;

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

    public long getAssignedRequests() {
        return assignedRequests;
    }

    public long getInProgressRequests() {
        return inProgressRequests;
    }

    public long getCompletedRequests() {
        return completedRequests;
    }

}