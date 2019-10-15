/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 *
 * @author marcos.ramirez
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BarDTO implements Serializable {
    
    private String date;
    private Integer value;
    private BigDecimal goal;
    private String tools;
    private String color;
    
}
