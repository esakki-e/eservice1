package com.eservice1.employee.dto;

public class MonthlyCompletedDTO {

    private String month;

    private Long completed;

    public MonthlyCompletedDTO() {
    }
    public MonthlyCompletedDTO(
            String month,
            Number completed
    ) {
        this.month = month;
        this.completed = completed == null ? 0L : completed.longValue();
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(
            String month
    ) {
        this.month = month;
    }

    public Long getCompleted() {
        return completed;
    }

    public void setCompleted(
            Long completed
    ) {
        this.completed = completed;
    }

}