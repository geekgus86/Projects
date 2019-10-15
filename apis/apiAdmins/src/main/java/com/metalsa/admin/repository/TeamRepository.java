/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.repository;

import com.metalsa.admin.entity.AppUser;
import com.metalsa.admin.entity.Asset;
import com.metalsa.admin.entity.EscalationRule;
import com.metalsa.admin.entity.IssueType;
import com.metalsa.admin.entity.Team;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author azbel.trinidad
 */
@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    
    public List<Team> findByAssetAndActive(Asset asset, boolean active);
    
    public List<Team> findByAppUserAndActive(AppUser appUser, boolean active);
    
    public List<Team> findByAsset(Asset asset);
    
    public List<Team> findByLocation(@Param("locName") String locName);
    
    public List<AppUser> getTokens(@Param("ruleId") Long ruleId, @Param("assetDesc") String assetDesc, @Param("active") boolean active);
    
    public List<Team> findByLocationAndActive(@Param("locName") String locName, @Param("active") boolean active);
    
    public List<Team> findByAppUserAndIssueTypeAndEscalationRuleAndAssetAndActive(AppUser appUser, IssueType issueType, 
            EscalationRule escalationRule, Asset asset, boolean active);
    
    public List<Team> findByAppUserAndIssueTypeAndEscalationRuleInAndAssetAndActive(AppUser appUser, IssueType issueType, 
            List<EscalationRule> escalationRule, Asset asset, boolean active);
    
    public List<Team> findByAppUserAndIssueTypeIsNotNullAndActive(AppUser appUser, boolean active);
}
