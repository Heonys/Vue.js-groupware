package com.reffics.groupware.svc.login.service;

import com.reffics.groupware.config.exception.ExceptionCode;
import com.reffics.groupware.config.exception.SystemException;
import com.reffics.groupware.svc.login.mapper.LoginMapper;
import com.reffics.groupware.svc.login.model.LoginParam;
import com.reffics.groupware.svc.login.model.LoginUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Slf4j
@Service
public class LoginServiceImpl implements LoginService {

    @Resource
    private LoginMapper loginMapper;

    @Override
    public LoginUser selectLoginUser(LoginParam param) {
    	
    	// 사용자가 입력한 ID로 DB에서 select한다.  
        LoginUser loginUser = this.loginMapper.selectLoginUser(param);

        if(loginUser == null) {
            throw new SystemException(ExceptionCode.LOGIN_USER_NOT_FOUND);
        }

        if(loginUser.getUseYn().equals("N")) {
            throw new SystemException(ExceptionCode.LOGIN_NOT_USE);
        }

        if(loginUser.getErrorPasswordCount() >= 5) {
            throw new SystemException(ExceptionCode.LOGIN_ERROR_PASSWORD_COUNT);
        }

        if(!loginUser.getEncPassword().equals(param.getLoginPw())) {
            throw new SystemException(ExceptionCode.LOGIN_PASSWORD_ERROR);
        }

        return loginUser;
    }
}
