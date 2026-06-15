package com.eservice1.employee.repository;

import com.eservice1.employee.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import com.eservice1.employee.entity.TaskStatus;
import java.util.List;

public interface TaskRepository
        extends JpaRepository<Task, Long> {

    List<Task> findByEmployeeId(Long employeeId);

    Task findByRequestId(Long requestId);

    long countByEmployeeId(
            Long employeeId
    );
    long countByEmployeeIdAndStatus(
            Long employeeId,
            TaskStatus status
    );
}