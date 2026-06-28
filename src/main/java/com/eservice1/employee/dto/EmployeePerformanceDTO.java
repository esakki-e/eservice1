package com.eservice1.employee.dto;

import java.util.List;

public class EmployeePerformanceDTO {

    private Long id;

    private String name;

    private String phoneNumber;

    private Boolean active;

    private long assignedTasks;

    private long completedTasks;

    private long pendingTasks;

    private long inProgressTasks;

    private long thisMonthRequests;

    private long paidRequests;

    private double totalRevenue;

    private double monthRevenue;

    private double averageRevenue;

    private int completionPercentage;

    private int successScore;

    private String bestMonth;

    private double bestMonthRevenue;

    private List<RecentRequestDTO> recentRequests;

    public EmployeePerformanceDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(
            String phoneNumber) {

        this.phoneNumber = phoneNumber;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public long getAssignedTasks() {
        return assignedTasks;
    }

    public void setAssignedTasks(
            long assignedTasks) {

        this.assignedTasks =
                assignedTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(
            long completedTasks) {

        this.completedTasks =
                completedTasks;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }

    public void setPendingTasks(
            long pendingTasks) {

        this.pendingTasks =
                pendingTasks;
    }

    public long getInProgressTasks() {
        return inProgressTasks;
    }

    public void setInProgressTasks(
            long inProgressTasks) {

        this.inProgressTasks =
                inProgressTasks;
    }

    public long getThisMonthRequests() {
        return thisMonthRequests;
    }

    public void setThisMonthRequests(
            long thisMonthRequests) {

        this.thisMonthRequests =
                thisMonthRequests;
    }

    public long getPaidRequests() {
        return paidRequests;
    }

    public void setPaidRequests(
            long paidRequests) {

        this.paidRequests =
                paidRequests;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(
            double totalRevenue) {

        this.totalRevenue =
                totalRevenue;
    }

    public double getMonthRevenue() {
        return monthRevenue;
    }

    public void setMonthRevenue(
            double monthRevenue) {

        this.monthRevenue =
                monthRevenue;
    }

    public double getAverageRevenue() {
        return averageRevenue;
    }

    public void setAverageRevenue(
            double averageRevenue) {

        this.averageRevenue =
                averageRevenue;
    }

    public int getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(
            int completionPercentage) {

        this.completionPercentage =
                completionPercentage;
    }

    public int getSuccessScore() {
        return successScore;
    }

    public void setSuccessScore(
            int successScore) {

        this.successScore =
                successScore;
    }

    public String getBestMonth() {
        return bestMonth;
    }

    public void setBestMonth(
            String bestMonth) {

        this.bestMonth =
                bestMonth;
    }

    public double getBestMonthRevenue() {
        return bestMonthRevenue;
    }

    public void setBestMonthRevenue(double bestMonthRevenue) {
        this.bestMonthRevenue = bestMonthRevenue;
    }

    public List<RecentRequestDTO> getRecentRequests() {
        return recentRequests;
    }

    public void setRecentRequests(
            List<RecentRequestDTO> recentRequests) {

        this.recentRequests =
                recentRequests;
    }

}