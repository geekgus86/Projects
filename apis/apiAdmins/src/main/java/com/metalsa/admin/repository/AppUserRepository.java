/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.repository;

import com.metalsa.admin.entity.AppUser;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author palacios
 */
@Repository
public interface AppUserRepository extends JpaRepository<AppUser, String>{
    public AppUser findByUsername(String username);
    
    public List<AppUser> findByNameLike(String name);
    
    public List<AppUser> findByTadi(String tadi);
}
