package com.reffics.groupware.svc.menu.controller;

import com.reffics.groupware.config.QueryToObject;
import com.reffics.groupware.svc.menu.model.UserMenuParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
public class MenuController {

    @GetMapping(value = "/menu/user/menu-list")
    public ResponseEntity<Object> selectUSerMenuList(@QueryToObject UserMenuParam param, HttpServletRequest request) {
        log.debug("UserMenuParam: {}", param);
        return ResponseEntity.ok(null);
    }
}
