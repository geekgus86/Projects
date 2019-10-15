/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.repository;

import com.metalsa.kpi.entity.Asset;
import com.metalsa.kpi.entity.Tool;
import com.metalsa.kpi.entity.WorkOrderByHour;
import com.metalsa.kpi.entity.WorkOrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 *
 * @author marcos.ramirez
 */
@Repository
public interface WorkOrderByHourRepository extends JpaRepository<WorkOrderByHour, Integer>{

    List<WorkOrderByHour> findByStartAtGreaterThanEqualAndEndAtLessThanEqualAndAsset(LocalDateTime startAt, LocalDateTime endAt, Asset assetId);
   // List<WorkOrderByHour> findByStartAtLessThanEqualOrEndAtGreatherThanEqualAndAssetIDIn(LocalDateTime atStartOfDay, LocalDateTime atStartOfDay1, List<Asset> assets);

    List<WorkOrderByHour> findByStartAtAfterAndEndAtBeforeAndAssetIn(LocalDateTime stringToLocalDateTime, LocalDateTime stringToLocalDateTime1, List<Asset> assets);
    List<WorkOrderByHour> findByStartAtAfterAndEndAtBeforeAndAssetInAndToolNotNull(LocalDateTime stringToLocalDateTime, LocalDateTime stringToLocalDateTime1, List<Asset> assets);
    List<WorkOrderByHour> findByStartAtAfterAndEndAtBeforeAndAssetInAndToolIn(LocalDateTime stringToLocalDateTime, LocalDateTime stringToLocalDateTime1, List<Asset> assets, List<Tool> tools);
    List<WorkOrderByHour> findByStartAtAfterAndEndAtBeforeAndAssetInAndToolInOrderByStartAtDesc(LocalDateTime stringToLocalDateTime, LocalDateTime stringToLocalDateTime1, List<Asset> assets, List<Tool> tools);


}
