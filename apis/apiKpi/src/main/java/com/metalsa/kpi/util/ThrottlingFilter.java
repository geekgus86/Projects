/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.util;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import java.io.IOException;
import java.time.Duration;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 *
 * @author Palacios
 */
public class ThrottlingFilter  extends OncePerRequestFilter {

    @Value("${bucket4j.overdraft}")
    private long overdraft;

    @Value("${bucket4j.tokens}")
    private long tokens;

    private Bucket createNewBucket() {
        Refill refill = Refill.greedy(tokens, Duration.ofSeconds(1));
        Bandwidth limit = Bandwidth.classic(overdraft, refill);
        return Bucket4j.builder().addLimit(limit).build();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        HttpSession session = request.getSession(true);

        String appKey = "admin";
        Bucket bucket = (Bucket) session.getAttribute("throttler-" + appKey);
        if (bucket == null) {
            bucket = createNewBucket();
            session.setAttribute("throttler-" + appKey, bucket);
        }
        System.out.println("ThrottlingFilter: " + bucket.toString());

        if (bucket.tryConsume(1)) {
            chain.doFilter(request, response);
        } else {
            response.setContentType("text/plain");
            response.setStatus(429);
            response.getWriter().append("Too many requests");
        }
    }

}
