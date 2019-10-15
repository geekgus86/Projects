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
public class ValidateTadiDTO {
    
    private String tadi;
    private Long issueTypeId;
    private Long escalationRuleId;
    private String asset;
    private List<Long> escalationRules;


    public String getAsset() {
        return asset;
    }

    public void setAsset(String asset) {
        this.asset = asset;
    }

    public String getTadi() {
        return tadi;
    }

    public void setTadi(String tadi) {
        this.tadi = tadi;
    }

    public Long getIssueTypeId() {
        return issueTypeId;
    }

    public void setIssueTypeId(Long issueTypeId) {
        this.issueTypeId = issueTypeId;
    }

    public Long getEscalationRuleId() {
        return escalationRuleId;
    }

    public void setEscalationRuleId(Long escalationRuleId) {
        this.escalationRuleId = escalationRuleId;
    }
    
    public List<Long> getEscalationRules() {
        return escalationRules;
    }

    public void setEscalationRules(List<Long> escalationRules) {
        this.escalationRules = escalationRules;
    }
    
}
