/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.security;

import com.metalsa.kpi.util.JwtTokenUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

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
