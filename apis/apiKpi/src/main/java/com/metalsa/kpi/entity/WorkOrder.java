/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.entity;

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
@Table(name = "WorkOrder", schema = "machine")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkOrder {

    private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "UnitsAuto")
    private Integer unitsAuto;

    @Column(name = "UnitsManual")
    private Integer unitsManual;

    @Column(name = "UnitsPotential")
    private Integer unitsPotential;

    @Column(name = "RealMaxSpeed")
    private Integer realMaxSpeed;

    @Column(name = "JulianNumberID")
    private Integer julianNumberID;

    @JoinColumn(name = "AssetID", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Asset asset;

    @Column(name = "RolledSteelID")
    private Integer rolledSteelID;

    @JoinColumn(name = "ToolID", referencedColumnName = "id")
    @OneToOne(optional = false, fetch = FetchType.LAZY)
    private Tool tool;

    @Column(name = "ShiftID")
    private Integer shiftID;

    @Column(name = "OpenSecond")
    private Integer openSecond;

    @Column(name = "ParentID")
    private Integer parentID;

    @Column(name = "StartAt")
    private LocalDateTime startAt;

    @Column(name = "EndAt")
    private LocalDateTime endAt;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "CreatedBy")
    private Integer createdBy;

    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    @Column(name = "UpdatedBy")
    private Integer updatedBy;

    @Column(name = "Active")
    private Integer active;

    @Column(name = "JulianCode")
    private String julianCode;

    @Column(name = "IsTryOut")
    private Integer isTryOut;

    @Column(name = "IsOut")
    private Integer isOut;


}
