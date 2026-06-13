package com.eservice1.user.dto;

public class AuthResponse {

    private String token;
    private String role;
    private Long employeeId;

    public AuthResponse() {
    }

    public AuthResponse(
            String token,
            String role,
            Long employeeId) {

        this.token = token;
        this.role = role;
        this.employeeId = employeeId;
    }
    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}