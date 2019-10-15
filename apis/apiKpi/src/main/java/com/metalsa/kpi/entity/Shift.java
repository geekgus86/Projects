/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author palacios
 */
@Entity
@Table(name = "Shift", schema = "admin")
public class Shift implements Serializable {
    
    @Column
    @Id
    private Integer id;
    @Column
    private String description;
    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date startAt;
    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date endAt;
    @Column
    private String created_at;
    @Column
    private String updated_at;
    @Column
    private String groupID;
    @Column
    private String shiftTypeId;
    @Column
    private String organizationSchemaId;
    @Column
    private String level;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartAt() {
        return startAt;
    }

    public void setStartAt(Date startAt) {
        this.startAt = startAt;
    }

    public Date getEndAt() {
        return endAt;
    }

    public void setEndAt(Date endAt) {
        this.endAt = endAt;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public String getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(String updated_at) {
        this.updated_at = updated_at;
    }

    public String getGroupID() {
        return groupID;
    }

    public void setGroupID(String groupID) {
        this.groupID = groupID;
    }

    public String getShiftTypeId() {
        return shiftTypeId;
    }

    public void setShiftTypeId(String shiftTypeId) {
        this.shiftTypeId = shiftTypeId;
    }

    public String getOrganizationSchemaId() {
        return organizationSchemaId;
    }

    public void setOrganizationSchemaId(String organizationSchemaId) {
        this.organizationSchemaId = organizationSchemaId;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
    
    
            
    
}
