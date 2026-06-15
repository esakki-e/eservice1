package com.eservice1.employee.dto;

public class EmployeeDTO {

    private Long id;
    private String name;
    private String phoneNumber;
    private Boolean active;
    private Long taskCount;
    private Long completedTasks;

    public EmployeeDTO() {
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

    public void setName(
            String name) {

        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(
            String phoneNumber) {

        this.phoneNumber =
                phoneNumber;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(
            Boolean active) {

        this.active = active;
    }

    public Long getTaskCount() {
        return taskCount;
    }

    public void setTaskCount(
            Long taskCount) {

        this.taskCount =
                taskCount;
    }
    public Long getCompletedTasks() {
        return completedTasks;
    }
    public void setCompletedTasks(
            Long completedTasks) {

        this.completedTasks =
                completedTasks;
    }
}