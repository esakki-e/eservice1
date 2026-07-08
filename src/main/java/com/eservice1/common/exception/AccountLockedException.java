package com.eservice1.common.exception;

public class AccountLockedException
        extends RuntimeException {

    public AccountLockedException(
            String message) {

        super(message);

    }
}