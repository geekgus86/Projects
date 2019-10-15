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
import java.math.BigInteger;
import java.sql.Date;
import java.time.LocalDateTime;

/**
 *
 * @author marcos.ramirez
 */
@Entity
@Table(name = "WorkOrderByDay", schema = "machine")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkOrderByDay {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "pieces")
    private Integer pieces;
    @Column(name = "piece_potentials")
    private Integer piece_potentials;
    @Column(name = "oapr")
    private BigDecimal oapr;
    @Column(name = "tnd")
    private Integer tnd;
    @Column(name = "start")
    private LocalDateTime start;
    @Column(name = "end")
    private LocalDateTime end;
    @Column(name = "day")
    private Date day;
    @Column(name = "updated_at")
    private LocalDateTime updated_at;
    @JoinColumn(name = "AssetID", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Asset asset;

}
