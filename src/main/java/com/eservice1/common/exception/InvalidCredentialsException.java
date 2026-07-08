package com.eservice1.common.exception;

public class InvalidCredentialsException
        extends RuntimeException {

    public InvalidCredentialsException(
            String message) {

        super(message);

    }

}