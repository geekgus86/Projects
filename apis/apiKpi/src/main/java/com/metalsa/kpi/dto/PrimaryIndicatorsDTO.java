/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.dto;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

/**
 *
 * @author marcos.ramirez
 */

@Data
public class PrimaryIndicatorsDTO implements Serializable {


    private String status;
    private String message;


    // Strokes
    private Integer strokesNumber;
    private Integer strokeGoal;
    private List<HistoricDTO> historic;

    // OAxPR
    private BigDecimal oaxpr;
    private BigDecimal oaxprGoal;

    // VCD
    private BigDecimal vcd;

    // VSD
    private BigDecimal vsd;




}
