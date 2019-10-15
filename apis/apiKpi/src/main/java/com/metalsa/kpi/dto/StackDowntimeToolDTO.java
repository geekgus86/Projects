/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.Map;

/**
 *
 * @author marcos.ramirez
 */
@Data
@AllArgsConstructor
public class StackDowntimeToolDTO implements Serializable {

    private Map<String,Object> herramientasName;
    
}
