/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.entity.custom;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

/**
 *
 * @author marcos.ramirez
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TNDHistoric {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private String date;
    @Column(name = "tnd")
    private Integer tnd;

    
}
