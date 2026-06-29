package com.eservice1.employee.dto;

import java.util.List;

public class EmployeeDashboardDTO {

    private EmployeeOfMonthDTO employeeOfMonth;

    private List<MonthlyRevenueDTO> monthlyRevenue;

    public EmployeeDashboardDTO() {
    }

    public EmployeeOfMonthDTO getEmployeeOfMonth() {
        return employeeOfMonth;
    }

    public void setEmployeeOfMonth(
            EmployeeOfMonthDTO employeeOfMonth
    ) {
        this.employeeOfMonth = employeeOfMonth;
    }

    public List<MonthlyRevenueDTO> getMonthlyRevenue() {
        return monthlyRevenue;
    }

    public void setMonthlyRevenue(
            List<MonthlyRevenueDTO> monthlyRevenue
    ) {
        this.monthlyRevenue = monthlyRevenue;
    }

}