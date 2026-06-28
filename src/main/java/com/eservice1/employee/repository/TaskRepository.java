package com.eservice1.employee.repository;

import com.eservice1.employee.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import com.eservice1.employee.entity.TaskStatus;
import java.util.List;
import com.eservice1.employee.entity.Employee;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
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
    List<Task> findByEmployeeIdOrderByIdDesc(
            Long employeeId
    );



    @Query("""
SELECT COALESCE(SUM(t.request.amount),0)
FROM Task t
WHERE t.employee.id=:employeeId
AND t.request.paymentStatus=
com.eservice1.submission.entity.PaymentStatus.PAID
""")
    Double getTotalRevenue(
            @Param("employeeId")
            Long employeeId
    );

    @Query("""
SELECT COUNT(t)
FROM Task t
WHERE t.employee.id=:employeeId
AND t.request.paymentStatus=
com.eservice1.submission.entity.PaymentStatus.PAID
""")
    long getPaidRequests(
            @Param("employeeId")
            Long employeeId
    );

    @Query("""
SELECT COALESCE(SUM(t.request.amount),0)
FROM Task t
WHERE t.employee.id=:employeeId
AND t.request.paymentStatus=
com.eservice1.submission.entity.PaymentStatus.PAID
AND t.request.createdAt>=:start
AND t.request.createdAt<:end
""")
    Double getMonthlyRevenue(

            @Param("employeeId")
            Long employeeId,

            @Param("start")
            LocalDateTime start,

            @Param("end")
            LocalDateTime end

    );

    @Query("""
SELECT COUNT(t)
FROM Task t
WHERE t.employee.id=:employeeId
AND t.request.createdAt>=:start
AND t.request.createdAt<:end
""")
    long getMonthlyRequests(

            @Param("employeeId")
            Long employeeId,

            @Param("start")
            LocalDateTime start,

            @Param("end")
            LocalDateTime end

    );
}