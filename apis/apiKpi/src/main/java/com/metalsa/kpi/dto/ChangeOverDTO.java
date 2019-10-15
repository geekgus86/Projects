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
public class ChangeOverDTO implements Serializable {


    private String status;
    private String message;
    private BigDecimal time;
    private BigDecimal number;
    private BigDecimal average;
    private BigDecimal goal;


    // C/O por departamento
    private List<COAreaDTO> tiempoCoPorDepartamento;

    // C/O por herramienta
    private List<Map<String,Object>> changeoverPorHerramienta;
    
    private List<Map<String,String>> historic;
    
    private List<Integer> events;



}
