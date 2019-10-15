/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.repository;

import com.metalsa.kpi.entity.WorkOrderByDay;
import com.metalsa.kpi.entity.WorkOrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 *
 * @author marcos.ramirez
 */
@Repository
public interface WorkOrderByDayRepository extends JpaRepository<WorkOrderByDay, Integer>{
    //public WorkOrderByDay findByUsername(String username);

    //List<WorkOrderByDay> findByStartAtGreaterThanEqualAndEndAtLessThanEqualAndAssetID(String startAt, String endAt, String assetId);
}
