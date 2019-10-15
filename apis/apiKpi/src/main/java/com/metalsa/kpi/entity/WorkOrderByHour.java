/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.entity;

import com.metalsa.kpi.dto.HistoricDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

/**
 *
 * @author marcos.ramirez
 */
@Entity
@Table(name = "WorkOrderByHour", schema = "machine")
@Data
@AllArgsConstructor
@NoArgsConstructor
//@NamedStoredProcedureQueries({
//        @NamedStoredProcedureQuery(name = "getStokesHistoric",
//                procedureName = "getStrokesHistoric",
//                resultClasses = HistoricDTO.class,
//                parameters = {
//                @StoredProcedureParameter(
//                        name = "start",
//                        type = LocalDateTime.class,
//                        mode = ParameterMode.IN),
//                @StoredProcedureParameter(
//                        name = "end",
//                        type = LocalDateTime.class,
//                        mode = ParameterMode.IN),
//                @StoredProcedureParameter(
//                        name = "asset",
//                        type = ArrayList.class,
//                        mode = ParameterMode.IN),
//                @StoredProcedureParameter(
//                        name = "tool",
//                        type = ArrayList.class,
//                        mode = ParameterMode.IN),
//                })
//})
public class WorkOrderByHour {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;
    @Column(name = "RealSpeed")
    private Integer realSpeed;
    @Column(name = "Pieces")
    private Integer pieces;
    @Column(name = "OAHr")
    private BigDecimal oAHr;
    @Column(name = "OAAcumulated")
    private BigDecimal oAAcumulated;
    @Column(name = "Uptime")
    private Integer uptime;
    @JoinColumn(name = "ToolID", referencedColumnName = "id")
    @OneToOne(optional = false, fetch = FetchType.LAZY)
    private Tool tool;
    @Column(name = "StartAt")
    private LocalDateTime startAt;
    @Column(name = "EndAt")
    private LocalDateTime endAt;
    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;
    @JoinColumn(name = "AssetID", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Asset asset;

    
}
