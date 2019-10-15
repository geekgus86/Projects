/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.dto;

import java.util.Date;

/**
 *
 * @author palacios
 */
public class DateUTC {
    private Date start;
    private Date end;
    private Date firstDayDate;
    private Date lastDayDate;

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public Date getFirstDayDate() {
        return firstDayDate;
    }

    public void setFirstDayDate(Date firstDayDate) {
        this.firstDayDate = firstDayDate;
    }

    public Date getLastDayDate() {
        return lastDayDate;
    }

    public void setLastDayDate(Date lastDayDate) {
        this.lastDayDate = lastDayDate;
    }
    
    
}
