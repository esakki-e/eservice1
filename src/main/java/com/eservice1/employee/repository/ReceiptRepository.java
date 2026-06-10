package com.eservice1.employee.repository;

import com.eservice1.employee.entity.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiptRepository
        extends JpaRepository<Receipt, Long> {
}