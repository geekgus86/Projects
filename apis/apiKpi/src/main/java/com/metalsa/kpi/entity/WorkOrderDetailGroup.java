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
@Table(name = "WorkOrderDetailGroup", schema = "machine")
/*@XmlRootElement
@NamedQueries({
        @NamedQuery(
                name = "Tool.findByLocationAndActive",
                query = "SELECT T FROM Tool T JOIN Location L ON T.location.id = L.id WHERE L.name = :locName AND T.active = :active ORDER BY T.descTool ASC"
        )
})*/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkOrderDetailGroup {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "ParentID")
    private String parentID;
    @Column(name = "GroupSeconds")
    private Long groupSeconds;
    @Column(name = "Description")
    private Long description;
    @Column(name = "IssueID")
    private Long issueID;
    @Column(name = "ReportNumber")
    private String reportNumber;
    @Column(name = "ReportDivision")
    private Long reportDivision;
    @Column(name = "EscalationTypeID")
    private Long escalationTypeID;
    @JoinColumn(name = "WorkOrderDetailID", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private WorkOrderDetail workOrderDetail;
    @JoinColumn(name = "AssetID", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Asset asset;
    @Column(name = "StartAt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date StartAt;
    @Column(name = "EndAt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date EndAt;

    
}
