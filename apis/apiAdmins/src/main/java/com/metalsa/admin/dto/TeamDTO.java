/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

/**
 *
 * @author azbel.trinidad
 */
public class TeamDTO {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long userId;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String name;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String email;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String tadi;
    private String username;
    private Long escalationTypeId;
    private String escalationTypeDesc;
    private Long escalationRuleId;
    private String escalationRuleDesc;
    private Long assetID;
    private String assetDesc;
    private Long issueTypeId;
    private String issueTypeDesc;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Long> assets;
    private boolean active;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getEscalationRuleId() {
        return escalationRuleId;
    }

    public void setEscalationRuleId(Long escalationRuleId) {
        this.escalationRuleId = escalationRuleId;
    }

    public String getEscalationRuleDesc() {
        return escalationRuleDesc;
    }

    public void setEscalationRuleDesc(String escalationRuleDesc) {
        this.escalationRuleDesc = escalationRuleDesc;
    }

    public Long getAssetID() {
        return assetID;
    }

    public void setAssetID(Long assetID) {
        this.assetID = assetID;
    }

    public String getAssetDesc() {
        return assetDesc;
    }

    public void setAssetDesc(String assetDesc) {
        this.assetDesc = assetDesc;
    }

    public Long getIssueTypeId() {
        return issueTypeId;
    }

    public void setIssueTypeId(Long issueTypeId) {
        this.issueTypeId = issueTypeId;
    }

    public String getIssueTypeDesc() {
        return issueTypeDesc;
    }

    public void setIssueTypeDesc(String issueTypeDesc) {
        this.issueTypeDesc = issueTypeDesc;
    }

    public List<Long> getAssets() {
        return assets;
    }

    public void setAssets(List<Long> assets) {
        this.assets = assets;
    }

    @Override
    public String toString() {
        return "TeamDTO{" + "id=" + id + ", userId=" + userId + ", name=" + name + ", email=" + email + ", tadi=" + tadi + ", escalationTypeId=" + escalationTypeId + ", escalationTypeDesc=" + escalationTypeDesc + ", escalationRuleId=" + escalationRuleId + ", escalationRuleDesc=" + escalationRuleDesc + ", assetID=" + assetID + ", assetDesc=" + assetDesc + '}';
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
    
    

}
