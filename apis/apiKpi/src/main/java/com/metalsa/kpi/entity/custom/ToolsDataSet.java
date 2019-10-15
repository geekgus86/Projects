/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.entity.custom;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 *
 * @author marcos.ramirez
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ToolsDataSet {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private Integer toolId;
//    @Column(name = "tool")
//    private String tool;
    @Column(name = "tnd")
    private Integer tnd;
    @Column(name = "goal")
    private BigDecimal goal;
/*    @Column(name = "startAt")
    private LocalDateTime startAt;
    @Column(name = "entAd")
    private LocalDateTime endAt;*/

    
}
