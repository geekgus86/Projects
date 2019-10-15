/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.repository;

import com.metalsa.admin.entity.EscalationType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author alfredo.delangel02
 */
@Repository
public interface EscalationTypeRepository extends JpaRepository<EscalationType, String>{
    public List<EscalationType> findById(Long id);
}



