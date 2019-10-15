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
import javax.xml.bind.annotation.XmlRootElement;
import org.hibernate.annotations.Type;

/**
 *
 * @author azbel.trinidad
 */
@Entity
@Table(name = "Tool", schema = "admins")
@XmlRootElement
@NamedQueries({
    @NamedQuery(
            name = "Tool.findByLocationAndActive",
            query = "SELECT T FROM Tool T JOIN Location L ON T.location.id = L.id WHERE L.name = :locName AND T.active = :active ORDER BY T.descTool ASC"
    ),
    @NamedQuery(
            name = "Tool.findByLocation",
            query = "SELECT T FROM Tool T JOIN Location L ON T.location.id = L.id WHERE L.name = :locName ORDER BY T.descTool ASC"
    )
})
public class Tool implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "DescTool")
    private String descTool;
    @Column(name = "DesignSpeed")
    private Long designSpeed;
    @Column(name = "JobNumber")
    private Long jobNumber;
    @Column(name = "ToolType")
    private Long toolType;
    @Column(name = "NoRollo")
    private String noRollo;
    @Column(name = "PzPerStroke")
    private Long pzPerStroke;
    @Column(name = "CreatedAt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Column(name = "Active")
    @Type(type = "boolean")
    private boolean active;
    @JoinColumn(name = "LocationId", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Location location;
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
    @JoinColumn(name = "AssetID", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Asset asset;

    public Tool() {
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescTool() {
        return descTool;
    }

    public void setDescTool(String descTool) {
        this.descTool = descTool;
    }

    public Long getDesignSpeed() {
        return designSpeed;
    }

    public void setDesignSpeed(Long designSpeed) {
        this.designSpeed = designSpeed;
    }

    public Long getJobNumber() {
        return jobNumber;
    }

    public void setJobNumber(Long jobNumber) {
        this.jobNumber = jobNumber;
    }

    public Long getToolType() {
        return toolType;
    }

    public void setToolType(Long toolType) {
        this.toolType = toolType;
    }

    public String getNoRollo() {
        return noRollo;
    }

    public void setNoRollo(String noRollo) {
        this.noRollo = noRollo;
    }

    public Long getPzPerStroke() {
        return pzPerStroke;
    }

    public void setPzPerStroke(Long pzPerStroke) {
        this.pzPerStroke = pzPerStroke;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "com.metalsa.admin.entity.Tool[ id=" + id + " ]";
    }

}
