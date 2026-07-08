package com.eservice1.common.exception;

public class InvalidOperationException
        extends RuntimeException {

    public InvalidOperationException(String message) {
        super(message);
    }
}