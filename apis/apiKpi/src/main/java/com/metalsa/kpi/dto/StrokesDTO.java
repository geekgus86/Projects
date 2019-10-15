/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.dto;

import java.math.BigDecimal;

/**
 *
 * @author palacios
 */
public class StrokesDTO {
    private Integer assetId;
    private Integer toolId;
    private Integer designSpeed;
    private BigDecimal TNDbyTool;
    private BigDecimal TNDxDesign;
    private Integer total;
    private Integer goal;

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getGoal() {
        return goal;
    }

    public void setGoal(Integer goal) {
        this.goal = goal;
    }

    public Integer getAssetId() {
        return assetId;
    }

    public void setAssetId(Integer assetId) {
        this.assetId = assetId;
    }

    public Integer getToolId() {
        return toolId;
    }

    public void setToolId(Integer toolId) {
        this.toolId = toolId;
    }

    public Integer getDesignSpeed() {
        return designSpeed;
    }

    public void setDesignSpeed(Integer designSpeed) {
        this.designSpeed = designSpeed;
    }

    public BigDecimal getTNDbyTool() {
        return TNDbyTool;
    }

    public void setTNDbyTool(BigDecimal TNDbyTool) {
        this.TNDbyTool = TNDbyTool;
    }

    public BigDecimal getTNDxDesign() {
        return TNDxDesign;
    }

    public void setTNDxDesign(BigDecimal TNDxDesign) {
        this.TNDxDesign = TNDxDesign;
    }
    
    
}
