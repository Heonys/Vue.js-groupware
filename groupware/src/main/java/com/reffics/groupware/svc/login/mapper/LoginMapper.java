package com.reffics.groupware.svc.login.mapper;

import com.reffics.groupware.svc.login.model.LoginParam;
import com.reffics.groupware.svc.login.model.LoginUser;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    LoginUser selectLoginUser(LoginParam loginParam);
}
