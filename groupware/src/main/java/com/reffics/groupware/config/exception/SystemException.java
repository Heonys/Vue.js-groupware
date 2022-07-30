package com.reffics.groupware.config.exception;

public class SystemException extends RuntimeException {

    private final String errorCode;

    public SystemException(String errorCode) {
        super(errorCode);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
