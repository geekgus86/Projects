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
import java.time.LocalDateTime;
import java.util.Date;

/**
 *
 * @author marcos.ramirez
 */
@Entity
@Table(name = "Tool", schema = "machine")
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
public class Tool {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;
    @Column(name = "DescTool")
    private String descTool;
    @Column(name = "DesignSpeed")
    private Long designSpeed;
    @Column(name = "JobNumber")
    private Long jobNumber;
    @Column(name = "ToolType")
    private Long toolType;
    @Column(name = "NoRollo")
    private String noRollo;
    @Column(name = "PzPerStroke")
    private Long pzPerStroke;
    @Column(name = "CreatedAt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Column(name = "Active")
    @Type(type = "boolean")
    private boolean active;

    @JoinColumn(name = "AssetID", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Asset asset;

    @Column(name = "remoteId")
    private Integer remoteId;
    
}
