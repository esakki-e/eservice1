package com.eservice1.dashboard.dto;

public class DashboardResponse {

    private long totalServices;
    private long totalRequests;
    private long totalEmployees;
    private long pendingTasks;
    private long completedTasks;
    private long todayRequests;
    private double totalRevenue;
    private long paidRequests;
    private long unpaidRequests;

    public long getTotalServices() {
        return totalServices;
    }

    public void setTotalServices(long totalServices) {
        this.totalServices = totalServices;
    }

    public long getTotalRequests() {
        return totalRequests;
    }

    public void setTotalRequests(long totalRequests) {
        this.totalRequests = totalRequests;
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }

    public void setPendingTasks(long pendingTasks) {
        this.pendingTasks = pendingTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(long completedTasks) {
        this.completedTasks = completedTasks;
    }

    public long getTodayRequests() {
        return todayRequests;
    }

    public void setTodayRequests(
            long todayRequests) {

        this.todayRequests =
                todayRequests;
    }
    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public long getPaidRequests() {
        return paidRequests;
    }

    public void setPaidRequests(long paidRequests) {
        this.paidRequests = paidRequests;
    }

    public long getUnpaidRequests() {
        return unpaidRequests;
    }

    public void setUnpaidRequests(long unpaidRequests) {
        this.unpaidRequests = unpaidRequests;
    }

}