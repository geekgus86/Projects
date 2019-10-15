/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.dto.escalation;

import java.util.Date;

/**
 *
 * @author alfredo.delangel02
 */
public class EscalationRuleDTO {
    
    private Long id;
    private Integer levelEscalation;
    private Integer limitEscalation;
    private String descEscalationRule;
    private String color;
    private Date createdAt;
    private Boolean  active;
    private Long escalationTypeId;
    private String escalationTypeDesc;

    public EscalationRuleDTO() {
    }

    public EscalationRuleDTO(Long id, Integer levelEscalation, Integer limitEscalation, String descEscalationRule, String color, Date createdAt, Boolean active, Long escalationTypeId, String escalationTypeDesc) {
        this.id = id;
        this.levelEscalation = levelEscalation;
        this.limitEscalation = limitEscalation;
        this.descEscalationRule = descEscalationRule;
        this.color = color;
        this.createdAt = createdAt;
        this.active = active;
        this.escalationTypeId = escalationTypeId;
        this.escalationTypeDesc = escalationTypeDesc;
    }

    public Long getEscalationTypeId() {
        return escalationTypeId;
    }

    public void setEscalationTypeId(Long escalationTypeId) {
        this.escalationTypeId = escalationTypeId;
    }

    public String getEscalationTypeDesc() {
        return escalationTypeDesc;
    }

    public void setEscalationTypeDesc(String escalationTypeDesc) {
        this.escalationTypeDesc = escalationTypeDesc;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLevelEscalation() {
        return levelEscalation;
    }

    public void setLevelEscalation(Integer levelEscalation) {
        this.levelEscalation = levelEscalation;
    }

    public Integer getLimitEscalation() {
        return limitEscalation;
    }

    public void setLimitEscalation(Integer limitEscalation) {
        this.limitEscalation = limitEscalation;
    }

    public String getDescEscalationRule() {
        return descEscalationRule;
    }

    public void setDescEscalationRule(String descEscalationRule) {
        this.descEscalationRule = descEscalationRule;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
    
}



