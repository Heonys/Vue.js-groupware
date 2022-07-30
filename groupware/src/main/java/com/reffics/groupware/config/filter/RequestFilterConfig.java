package com.reffics.groupware.config.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@ConditionalOnExpression("${reffics.api.logging.enable:true}")
public class RequestFilterConfig {

    @Bean
    public FilterRegistrationBean<RequestFilter> loggingFilter() {
        FilterRegistrationBean<RequestFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new RequestFilter());
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }
}
