/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.io.Serializable;
import java.util.Date;
import java.util.Map;
import javax.xml.bind.DatatypeConverter;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

/**
 *
 * @author Palacios
 */
@PropertySource("classpath:/application.properties")
@Component
public class JwtTokenUtil implements Serializable {

    private final Logger LOGGER = Logger.getLogger(this.getClass());
    private static final String CLAIM_KEY_CREATED = "created";

    @Value("${jwt.expiration}")
    private Long expiration;

    @Value("${jwt.signature}")
    private String signature;



    private String generateToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(generateExpirationDate())
                .signWith(SignatureAlgorithm.HS512, signature)
                .compact();
    }

    public String refreshToken(String token) {
        String refreshed = null;
        try {
            Claims claims = getClaims(token);
            claims.put(CLAIM_KEY_CREATED, new Date());
            refreshed = generateToken(claims);
        } catch (Exception e) {
        }
        return refreshed;
    }
    

    public boolean validate(String token) {
        return (getCreationDate(token) == null) ? false: isExpired(token);
    }
    
    public Authentication getAuthentication(String token) {
        return new UsernamePasswordAuthenticationToken(token, "", null);
    }

   

    public Date getCreationDate(String token) {
        Date created = null;
        try {
            Claims claims = getClaims(token);
            created = new Date((Long) claims.get(CLAIM_KEY_CREATED));
        } catch (Exception e) {
        }
        return created;
    }

    private Date getExpirationDate(String token) {
        Date dateExp = null;
        try {
            Claims claims = getClaims(token);
            dateExp = claims.getExpiration();
        } catch (Exception e) {
        }
        return dateExp;
    }

    private Claims getClaims(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(signature))
                    .parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException | MalformedJwtException | SignatureException | UnsupportedJwtException | IllegalArgumentException e) {
            LOGGER.error("getClaims(): " + e);
            claims = null;
        }
        return claims;
    }
    
    public boolean canRefresh(String token) {
        return !isExpired(token);
    }

    private boolean isExpired(String token) {
        final Date dateExp = getExpirationDate(token);
        if (dateExp == null) {
            return true;
        }
        return dateExp.before(new Date());
    }

    private Date generateExpirationDate() {
        return new Date(System.currentTimeMillis() + expiration);
    }

}
