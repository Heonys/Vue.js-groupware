package com.reffics.groupware.config.exception.handler;

import com.reffics.groupware.config.exception.SystemException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@Order(0)
@RestControllerAdvice // 모든 컨트롤러에서 발생한 예외를 여기에서 처리  
public class RestControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(SystemException.class) // SystemException에 해당하는 예외처리를 얘가 하겠다. 
    public ResponseEntity<Object> systemExceptionHandler(SystemException e) {
    	
    	System.out.println("new HttpHeaders() : ");
    	System.out.println(new HttpHeaders());
    	
        log.error("SystemException : {}", e.getErrorCode());
        return new ResponseEntity<>(ApiResult.builder().errorCode(e.getErrorCode()).build(), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }
}
