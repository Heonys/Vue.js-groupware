package com.reffics.groupware.svc.menu.mapper;

import com.reffics.groupware.svc.menu.model.UserMenuParam;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MenuMapper {

    void selectUserMenuList(UserMenuParam param);
}
