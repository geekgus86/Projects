/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Objects;

/**
 *
 * @author palacios
 */
public class DepartmentDTO implements Serializable{
    private Integer id;
    private String descripcion;
    private String shortDesc;
    private String color;
    private BigDecimal affect;
    private BigDecimal minutes;
    private BigDecimal tnd;
    private BigDecimal value;
    private Integer quantity;
    private String code;
    private BigInteger wo;
    private String DtCode;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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

    public BigDecimal getAffect() {
        return affect;
    }

    public void setAffect(BigDecimal affect) {
        this.affect = affect;
    }

    public BigDecimal getMinutes() {
        return minutes;
    }

    public void setMinutes(BigDecimal minutes) {
        this.minutes = minutes;
    }

    public BigDecimal getTnd() {
        return tnd;
    }

    public void setTnd(BigDecimal tnd) {
        this.tnd = tnd;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public BigInteger getWo() {
        return wo;
    }

    public void setWo(BigInteger wo) {
        this.wo = wo;
    }

    public String getDtCode() {
        return DtCode;
    }

    public void setDtCode(String DtCode) {
        this.DtCode = DtCode;
    }
    
    

    
    

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 43 * hash + Objects.hashCode(this.shortDesc);
        return hash;
    }

     @Override
    public boolean equals(Object o) {
        if(!(o instanceof DepartmentDTO)) return false;
        DepartmentDTO other = (DepartmentDTO) o;
        return (this.shortDesc.equalsIgnoreCase(other.getShortDesc()));
    }
    
    
}
