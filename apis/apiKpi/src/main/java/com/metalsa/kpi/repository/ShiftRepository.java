/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.repository;

import com.metalsa.kpi.entity.Shift;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author palacios
 */
@Repository
public interface ShiftRepository extends JpaRepository<Shift, Integer>{
    List<Shift> findByOrganizationSchemaId(String schema);
}
