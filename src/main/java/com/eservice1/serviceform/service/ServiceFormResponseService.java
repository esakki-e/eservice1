package com.eservice1.serviceform.service;

import com.eservice1.serviceform.dto.ServiceFormResponseDTO;
import com.eservice1.serviceform.entity.ServiceFormResponse;
import com.eservice1.serviceform.repository.ServiceFormResponseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

import com.eservice1.serviceform.dto.ServiceFormResponseViewDTO;
import com.eservice1.serviceform.entity.ServiceFormField;

import com.eservice1.serviceform.repository.ServiceFormFieldRepository;
@Service
public class ServiceFormResponseService {

    private final ServiceFormResponseRepository repository;
    private final ServiceFormFieldRepository
            fieldRepository;

    public ServiceFormResponseService(
            ServiceFormResponseRepository repository,
            ServiceFormFieldRepository fieldRepository
    ) {

        this.repository = repository;

        this.fieldRepository = fieldRepository;
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
    public List<ServiceFormResponseViewDTO>
    getResponseDetails(
            Long requestId
    ) {

        List<ServiceFormResponse> responses =
                repository.findByRequestId(
                        requestId
                );

        List<ServiceFormResponseViewDTO> result =
                new ArrayList<>();

        for (
                ServiceFormResponse response
                : responses
        ) {

            ServiceFormField field =
                    fieldRepository.findById(
                            response.getFieldId()
                    ).orElse(null);

            if (field != null) {

                result.add(

                        new ServiceFormResponseViewDTO(

                                field.getFieldName(),

                                response.getValue()

                        )

                );
            }
        }

        return result;
    }
}