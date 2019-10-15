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
public class COHerramientaDTO implements Serializable {
    
    private String tool;
    private String op;
    private String mtto;
    private String htas;
    private String cal;
    private String log;
    private ConfigDTO config;
    private String none;


}
