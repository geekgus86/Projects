/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;

/**
 *
 * @author palacios
 */
public class MTTRDto implements Serializable{
    private Integer id;
    private String description;
    private BigDecimal minutes;
    private Integer events;
    private BigDecimal dtMin;
    private BigDecimal dtMax;
    private String issueCode;
    private BigDecimal durationIssue;
    private BigDecimal tnd;
    private BigDecimal mttr;
    private BigDecimal affect;
    private String shortDesc;
    private String color;
    private String listErrorCode;

    public MTTRDto(){
        this.listErrorCode = "";
    }
    
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

    public BigDecimal getMinutes() {
        return minutes;
    }

    public void setMinutes(BigDecimal minutes) {
        this.minutes = minutes;
    }

    public Integer getEvents() {
        return events;
    }

    public void setEvents(Integer events) {
        this.events = events;
    }

    public BigDecimal getDtMin() {
        return dtMin;
    }

    public void setDtMin(BigDecimal dtMin) {
        this.dtMin = dtMin;
    }

    public BigDecimal getDtMax() {
        return dtMax;
    }

    public void setDtMax(BigDecimal dtMax) {
        this.dtMax = dtMax;
    }

    public String getIssueCode() {
        return issueCode;
    }

    public void setIssueCode(String issueCode) {
        this.issueCode = issueCode;
    }

    public BigDecimal getDurationIssue() {
        return durationIssue;
    }

    public void setDurationIssue(BigDecimal durationIssue) {
        this.durationIssue = durationIssue;
    }

    public BigDecimal getTnd() {
        return tnd;
    }

    public void setTnd(BigDecimal tnd) {
        this.tnd = tnd;
    }

    public BigDecimal getMttr() {
        return mttr;
    }

    public void setMttr(BigDecimal mttr) {
        this.mttr = mttr;
    }

    public BigDecimal getAffect() {
        return affect;
    }

    public void setAffect(BigDecimal affect) {
        this.affect = affect;
    }

    public String getShortDesc() {
        return shortDesc;
    }

    public void setShortDesc(String shortDesc) {
        this.shortDesc = shortDesc;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getListErrorCode() {
        return listErrorCode;
    }

    public void setListErrorCode(String listErrorCode) {
        this.listErrorCode = listErrorCode;
    }
    
    

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + Objects.hashCode(this.description);
        return hash;
    }

    @Override
    public boolean equals(Object o) {
        if(!(o instanceof MTTRDto)) return false;
        MTTRDto other = (MTTRDto) o;
        return (this.description.equalsIgnoreCase(other.getDescription()));
    }
    
    
    
}
