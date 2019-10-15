/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author azbel.trinidad
 */
@Entity
@Table(name = "Asset", schema = "admins")
@NamedQuery(
    name = "Asset.findByLocationName",
    query = "SELECT A FROM Asset A JOIN Location L ON A.location.id = L.id WHERE L.name = :locName ORDER BY A.name ASC")
public class Asset {

    @Id
    @Column(name = "id")
    private Long id;
    @Column(name = "NBTID")
    private Long nbtid;
    @Column(name = "Name")
    private String name;
    @JoinColumn(name = "LocationId", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Location location;
    @Column(name = "RemoteId")
    private Long remoteId;
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

    public Asset(Long id, Date lastUpdateDate, String lastUpdatedBy, Date creationDate, String createdBy) {
        this.id = id;
        this.lastUpdateDate = lastUpdateDate;
        this.lastUpdatedBy = lastUpdatedBy;
        this.creationDate = creationDate;
        this.createdBy = createdBy;
    }

    public Asset() {
    }

    public Asset(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getNbtid() {
        return nbtid;
    }

    public void setNbtid(Long nbtid) {
        this.nbtid = nbtid;
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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Long getRemoteId() {
        return remoteId;
    }

    public void setRemoteId(Long remoteId) {
        this.remoteId = remoteId;
    }

    @Override
    public String toString() {
        return "com.metalsa.admin.entity.Asset[ id=" + id + " ]";
    }
    
}
