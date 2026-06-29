package com.eservice1.employee.repository;

import com.eservice1.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Employee findByPhoneNumber(
            String phoneNumber
    );

    @Query("""
SELECT t.employee

FROM Task t

WHERE t.request.paymentStatus =
com.eservice1.submission.entity.PaymentStatus.PAID

AND YEAR(t.request.createdAt)=YEAR(CURRENT_DATE)

AND MONTH(t.request.createdAt)=MONTH(CURRENT_DATE)

GROUP BY t.employee

ORDER BY SUM(t.request.amount) DESC
""")
    List<Employee> getEmployeeRanking();

}