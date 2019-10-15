/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.security;

import com.metalsa.admin.util.JwtTokenUtil;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.apache.log4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 *
 * @author Palacios
 */
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    

    
    private final Logger LOGGER = Logger.getLogger(this.getClass());
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        try {
            MDC.put("ip", request.getRemoteAddr());
        } catch (Exception e) {        }
        LOGGER.info("REQUEST_INFO: ");
        LOGGER.info(request.getRequestURI());
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtTokenUtil.validate(token)) {
                SecurityContextHolder.getContext().setAuthentication(jwtTokenUtil.getAuthentication(token));
            }
        }
        chain.doFilter(request, response);
        
    }
    
}
