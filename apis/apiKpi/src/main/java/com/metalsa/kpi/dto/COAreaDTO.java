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
public class COAreaDTO {
    private String description;
    private BigDecimal average;
    private BigDecimal minutes;
    private Integer event;
    private String color;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAverage() {
        return average;
    }

    public void setAverage(BigDecimal average) {
        this.average = average;
    }

    public BigDecimal getMinutes() {
        return minutes;
    }

    public void setMinutes(BigDecimal minutes) {
        this.minutes = minutes;
    }

    public Integer getEvent() {
        return event;
    }

    public void setEvent(Integer event) {
        this.event = event;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
    
    
}
