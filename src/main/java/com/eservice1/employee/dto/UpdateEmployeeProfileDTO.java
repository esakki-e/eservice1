package com.eservice1.employee.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class UpdateEmployeeProfileDTO {

    @Size(
            max = 100,
            message = "Name cannot exceed 100 characters."
    )
    private String name;

    @Past(
            message = "Date of birth must be in the past."
    )
    private LocalDate dob;

    @Pattern(
            regexp = "^(Male|Female|Other)?$",
            message = "Gender must be Male, Female or Other."
    )
    private String gender;

    @Email(
            message = "Enter a valid email address."
    )
    private String email;

    @Size(
            max = 255,
            message = "Address cannot exceed 255 characters."
    )
    private String address;

    public UpdateEmployeeProfileDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}