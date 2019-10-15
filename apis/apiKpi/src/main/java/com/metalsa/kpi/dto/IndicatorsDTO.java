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

/**
 *
 * @author marcos.ramirez
 */

@Data
public class IndicatorsDTO implements Serializable {

    private BigDecimal number;
    private BigDecimal goal;
    private List<HistoricDTO> history;
    
}
