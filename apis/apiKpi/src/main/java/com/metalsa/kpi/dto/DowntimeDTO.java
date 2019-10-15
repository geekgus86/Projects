/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.dto;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 *
 * @author marcos.ramirez
 */

@Data
public class DowntimeDTO implements Serializable {


    private String status;
    private String message;

    //Datos de control
    private BigDecimal dt;
    private BigDecimal dtGoal;


    // Afectación por herramienta
    private List<Map<String,Object>> afectacionPorHerramienta;   
    private List<Map<String,Object>> afectacionPorHerramientaHistoric;
    
    // Afectación por departamento
    private List<Map<String,Object>> afectacionPorDepartamento;
    private List<DepartmentDTO> afectacionPorDepartamentoHist;

    private List<Map<String,String>> downtimePorHerramientaHistoric;

    // Minutos MTTR por area
    private List<MTTRDto> mttr;




}
