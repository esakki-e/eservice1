package com.eservice1.employee.dto;

public class EmployeeDashboardStatsDTO {

    private long pendingTasks;

    private long assignedTasks;

    private long inProgressTasks;

    private long completedTasks;

    public EmployeeDashboardStatsDTO(
            long pendingTasks,
            long assignedTasks,
            long inProgressTasks,
            long completedTasks) {

        this.pendingTasks = pendingTasks;
        this.assignedTasks = assignedTasks;
        this.inProgressTasks = inProgressTasks;
        this.completedTasks = completedTasks;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }

    public long getAssignedTasks() {
        return assignedTasks;
    }

    public long getInProgressTasks() {
        return inProgressTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }
}