/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.entity;

import com.metalsa.kpi.dto.TndDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

/**
 *
 * @author marcos.ramirez
 */
@Entity
@Table(name = "WorkOrderDetail", schema = "machine")
@Data
@AllArgsConstructor
@NoArgsConstructor

        @NamedStoredProcedureQuery(name = "WorkOrderDetail.getTND",
                procedureName = "getTND",
                //resultClasses = {Tnd.class},
                parameters = {
                        @StoredProcedureParameter(
                                name = "startDate",
                                type = LocalDateTime.class,
                                mode = ParameterMode.IN),
                        @StoredProcedureParameter(
                                name = "endDate",
                                type = LocalDateTime.class,
                                mode = ParameterMode.IN),
                        @StoredProcedureParameter(
                                name = "assets",
                                type = String.class,
                                mode = ParameterMode.IN),
                        @StoredProcedureParameter(
                                name = "tnd",
                                type = String.class,
                                mode = ParameterMode.OUT),
                })


public class WorkOrderDetail {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;
    @Column(name = "WorkOrderID")
    private Integer workOrderID;
//    @Column(name = "IssueID")
//    private Integer issueID;
    @JoinColumn(name = "IssueID", referencedColumnName = "ID")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Issue issue;
/*    @Column(name = "ToolID")
    private Integer toolID;*/
    @JoinColumn(name = "ToolID", referencedColumnName = "ID")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Tool tool;
    @Column(name = "EscalationTypeID")
    private Integer escalationTypeID;
    @Column(name = "EscalationRuleID")
    private Integer escalationRuleID;
    @JoinColumn(name = "AssetID", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Asset asset;
    @Column(name = "RealSpeed")
    private Integer realSpeed;
    @Column(name = "OpenSecond")
    private Integer openSecond;
    @Column(name = "ReportStatusID")
    private Integer reportStatusID;
    @Column(name = "ReportNumber")
    private Integer reportNumber;
    @Column(name = "ReportDivision")
    private String reportDivision;
    @Column(name = "SetupManual")
    private Boolean setupManual;
    @Column(name = "EscalationManual")
    private Boolean escalationManual;
    @Column(name = "UserID")
    private Integer userID;
    @Column(name = "ShiftID")
    private Integer shiftID;
    @Column(name = "OrganizationID")
    private Integer organizationID;
    @Column(name = "StartAt")
    private LocalDateTime startAt;
    @Column(name = "EndAt")
    private LocalDateTime endAt;
    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;
//    @Column(name = "WorkOrderDetailGroupID")
//    private Integer workOrderDetailGroupID;
    @JoinColumn(name = "WorkOrderDetailGroupID", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private WorkOrderDetailGroup workOrderDetailGroup;
    
}
