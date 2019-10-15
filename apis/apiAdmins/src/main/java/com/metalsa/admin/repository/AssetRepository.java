/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.repository;

import com.metalsa.admin.entity.AppUser;
import com.metalsa.admin.entity.Asset;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author azbel.trinidad
 */
@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    
    public List<Asset> findByName(String name);
    
    public List<Asset> findByLocationName(@Param("locName") String locName);
    
}
