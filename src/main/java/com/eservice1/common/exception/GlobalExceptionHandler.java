package com.eservice1.common.exception;

import com.eservice1.common.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccountLockedException.class)
    public ResponseEntity<ErrorResponse> handleLocked(

            AccountLockedException ex

    ) {

        ErrorResponse error =

                new ErrorResponse(

                        LocalDateTime.now(),

                        HttpStatus.TOO_MANY_REQUESTS.value(),

                        "Too Many Requests",

                        ex.getMessage()

                );

        return ResponseEntity

                .status(HttpStatus.TOO_MANY_REQUESTS)

                .body(error);

    }@ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleInvalidCredentials(

            InvalidCredentialsException ex

    ) {

        ErrorResponse error =

                new ErrorResponse(

                        LocalDateTime.now(),

                        HttpStatus.UNAUTHORIZED.value(),

                        "Unauthorized",

                        ex.getMessage()

                );

        return ResponseEntity

                .status(HttpStatus.UNAUTHORIZED)

                .body(error);
    }@ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse>
    handleNotFound(

                    ResourceNotFoundException ex

            ) {

        ErrorResponse error =

                new ErrorResponse(

                        LocalDateTime.now(),

                        HttpStatus.NOT_FOUND.value(),

                        "Not Found",

                        ex.getMessage()

                );

        return ResponseEntity

                .status(HttpStatus.NOT_FOUND)

                .body(error);

    }
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<String> handleDuplicateResource(
            DuplicateResourceException ex) {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ex.getMessage());
    }
    @ExceptionHandler(InvalidOperationException.class)
    public ResponseEntity<String> handleInvalidOperation(
            InvalidOperationException ex) {

        return ResponseEntity
                .badRequest()
                .body(ex.getMessage());
    }

}