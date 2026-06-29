package com.eservice1.employee.dto;

public class MonthlyRevenueDTO {

    private String month;
    private Double revenue;

    public MonthlyRevenueDTO() {
    }

    public MonthlyRevenueDTO(
            String month,
            Number revenue
    ) {
        this.month = month;
        this.revenue = revenue == null ? 0.0 : revenue.doubleValue();
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }

}