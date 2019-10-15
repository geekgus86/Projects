/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.dto.escalation;

import java.math.BigInteger;
import java.util.Date;

/**
 *
 * @author alfredo.delangel02
 */
public class EscalationTypeDTO {
    
    private Long id;
    private String descEscalationType;
    private BigInteger organizationID;
    private Date createdAt;
    private Boolean  active;

    public EscalationTypeDTO() {
    }

    public EscalationTypeDTO(Long id, String descEscalationType, BigInteger organizationID, Boolean active) {
        this.id = id;
        this.descEscalationType = descEscalationType;
        this.organizationID = organizationID;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescEscalationType() {
        return descEscalationType;
    }

    public void setDescEscalationType(String descEscalationType) {
        this.descEscalationType = descEscalationType;
    }

    public BigInteger getOrganizationID() {
        return organizationID;
    }

    public void setOrganizationID(BigInteger organizationID) {
        this.organizationID = organizationID;
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
