package com.eservice1.common.util;

import com.eservice1.common.dto.PageResponseDTO;
import org.springframework.data.domain.Page;

public class PaginationMapper {

    public static <T> PageResponseDTO<T> toResponse(

            Page<T> page

    ) {

        PageResponseDTO<T> dto =
                new PageResponseDTO<>();

        dto.setContent(
                page.getContent()
        );

        dto.setPage(
                page.getNumber()
        );

        dto.setSize(
                page.getSize()
        );

        dto.setTotalElements(
                page.getTotalElements()
        );

        dto.setTotalPages(
                page.getTotalPages()
        );

        dto.setFirst(
                page.isFirst()
        );

        dto.setLast(
                page.isLast()
        );

        return dto;

    }

}