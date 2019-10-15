/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tool | Templates
 * and open the template in the editor.
 */
package com.metalsa.kpi.repository;

import com.metalsa.kpi.entity.Issue;
import com.metalsa.kpi.entity.IssueType;
import com.metalsa.kpi.entity.Tool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 *
 * @author marcos.ramirez
 */
@Repository
public interface IssueRepository extends JpaRepository<Issue, Integer>{


    public List<Issue> findByIdIn(List<Integer> list);

    List<Issue> findByIssueType(IssueType type);
}
