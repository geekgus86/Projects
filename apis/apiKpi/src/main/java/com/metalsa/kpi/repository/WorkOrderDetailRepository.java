/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.repository;

import com.metalsa.kpi.dto.HistoricDTO;
import com.metalsa.kpi.dto.TndDTO;
import com.metalsa.kpi.entity.*;
import org.apache.tomcat.jni.Local;
import org.hibernate.jdbc.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.NamedStoredProcedureQueries;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureParameter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

/**
 *
 * @author marcos.ramirez
 */


@Repository
public interface WorkOrderDetailRepository extends JpaRepository<WorkOrderDetail, Integer>{

    //List<WorkOrderDetail> findByStartAtGreaterThanEqualAndEndAtLessThanEqualAndAssetID(String startAt, String endAt, String assetId);

    WorkOrderDetail findByAsset(String id);

//    @Procedure(name = "WorkOrderDetail.getTNDTools")
//    Tnd getTNDTools(@Param("startDate") String start, @Param("endDate") String end, @Param("assetID") ArrayList<Integer> assets, @Param("tools") ArrayList<Integer> tools);

    //@Procedure(name = "getTND",outputParameterName = "tnd")
    //@Query(nativeQuery = true, value = "select * from admins.users where full_name like :name")
    @Procedure(name = "WorkOrderDetail.getTND")
    String getTND(@Param("startDate") LocalDateTime start, @Param("endDate") LocalDateTime end, @Param("assets") String assets);

    List<WorkOrderDetail> findByStartAtAfterAndEndAtBeforeAndEscalationTypeIDAndAssetInAndToolIn(LocalDateTime start, LocalDateTime end, int i, List<Asset> assets, List<Tool> tools);
    List<WorkOrderDetail> findByStartAtAfterAndEndAtBeforeAndEscalationTypeIDAndAssetInAndToolInAndWorkOrderDetailGroupIsNull(LocalDateTime start, LocalDateTime end, int i, List<Asset> assets, List<Tool> tools);

    List<WorkOrderDetail> findByStartAtAfterAndEndAtBeforeAndEscalationTypeIDAndAssetInAndToolInAndWorkOrderDetailGroupNotNull(LocalDateTime start, LocalDateTime end, int i, List<Asset> assets, List<Tool> collect);

    List<WorkOrderDetail> findByStartAtAfterAndEndAtBeforeAndEscalationTypeIDAndAssetInAndToolInAndIssueIn(LocalDateTime ini, LocalDateTime fin, int parseInt, List<Asset> assets, List<Tool> tools, List<Issue> areasDepartamento);
}
