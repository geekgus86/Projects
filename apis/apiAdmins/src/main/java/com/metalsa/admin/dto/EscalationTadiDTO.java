/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.dto;

import java.util.List;

/**
 *
 * @author azbel.trinidad
 */
public class EscalationTadiDTO {
    
    private Long userId;
    private String name;
    private String email;
    private String tadi;
    List<TeamDTO> scalations;
    public String pushToken;

    public String getPushToken() {
        return pushToken;
    }

    public void setPushToken(String pushToken) {
        this.pushToken = pushToken;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTadi() {
        return tadi;
    }

    public void setTadi(String tadi) {
        this.tadi = tadi;
    }

    public List<TeamDTO> getScalations() {
        return scalations;
    }

    public void setScalations(List<TeamDTO> scalations) {
        this.scalations = scalations;
    }
    
    
}
