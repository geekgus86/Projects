/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 *
 * @author marcos.ramirez
 */

@Data
public class ProductivityDTO implements Serializable {


    private String status;
    private String message;

    // histórico de productividad
    private List<BarDTO> graphicData;

}
