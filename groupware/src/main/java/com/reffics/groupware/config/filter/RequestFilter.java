package com.reffics.groupware.config.filter;


import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class RequestFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        try {
            HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
            HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;

            Map<String,String> requestMap = this.getTypeSafeRequestMap(httpServletRequest);

            BufferedRequestWrapper bufferedRequestWrapper = new BufferedRequestWrapper(httpServletRequest);
            BufferedResponseWrapper bufferedResponseWrapper = new BufferedResponseWrapper(httpServletResponse);

            log.info("========== Request Start ========");
            log.info("Method: {}", httpServletRequest.getMethod());
            log.info("Request Uri : {}", httpServletRequest.getRequestURI());
            log.info("Parameter : {}", requestMap);

            try {
                filterChain.doFilter(bufferedRequestWrapper, bufferedResponseWrapper);
            } finally {
                log.info("========== Request End ========");
            }

        } catch (Throwable e) {
            log.error(e.getMessage());
        }
    }

    private Map<String,String> getTypeSafeRequestMap(HttpServletRequest request) {
        Map<String,String> typeSafeRequestMap = new HashMap<>();
        Enumeration<String> requestParamNames = request.getParameterNames();
        while(requestParamNames.hasMoreElements()) {
            String requestParamName = requestParamNames.nextElement();
            String requestParamValue = request.getParameter(requestParamName);
            typeSafeRequestMap.put(requestParamName, requestParamValue);
        }
        return typeSafeRequestMap;
    }

    private static final class BufferedRequestWrapper extends HttpServletRequestWrapper {

        private ByteArrayInputStream byteArrayInputStream = null;
        private ByteArrayOutputStream byteArrayOutputStream = null;


        public BufferedRequestWrapper(HttpServletRequest request) {
            super(request);
        }
    }

    private static final class BufferedResponseWrapper extends HttpServletResponseWrapper {

        public BufferedResponseWrapper(HttpServletResponse response) {
            super(response);
        }
    }
}
