/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author marcos.ramirez
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tnd implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "TND")
    private Long tnd;
    @Column(name = "outSeconds")
    private Long outSeconds;
    @Column(name = "outSecondsGrouped")
    private Long outSecondsGrouped;

    
}
