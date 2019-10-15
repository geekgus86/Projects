/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.repository;

import com.metalsa.admin.entity.Asset;
import com.metalsa.admin.entity.IssueType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author azbel.trinidad
 */
@Repository
public interface IssueTypeRepository extends JpaRepository<IssueType, Long> {
    
    public List<IssueType> findByAssetAndActive(Asset asset, boolean active);
    
}
