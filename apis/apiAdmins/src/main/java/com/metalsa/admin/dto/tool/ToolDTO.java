/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.dto.tool;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

/**
 *
 * @author azbel.trinidad
 */
public class ToolDTO {

    private Long id;
    private String descTool;
    private Long designSpeed;
    private Long jobNumber;
    private Long toolType;
    private String noRollo;
    private Long pzPerStroke;
    private String createdAt;
    private Boolean active;
    private Long assetId;
    private String location;
    private String assetDesc;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Long> assets;

    public List<Long> getAssets() {
        return assets;
    }

    public void setAssets(List<Long> assets) {
        this.assets = assets;
    }

    public String getAssetDesc() {
        return assetDesc;
    }

    public void setAssetDesc(String assetDesc) {
        this.assetDesc = assetDesc;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getAssetId() {
        return assetId;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
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

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return "ToolDTO{" + "id=" + id + ", descTool=" + descTool + ", designSpeed=" + designSpeed + ", jobNumber=" + jobNumber + ", toolType=" + toolType + ", noRollo=" + noRollo + ", pzPerStroke=" + pzPerStroke + ", createdAt=" + createdAt + ", active=" + active + ", assetId=" + assetId + ", location=" + location + '}';
    }
    
    
    
}
