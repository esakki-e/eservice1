package com.eservice1.employee.service;

import com.eservice1.employee.dto.EmployeeProfileDTO;
import com.eservice1.employee.dto.UpdateEmployeeProfileDTO;
import com.eservice1.employee.entity.Employee;
import com.eservice1.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import com.eservice1.user.entity.User;
import com.eservice1.user.repository.UserRepository;
import com.eservice1.common.Role;
import com.eservice1.employee.dto.EmployeePerformanceDTO;
import com.eservice1.employee.dto.RecentRequestDTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.eservice1.employee.repository.TaskRepository;
import com.eservice1.submission.repository.CustomerRequestRepository;
import java.time.Month;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.io.IOException;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    private final CustomerRequestRepository requestRepository;
    public EmployeeService(

            EmployeeRepository employeeRepository,

            UserRepository userRepository,

            TaskRepository taskRepository,

            CustomerRequestRepository requestRepository

    ) {

        this.employeeRepository =
                employeeRepository;

        this.userRepository =
                userRepository;

        this.taskRepository =
                taskRepository;

        this.requestRepository =
                requestRepository;

    }
    public EmployeeProfileDTO getMyProfile(
            String phoneNumber
    ) {

        Employee employee =
                employeeRepository
                        .findByPhoneNumber(phoneNumber);

        if (employee == null) {
            throw new RuntimeException("Employee not found");
        }

        EmployeeProfileDTO dto =
                new EmployeeProfileDTO();

        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setPhoneNumber(employee.getPhoneNumber());
        dto.setDob(employee.getDob());
        dto.setGender(employee.getGender());
        dto.setEmail(employee.getEmail());
        dto.setAddress(employee.getAddress());
        dto.setJoinedDate(employee.getJoinedDate());
        dto.setProfileImage(employee.getProfileImage());
        dto.setActive(employee.getActive());

        return dto;
    }

    public EmployeeProfileDTO updateMyProfile(
            String phoneNumber,
            UpdateEmployeeProfileDTO request
    ) {

        Employee employee =
                employeeRepository
                        .findByPhoneNumber(phoneNumber);

        if (employee == null) {
            throw new RuntimeException("Employee not found");
        }

        employee.setName(request.getName());
        employee.setDob(request.getDob());
        employee.setGender(request.getGender());
        employee.setEmail(request.getEmail());
        employee.setAddress(request.getAddress());

        employeeRepository.save(employee);

        User user =
                userRepository
                        .findByPhoneNumber(phoneNumber)
                        .orElseThrow();

        user.setName(request.getName());

        userRepository.save(user);

        EmployeeProfileDTO dto =
                new EmployeeProfileDTO();

        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setPhoneNumber(employee.getPhoneNumber());
        dto.setDob(employee.getDob());
        dto.setGender(employee.getGender());
        dto.setEmail(employee.getEmail());
        dto.setAddress(employee.getAddress());
        dto.setJoinedDate(employee.getJoinedDate());
        dto.setProfileImage(employee.getProfileImage());
        dto.setActive(employee.getActive());

        return dto;
    }
    public String uploadProfileImage(
            String phoneNumber,
            MultipartFile file
    ) throws IOException {

        Employee employee =
                employeeRepository.findByPhoneNumber(phoneNumber);

        if (employee == null) {
            throw new RuntimeException("Employee not found");
        }

        if (file.isEmpty()) {
            throw new RuntimeException("Please select an image");
        }

        String uploadDir = "uploads/employees/";

        Files.createDirectories(
                Paths.get(uploadDir)
        );

        String fileName =
                employee.getId() + "_" + file.getOriginalFilename();

        Path filePath =
                Paths.get(uploadDir, fileName);

        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
        );

        employee.setProfileImage(fileName);

        employeeRepository.save(employee);

        return fileName;
    }

    public Employee promoteUser(
            Long userId) {

        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow();

        if (user.getRole() ==
                Role.EMPLOYEE) {

            throw new RuntimeException(
                    "Already an employee"
            );
        }

        user.setRole(
                Role.EMPLOYEE
        );

        userRepository.save(user);
        Employee existing =
                employeeRepository
                        .findByPhoneNumber(
                                user.getPhoneNumber()
                        );

        if (existing != null) {

            throw new RuntimeException(
                    "Employee already exists"
            );
        }

        Employee employee =
                new Employee();

        employee.setName(
                user.getName()
        );

        employee.setPhoneNumber(
                user.getPhoneNumber()
        );

        employee.setActive(true);

        return employeeRepository
                .save(employee);
    }
    public Employee save(Employee employee) {

        employee.setActive(true);

        Employee savedEmployee =
                employeeRepository.save(employee);

        User user = new User();

        user.setName(
                employee.getName()
        );

        user.setPhoneNumber(
                employee.getPhoneNumber()
        );

        user.setPassword(
                employee.getPassword()
        );

        user.setRole(
                Role.EMPLOYEE
        );

        userRepository.save(user);

        return savedEmployee;
    }
    public EmployeePerformanceDTO
    getEmployeePerformance(
            Long employeeId
    ) {
        System.out.println("Employee Performance API called");


        Employee employee =
                employeeRepository
                        .findById(employeeId)
                        .orElseThrow();

        EmployeePerformanceDTO dto =
                new EmployeePerformanceDTO();

        Map<Month, Double> monthlyRevenue = new HashMap<>();

        taskRepository.findByEmployeeId(employeeId).forEach(task -> {

            if (task.getRequest().getPaymentStatus() ==
                    com.eservice1.submission.entity.PaymentStatus.PAID) {

                Month month =
                        task.getRequest()
                                .getCreatedAt()
                                .getMonth();

                double amount =
                        task.getRequest().getAmount() == null
                                ? 0
                                : task.getRequest().getAmount();

                monthlyRevenue.put(
                        month,
                        monthlyRevenue.getOrDefault(month, 0.0) + amount
                );
            }

        });

        Month bestMonth = null;
        double bestRevenue = 0;

        for (Map.Entry<Month, Double> entry : monthlyRevenue.entrySet()) {

            if (entry.getValue() > bestRevenue) {

                bestRevenue = entry.getValue();
                bestMonth = entry.getKey();

            }

        }

        dto.setBestMonth(
                bestMonth == null
                        ? "-"
                        : bestMonth.name()
        );

        dto.setBestMonthRevenue(bestRevenue);

        dto.setId(employee.getId());

        dto.setName(
                employee.getName()
        );

        dto.setPhoneNumber(
                employee.getPhoneNumber()
        );

        dto.setActive(
                employee.getActive()
        );

        dto.setAssignedTasks(

                taskRepository.countByEmployeeId(
                        employeeId
                )

        );

        dto.setCompletedTasks(

                taskRepository.countByEmployeeIdAndStatus(
                        employeeId,
                        com.eservice1.employee.entity.TaskStatus.COMPLETED
                )

        );

        dto.setPendingTasks(

                taskRepository.countByEmployeeIdAndStatus(
                        employeeId,
                        com.eservice1.employee.entity.TaskStatus.PENDING
                )

        );

        dto.setInProgressTasks(

                taskRepository.countByEmployeeIdAndStatus(
                        employeeId,
                        com.eservice1.employee.entity.TaskStatus.IN_PROGRESS
                )

        );

        LocalDate today =
                LocalDate.now();

        LocalDateTime start =
                today
                        .withDayOfMonth(1)
                        .atStartOfDay();

        LocalDateTime end =
                start.plusMonths(1);

        dto.setThisMonthRequests(

                taskRepository.getMonthlyRequests(

                        employeeId,

                        start,

                        end

                )

        );

        Double revenue =
                taskRepository.getTotalRevenue(
                        employeeId
                );

        if (revenue == null) {
            revenue = 0.0;
        }

        dto.setTotalRevenue(
                revenue
        );

        Double monthRevenue =
                taskRepository.getMonthlyRevenue(

                        employeeId,

                        start,

                        end

                );

        if (monthRevenue == null) {
            monthRevenue = 0.0;
        }

        dto.setMonthRevenue(
                monthRevenue
        );

        dto.setPaidRequests(

                taskRepository.getPaidRequests(
                        employeeId
                )

        );

        if (dto.getCompletedTasks() == 0) {

            dto.setAverageRevenue(0);

        } else {

            dto.setAverageRevenue(

                    dto.getTotalRevenue()

                            /

                            dto.getCompletedTasks()

            );

        }

        if (dto.getAssignedTasks() == 0) {

            dto.setCompletionPercentage(0);

        } else {

            dto.setCompletionPercentage(

                    (int)

                            (

                                    dto.getCompletedTasks()

                                            * 100

                                            /

                                            dto.getAssignedTasks()

                            )

            );

        }

        dto.setSuccessScore(

                dto.getCompletionPercentage()

        );


        List<RecentRequestDTO> recent =
                new ArrayList<>();

        taskRepository
                .findByEmployeeIdOrderByIdDesc(
                        employeeId
                )
                .stream()
                .limit(10)
                .forEach(task -> {

                    RecentRequestDTO r =
                            new RecentRequestDTO();

                    r.setId(
                            task.getRequest().getId()
                    );

                    r.setCustomerName(
                            task.getRequest()
                                    .getCustomerName()
                    );

                    r.setServiceName(
                            task.getRequest()
                                    .getService()
                                    .getServiceName()
                    );

                    r.setAmount(
                            task.getRequest()
                                    .getAmount()
                    );

                    if (task.getRequest().getPaymentStatus() != null) {

                        r.setPaymentStatus(
                                task.getRequest()
                                        .getPaymentStatus()
                                        .name()
                        );

                    } else {

                        r.setPaymentStatus(
                                "UNPAID"
                        );

                    }

                    r.setStatus(
                            task.getStatus()
                                    .name()
                    );

                    recent.add(r);

                });

        dto.setRecentRequests(
                recent
        );

        return dto;

    }
}