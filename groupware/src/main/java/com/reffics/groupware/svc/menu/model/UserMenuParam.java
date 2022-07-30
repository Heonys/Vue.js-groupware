package com.reffics.groupware.svc.menu.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "UserMenuParam", description = "사용자별 메뉴 조회 파라미터")
@Data
public class UserMenuParam {

    @ApiModelProperty(value = "사용자 아이디")
    private String userId;


    @ApiModelProperty(value = "메뉴 아이디")
    private String menuId;
}
