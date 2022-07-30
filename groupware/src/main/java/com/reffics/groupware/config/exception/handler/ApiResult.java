package com.reffics.groupware.config.exception.handler;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResult {

    private String errorCode;
}
