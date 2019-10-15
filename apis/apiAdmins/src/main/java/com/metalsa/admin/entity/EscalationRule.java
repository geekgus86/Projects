/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.Type;

/**
 *
 * @author alfredo.delangel02
 */

@Entity
@Table(name = "EscalationRule", schema = "admins")
public class EscalationRule {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY) 
    @Column(name = "ID")
    private Long id;
    @Column(name = "DescEscalationRule")
    private String descEscalationRule;
    @Column(name = "Color")
    private String color;
    @Column(name = "CreatedAt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Column(name = "Active")
    @Type(type = "boolean")
    private boolean active;
    @Column(name = "LevelEscalation")
    private Integer levelEscalation;
    @Column(name = "LimitEscalation")
    private Integer limitEscalation;
    @Column(name = "LAST_UPDATE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastUpdateDate;
    @Column(name = "LAST_UPDATED_BY")
    private String lastUpdatedBy;
    @Column(name = "CREATION_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;
    @Column(name = "CREATED_BY")
    private String createdBy;
    @JoinColumn(name = "EscalationTypeID", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private EscalationType escalationType;
    
    public EscalationRule () { }

    public EscalationRule(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }

    public String getLastUpdatedBy() {
        return lastUpdatedBy;
    }

    public void setLastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public EscalationType getEscalationType() {
        return escalationType;
    }

    public void setEscalationType(EscalationType escalationType) {
        this.escalationType = escalationType;
    }
    

     
}
