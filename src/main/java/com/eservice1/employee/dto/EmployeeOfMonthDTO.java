package com.eservice1.employee.dto;

public class EmployeeOfMonthDTO {

    private Long id;

    private String name;

    private String phoneNumber;

    private String profileImage;

    private Double revenue;

    private Long completedTasks;

    private Integer completionPercentage;

    private String message;

    public EmployeeOfMonthDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(
            String name
    ) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(
            String phoneNumber
    ) {
        this.phoneNumber = phoneNumber;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(
            String profileImage
    ) {
        this.profileImage = profileImage;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(
            Double revenue
    ) {
        this.revenue = revenue;
    }

    public Long getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(
            Long completedTasks
    ) {
        this.completedTasks = completedTasks;
    }

    public Integer getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(
            Integer completionPercentage
    ) {
        this.completionPercentage = completionPercentage;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(
            String message
    ) {
        this.message = message;
    }

}