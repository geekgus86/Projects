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
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;

/**
 *
 * @author marcos.ramirez
 */
@Entity
@Table(name = "Asset", schema = "admin")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Asset {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private Integer id;
    @Column(name = "Name")
    private String name;
    @Column(name = "NBTID")
    private Long nbtid;
    @Column(name = "time_zone")
    private String timezone;
    @Column(name = "description")
    private String description;

    
}
