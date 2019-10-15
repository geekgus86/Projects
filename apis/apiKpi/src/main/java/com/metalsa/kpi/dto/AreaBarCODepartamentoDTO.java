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

/**
 *
 * @author marcos.ramirez
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AreaBarCODepartamentoDTO implements Serializable {
    
    private String name;
    private String value;
    private String eventos;
    private String tiempo;
    private String color;
    
}
