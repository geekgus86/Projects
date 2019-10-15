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
import java.time.LocalDateTime;

/**
 *
 * @author marcos.ramirez
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

@SqlResultSetMapping(
        name = "HxHMapping",
        entities = @EntityResult(
                entityClass = HourByHour.class,
                fields = {
                        @FieldResult(name = "id", column = "id"),
                        @FieldResult(name = "inicio", column = "inicio"),
                        @FieldResult(name = "fin", column = "fin"),
                        @FieldResult(name = "tool", column = "tool"),
                        @FieldResult(name = "piezas", column = "piezas"),
                        @FieldResult(name = "currentSpm", column = "currentSpm"),
                        @FieldResult(name = "jobNumber", column = "jobNumber"),
                        @FieldResult(name = "OpenSecond", column = "OpenSecond"),
                        @FieldResult(name = "toolId", column = "toolId"),
                        @FieldResult(name = "designSpeed", column = "designSpeed"),
                        @FieldResult(name = "potentialStrokes", column = "potentialStrokes")

                })
)
public class HourByHour {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private Integer id;
    @Column(name = "inicio")
    private LocalDateTime inico;
    @Column(name = "fin")
    private LocalDateTime fin;
    @Column(name = "tool")
    private String tool;
    @Column(name = "piezas")
    private String piezas;
    @Column(name = "currentSpm")
    private String currentSpm;
    @Column(name = "jobNumber")
    private String jobNumber;
    @Column(name = "OpenSecond")
    private String openSecond;
    @Column(name = "tool_id")
    private String toolId;
    @Column(name = "design_speed")
    private String designSpeed;
    @Column(name = "potentialStrokes")
    private String potentialStrokes;

    
}
