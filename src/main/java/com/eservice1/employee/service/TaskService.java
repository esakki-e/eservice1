package com.eservice1.employee.service;

import com.eservice1.employee.entity.Employee;
import com.eservice1.employee.entity.Priority;
import com.eservice1.employee.entity.Task;
import com.eservice1.employee.entity.TaskStatus;
import com.eservice1.employee.repository.EmployeeRepository;
import com.eservice1.employee.repository.TaskRepository;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final EmployeeRepository employeeRepository;

    public Task selfAssign(
            Long requestId,
            String phoneNumber) {

        Task task =
                taskRepository.findByRequestId(
                        requestId
                );

        Employee employee =
                employeeRepository
                        .findByPhoneNumber(
                                phoneNumber
                        );

        if (task.getEmployee() != null) {
            throw new RuntimeException(
                    "Already assigned"
            );
        }

        task.setEmployee(employee);
        task.setStatus(TaskStatus.ACCEPTED);
        return taskRepository.save(task);
    }
    public Task createTask(Task task) {

        task.setStatus(TaskStatus.PENDING);

        return taskRepository.save(task);
    }

    public TaskService(
            TaskRepository taskRepository,
            EmployeeRepository employeeRepository) {

        this.taskRepository = taskRepository;
        this.employeeRepository = employeeRepository;
    }
    public List<Task> getAllTasks() {

        return taskRepository.findAll();
    }
    public List<Task> getTasks(Long employeeId) {

        return taskRepository.findByEmployeeId(employeeId);
    }

    public Task acceptTask(Long taskId) {

        Task task =
                taskRepository.findById(taskId)
                        .orElseThrow();

        task.setStatus(TaskStatus.ACCEPTED);

        return taskRepository.save(task);
    }

    public Task updatePriority(
            Long taskId,
            Priority priority) {

        Task task =
                taskRepository.findById(taskId)
                        .orElseThrow();

        task.setPriority(priority);

        return taskRepository.save(task);
    }

    public Task assignEmployee(
            Long requestId,
            Long employeeId) {

        Task task =
                taskRepository.findByRequestId(
                        requestId
                );

        Employee employee =
                employeeRepository.findById(employeeId)
                        .orElseThrow();

        if (task.getEmployee() != null) {
            throw new RuntimeException(
                    "Already assigned"
            );
        }

        task.setEmployee(employee);

        return taskRepository.save(task);
    }

    public Task completeTask(Long taskId) {

        Task task =
                taskRepository.findById(taskId)
                        .orElseThrow();

        task.setStatus(TaskStatus.COMPLETED);

        return taskRepository.save(task);
    }

}