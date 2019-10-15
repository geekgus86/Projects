/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.Type;

/**
 *
 * @author azbel.trinidad
 */
@Entity
@Table(name = "Team", schema = "admins")
@NamedQueries({
    @NamedQuery(
            name = "Team.getTokens",
            query = "SELECT DISTINCT U AS token FROM Team T JOIN AppUser U ON T.appUser.id = U.id WHERE T.escalationRule.id = :ruleId AND T.asset.name = :assetDesc and T.active = :active"
    ),
    @NamedQuery(
            name = "Team.findByLocationAndActive",
            query = "SELECT T FROM Team T JOIN Location L ON T.location.id = L.id WHERE L.name = :locName AND T.active = :active"
    ),
    @NamedQuery(
            name = "Team.findByLocation",
            query = "SELECT T FROM Team T JOIN Location L ON T.location.id = L.id WHERE L.name = :locName"
    )
})
public class Team implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "CreatedAt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
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
    @JoinColumn(name = "UserID", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private AppUser appUser;
    @JoinColumn(name = "AssetID", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Asset asset;
    @JoinColumn(name = "EscalationRuleID", referencedColumnName = "ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private EscalationRule escalationRule;
    @Column(name = "Active")
    @Type(type = "boolean")
    private boolean active;
    @JoinColumn(name = "IssueTypeId", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private IssueType issueType;
    @JoinColumn(name = "LocationId", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Location location;

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public IssueType getIssueType() {
        return issueType;
    }

    public void setIssueType(IssueType issueType) {
        this.issueType = issueType;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
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

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public EscalationRule getEscalationRule() {
        return escalationRule;
    }

    public void setEscalationRule(EscalationRule escalationRule) {
        this.escalationRule = escalationRule;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return "com.metalsa.admin.entity.Team[ id=" + id + " ]";
    }

}
