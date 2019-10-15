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
import java.util.Date;

/**
 *
 * @author marcos.ramirez
 */
@Entity
@Table(name = "IssueType", schema = "machine")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssueType {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;
    @Column(name = "DescIssueType")
    private String descIssueType;
    @Column(name = "ShortDesc")
    private String shortDesc;
    @Column(name = "Color")
    private String color;
    @Column(name = "RealDown")
    private Integer realDown;
    @Column(name = "Affect")
    private Double affect;
    @Column(name = "InternalCode")
    private String internalCode;
    @Column(name = "Out")
    private Integer out;
    @Column(name = "CreatedAt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Column(name = "Active")
    private Integer active;

    @JoinColumn(name = "AssetID", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Asset asset;
    
}
