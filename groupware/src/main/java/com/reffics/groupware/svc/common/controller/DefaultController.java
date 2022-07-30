package com.reffics.groupware.svc.common.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Slf4j
@RestController
public class DefaultController {

    @Resource
    private RedisTemplate<String,Object> redisTemplate;

    @GetMapping("/sessionTime")
    public long sessionTime(HttpSession session) {
        log.info("session id : {}", session.getId());
        log.info("redis : {}", redisTemplate.getExpire("spring:session:sessions:".concat(session.getId())));
        return session.getMaxInactiveInterval();
    }
}
