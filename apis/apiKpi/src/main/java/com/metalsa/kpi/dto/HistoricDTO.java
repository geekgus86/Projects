/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.dto;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 *
 * @author marcos.ramirez
 */

@Data
public class HistoricDTO implements Serializable {
    
    private String startAt;
    private String endAt;
    private BigDecimal stroke;
    private BigDecimal potentials;
    private BigDecimal tnd;
    private BigDecimal oaxpr;
    private BigDecimal vcd;
    private BigDecimal vsd;
    private String dayProduction;
    
    
}
