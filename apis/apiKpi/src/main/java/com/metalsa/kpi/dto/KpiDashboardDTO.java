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
public class KpiDashboardDTO implements Serializable {


    private String status;
    private String message;

    //Datos de control
    private BigInteger tnd;
    private BigInteger coTime;


    // Strokes
    private Integer strokesNumber;
    private Integer strokeGoal;
    private List<HistoricDTO> strokesHistory;

    // OAxPR
    private BigDecimal oaxpr;
    private BigDecimal oaxprGoal;
    private List<HistoricDTO> oaxprHistory;

    // VCD
    private BigDecimal vcd;
    private List<HistoricDTO> vcdHistory;

    // VSD
    private BigDecimal vsd;
    private List<HistoricDTO> vsdHistory;


    // Downtime information
    private BigDecimal downtime;
    private BigDecimal downtimeGoal;
    private List<HistoricDTO> downtimeHistory;


    // Cambio de herramienta
    private BigDecimal averageCO;
    private BigDecimal averageCOGoal;
    private List<HistoricDTO> averageCOHistory;



}
