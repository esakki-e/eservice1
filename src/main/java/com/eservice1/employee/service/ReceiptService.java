package com.eservice1.employee.service;

import com.eservice1.employee.entity.Receipt;
import com.eservice1.employee.entity.Task;
import com.eservice1.employee.repository.ReceiptRepository;
import com.eservice1.employee.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;
    private final TaskRepository taskRepository;

    public ReceiptService(
            ReceiptRepository receiptRepository,
            TaskRepository taskRepository) {

        this.receiptRepository = receiptRepository;
        this.taskRepository = taskRepository;
    }

    public Receipt uploadReceipt(
            Long taskId,
            MultipartFile file)
            throws IOException {

        Task task =
                taskRepository.findById(taskId)
                        .orElseThrow();

        String uploadDir =
                System.getProperty("user.dir")
                        + File.separator
                        + "receipts"
                        + File.separator;

        File directory = new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName =
                file.getOriginalFilename();

        String filePath =
                uploadDir + fileName;

        file.transferTo(new File(filePath));

        Receipt receipt = new Receipt();

        receipt.setTask(task);
        receipt.setFileName(fileName);
        receipt.setFilePath(filePath);

        return receiptRepository.save(receipt);
    }
}