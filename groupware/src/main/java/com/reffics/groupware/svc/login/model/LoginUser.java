package com.reffics.groupware.svc.login.model;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "LoginUser", description = "사용사 조회 결과")
@Data
public class LoginUser {

    @ApiModelProperty(value = "사용자 아이디")
    private String userId;

    @ApiModelProperty(value = "사용자 이름")
    private String userNm;

    @ApiModelProperty(value = "암호화된 패스워드")
    private String encPassword;

    @ApiModelProperty(value = "패스워드 오류 횟수")
    private int errorPasswordCount;

    @ApiModelProperty(value = "연락처")
    private String hpNo;

    @ApiModelProperty(value = "입사일")
    private String enterDate;

    @ApiModelProperty(value = "생년월일")
    private String birthDate;

    @ApiModelProperty(value = "우편번호")
    private String zipNo;

    @ApiModelProperty(value = "주소")
    private String address;

    @ApiModelProperty(value = "상세 주소")
    private String addressDetail;

    @ApiModelProperty(value = "사용 유무")
    private String useYn;


}
