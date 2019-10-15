/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.repository;

import com.metalsa.kpi.entity.Asset;
import com.metalsa.kpi.entity.Tool;
import com.metalsa.kpi.entity.WorkOrder;
import com.metalsa.kpi.entity.WorkOrderByHour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 *
 * @author marcos.ramirez
 */
@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Integer>{

    List<WorkOrder> findByStartAtAfterAndEndAtBeforeAndAssetIn(LocalDateTime stringToLocalDateTime, LocalDateTime stringToLocalDateTime1, List<Asset> assets);
    List<WorkOrder> findByStartAtAfterAndEndAtBeforeAndAssetInAndToolNotNull(LocalDateTime stringToLocalDateTime, LocalDateTime stringToLocalDateTime1, List<Asset> assets);

    public List<WorkOrder> findByStartAtGreaterThanEqualAndEndAtLessThanEqualAndAssetInAndToolNotNull(LocalDateTime startAt, LocalDateTime endAt, List<Asset> assets);

}
