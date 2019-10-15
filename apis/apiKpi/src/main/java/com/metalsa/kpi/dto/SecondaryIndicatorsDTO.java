/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.dto;

import lombok.Data;

import java.io.Serializable;

/**
 *
 * @author marcos.ramirez
 */

@Data
public class SecondaryIndicatorsDTO implements Serializable {


    private String status;
    private String message;


    //  % Downtimes
    private IndicatorsDTO downtime;

    // Minutos changeover promedio
    private IndicatorsDTO changeover;




}
