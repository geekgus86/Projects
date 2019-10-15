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
public class COToolDTO {
    private String toolId;
    private Integer eventByTool;
    private String desDepartment;
    private BigDecimal avgDepartment;
    private BigDecimal minutesDepartment;
    private Integer event;

    public String getToolId() {
        return toolId;
    }

    public void setToolId(String toolId) {
        this.toolId = toolId;
    }

    public Integer getEventByTool() {
        return eventByTool;
    }

    public void setEventByTool(Integer eventByTool) {
        this.eventByTool = eventByTool;
    }

    public String getDesDepartment() {
        return desDepartment;
    }

    public void setDesDepartment(String desDepartment) {
        this.desDepartment = desDepartment;
    }

    public BigDecimal getAvgDepartment() {
        return avgDepartment;
    }

    public void setAvgDepartment(BigDecimal avgDepartment) {
        this.avgDepartment = avgDepartment;
    }

    public BigDecimal getMinutesDepartment() {
        return minutesDepartment;
    }

    public void setMinutesDepartment(BigDecimal minutesDepartment) {
        this.minutesDepartment = minutesDepartment;
    }

    public Integer getEvent() {
        return event;
    }

    public void setEvent(Integer event) {
        this.event = event;
    }
    
    
    
    
}
