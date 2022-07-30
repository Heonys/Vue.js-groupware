package com.reffics.groupware.svc.login.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "LoginParams", description = "로그인 파라미터")
public class LoginParam {

    @ApiModelProperty(value = "로그인 아이디", required = true)
    private String loginId;

    @ApiModelProperty(value = "로그인 패스워드", required = true, notes = "SHA256으로 암호화된 값 전송")
    private String loginPw;
}
