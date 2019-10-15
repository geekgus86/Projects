/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author palacios y Edgar :)
 */

@Data
@AllArgsConstructor
public class WorkOrderDTO implements Serializable{
    
    private BigInteger toolID;
    private String descTool;
    private Integer none = 0;
    private Map<String,String> data;
    private Map<String,Map<String,String>> meta;
    
    
    private BigInteger woid;
    private BigInteger id;
    private String dtCode;
    private String descIssue;
    private Date start;
    private Date endAt;
    private Double downtimeSeconds;
    private Integer quantityDowntimes;
    private Double totalTime;
    private Double timeOut;
    private Double tnd;
    private BigDecimal downtimePercentage;
    
    public WorkOrderDTO(){
        this.data = new TreeMap<String,String>();
        this.meta = new TreeMap<String,Map<String,String>>();
    }

    /*public BigInteger getWoid() {
        return woid;
    }

    public void setWoid(BigInteger woid) {
        this.woid = woid;
    }

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getDtCode() {
        return dtCode;
    }

    public void setDtCode(String dtCode) {
        this.dtCode = dtCode;
    }

    public String getDescIssue() {
        return descIssue;
    }

    public void setDescIssue(String descIssue) {
        this.descIssue = descIssue;
    }

    public BigInteger getToolID() {
        return toolID;
    }

    public void setToolID(BigInteger toolID) {
        this.toolID = toolID;
    }

    public String getDescTool() {
        return descTool;
    }

    public void setDescTool(String descTool) {
        this.descTool = descTool;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEndAt() {
        return endAt;
    }

    public void setEndAt(Date endAt) {
        this.endAt = endAt;
    }

    public Double getDowntimeSeconds() {
        return downtimeSeconds;
    }

    public void setDowntimeSeconds(Double downtimeSeconds) {
        this.downtimeSeconds = downtimeSeconds;
    }

    public Integer getQuantityDowntimes() {
        return quantityDowntimes;
    }

    public void setQuantityDowntimes(Integer quantityDowntimes) {
        this.quantityDowntimes = quantityDowntimes;
    }

    public Double getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Double totalTime) {
        this.totalTime = totalTime;
    }

    public Double getTimeOut() {
        return timeOut;
    }

    public void setTimeOut(Double timeOut) {
        this.timeOut = timeOut;
    }

    public Double getTnd() {
        return tnd;
    }

    public void setTnd(Double tnd) {
        this.tnd = tnd;
    }

    public BigDecimal getDowntimePercentage() {
        return downtimePercentage;
    }

    public void setDowntimePercentage(BigDecimal downtimePercentage) {
        this.downtimePercentage = downtimePercentage;
    }
*/
  
     @Override
    public boolean equals(Object o) {
        if(!(o instanceof WorkOrderDTO)) return false;
        WorkOrderDTO other = (WorkOrderDTO) o;
        return (this.toolID.intValue() == other.toolID.intValue());
    }
    
   

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 37 * hash + Objects.hashCode(this.toolID);
        return hash;
    }
    
    
}
