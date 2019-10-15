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
public class HistoricDowntimeChangeOverDTO implements Serializable {
    
    private String dayProduction;
    private Map<String, String> value;
    
    public HistoricDowntimeChangeOverDTO(String dayProduction, Map<String,String> value){
        this.dayProduction  = dayProduction;
        this.value= value;
    }
    
    public HistoricDowntimeChangeOverDTO(){
        
    }
    
}
