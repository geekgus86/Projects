/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.repository;


import com.metalsa.admin.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author palacios
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query(nativeQuery = true, value = "select * from admins.users where full_name like :name COLLATE Latin1_General_CI_AI")
    public List<User> findByFullNameLike(@Param("name") String name);
}
