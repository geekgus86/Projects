/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.repository;

import com.metalsa.admin.entity.Tool;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author azbel.trinidad
 */
@Repository
public interface ToolRepository extends JpaRepository<Tool, String> {
    
    public List<Tool> findByDescToolLike(String descTool);

    public Tool findById(Long id);
    
    public List<Tool> findByActive(boolean active);
    
    public List<Tool> findByLocationAndActive(@Param("locName") String locName, @Param("active") boolean active);
    
    public List<Tool> findByLocation(@Param("locName") String locName);
    
    public List<Tool> findByAssetId(Long assetId);
    
}
