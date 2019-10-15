/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.repository;

import com.metalsa.kpi.entity.Tool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 *
 * @author marcos.ramirez
 */
@Repository
public interface ToolRepository extends JpaRepository<Tool, Integer>{


/*
    public List<Tool> findByDescToolLike(String descTool);

    public Tool findById(Long id);

    public List<Tool> findByActive(boolean active);


    public List<Tool> findByAssetIdAndActive(Long assetId, boolean active);
*/

    public List<Tool> findByIdIn(List<Integer> tools);
}
