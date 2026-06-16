package com.eservice1.serviceform.service;

import com.eservice1.serviceform.dto.ServiceFormResponseDTO;
import com.eservice1.serviceform.entity.ServiceFormResponse;
import com.eservice1.serviceform.repository.ServiceFormResponseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceFormResponseService {

    private final ServiceFormResponseRepository repository;

    public ServiceFormResponseService(
            ServiceFormResponseRepository repository
    ) {
        this.repository = repository;
    }

    public void saveResponses(
            List<ServiceFormResponseDTO> responses
    ) {

        for (ServiceFormResponseDTO dto : responses) {

            ServiceFormResponse existing =
                    repository.findByRequestIdAndFieldId(
                            dto.getRequestId(),
                            dto.getFieldId()
                    );

            if (existing != null) {

                existing.setValue(
                        dto.getValue()
                );

                repository.save(existing);

            } else {

                ServiceFormResponse response =
                        new ServiceFormResponse();

                response.setRequestId(
                        dto.getRequestId()
                );

                response.setFieldId(
                        dto.getFieldId()
                );

                response.setValue(
                        dto.getValue()
                );

                repository.save(response);
            }
        }
    }

    public List<ServiceFormResponse>
    getResponses(Long requestId) {

        return repository.findByRequestId(
                requestId
        );
    }
}