/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.controller;

import com.metalsa.admin.dto.EscalationTadiDTO;
import com.metalsa.admin.dto.ResponseDTO;
import com.metalsa.admin.dto.TeamDTO;
import com.metalsa.admin.dto.ValidDTO;
import com.metalsa.admin.dto.ValidateTadiDTO;
import com.metalsa.admin.entity.AppUser;
import com.metalsa.admin.entity.Asset;
import com.metalsa.admin.entity.EscalationRule;
import com.metalsa.admin.entity.IssueType;
import com.metalsa.admin.entity.Team;
import com.metalsa.admin.repository.AppUserRepository;
import com.metalsa.admin.repository.AssetRepository;
import com.metalsa.admin.repository.TeamRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author azbel.trinidad
 */
@RestController
@RequestMapping("/api/team")
@CrossOrigin
public class TeamController {

    @Autowired
    TeamRepository teamRepository;
    @Autowired
    AssetRepository assetRepository;
    @Autowired
    AppUserRepository userRepository;

    private final static Logger LOGGER = Logger.getLogger(TeamController.class);

    @RequestMapping(path = "/asset/{id}", method = RequestMethod.GET)
    public List<TeamDTO> getTeamsByAsset(@PathVariable("id") Long id) {
        return getTeamsByAsset(teamRepository.findByAsset(new Asset(id)));
    }

    @RequestMapping(path = "/location/{loc}", method = RequestMethod.GET)
    public List<TeamDTO> getTeamsByLoc(@PathVariable("loc") String loc, HttpServletRequest request) {
        List<TeamDTO> response = new ArrayList<>();
        response.addAll(getTeamsByAsset(teamRepository.findByLocation(loc)));
        return response;
    }

    @RequestMapping(path = "/tadi/{tadi}", method = RequestMethod.GET)
    public EscalationTadiDTO getTeamByTadi(@PathVariable("tadi") String tadi) {
        EscalationTadiDTO escalation = new EscalationTadiDTO();
        List<AppUser> users = userRepository.findByTadi(tadi);
        if (users.size() > 0) {
            AppUser user = users.get(0);
            escalation.setUserId(new Long(user.getId()));
            escalation.setEmail(user.getEmail());
            escalation.setName(user.getName());
            escalation.setTadi(user.getTadi());
            escalation.setPushToken(user.getNotification_token());
            escalation.setScalations(new ArrayList<>());
            List<Team> escalations = teamRepository.findByAppUserAndActive(user, true);
            escalations.stream().map((team) -> {
                TeamDTO dto = new TeamDTO();
                dto.setAssetID(team.getAsset().getId());
                dto.setAssetDesc(team.getAsset().getName());
                dto.setEscalationRuleId(team.getEscalationRule().getId());
                dto.setEscalationRuleDesc(team.getEscalationRule().getDescEscalationRule());
                dto.setEscalationTypeId(team.getEscalationRule().getEscalationType().getId());
                dto.setEscalationTypeDesc(team.getEscalationRule().getEscalationType().getDescEscalationType());
                dto.setIssueTypeId(team.getIssueType().getId());
                dto.setIssueTypeDesc(team.getIssueType().getDescIssueType());
                return dto;
            }).forEachOrdered((dto) -> {
                escalation.getScalations().add(dto);
            });
            return escalation;
        }
        return null;
    }

    @RequestMapping(path = "/token", method = RequestMethod.GET)
    public List<String> getTeamByTadi(@RequestParam(name = "asset") String asset, @RequestParam(name = "ruleId") Long ruleId) {
        if (asset == null || ruleId == null) {
            return new ArrayList<>();
        }
        Set<String> response = new HashSet<>();
        List<AppUser> users = teamRepository.getTokens(ruleId, asset, true);
        users.forEach((user) -> {
            response.add(user.getNotification_token());
        });
        response.remove(null);
        return new ArrayList(response);
    }

    @RequestMapping(path = "/validate", method = RequestMethod.POST)
    public ValidDTO validate(@RequestBody ValidateTadiDTO validate) {
        ValidDTO valid = new ValidDTO();
        valid.setValid(false);
        if (validate.getTadi() != null) {
            List<AppUser> users = userRepository.findByTadi(validate.getTadi());
            if (users != null && users.size() > 0) {
                List<Asset> assets = assetRepository.findByName(validate.getAsset());
                Asset asset = null;
                if (assets != null && assets.size() > 0) {
                    asset = assets.get(0);
                    List<Team> response = teamRepository.findByAppUserAndIssueTypeAndEscalationRuleAndAssetAndActive(
                            users.get(0), new IssueType(validate.getIssueTypeId()),
                            new EscalationRule(validate.getEscalationRuleId()), asset, true);
                    if (response != null && response.size() > 0) {
                        valid.setValid(true);
                        valid.setMessage(users.get(0).getName());
                    } else {
                        valid.setMessage("user_level_restrict");
                    }
                } else {
                    valid.setMessage("user_level_restrict");
                }
            } else {
                valid.setMessage("TADI_not_found");
            }
        }
        return valid;
    }
    
    
    @RequestMapping(path = "/validateTadiInArea", method = RequestMethod.POST)
    public ValidDTO validateTadiInArea(@RequestBody ValidateTadiDTO validate) {
        ValidDTO valid = new ValidDTO();
        valid.setValid(false);
        if (validate.getTadi() != null) {
            List<AppUser> users = userRepository.findByTadi(validate.getTadi());
            if (users != null && users.size() > 0) {
                List<Asset> assets = assetRepository.findByName(validate.getAsset());
                Asset asset = null;
                if (assets != null && assets.size() > 0) {
                    asset = assets.get(0);

                    List<EscalationRule> listEscalationRule = new ArrayList<EscalationRule>();
                    for (Long idEscalation:validate.getEscalationRules()){
                       listEscalationRule.add(new EscalationRule(idEscalation) );
                    }

                    List<Team> response = teamRepository.findByAppUserAndIssueTypeAndEscalationRuleInAndAssetAndActive(
                    users.get(0), new IssueType(validate.getIssueTypeId()),
                    listEscalationRule, asset, true);

                    if (response != null && response.size() > 0) {
                        valid.setValid(true);
                        valid.setMessage(users.get(0).getName());
                        valid.setCodeError(0);

                    } else {
                        valid.setCodeError(1);
                    }
                    
                } else {
                     valid.setCodeError(1);
                }
            } else {
                valid.setCodeError(2);
            }
        }
        return valid;
    }
    
    @RequestMapping(path = "/validateTadiAllIssueType", method = RequestMethod.POST)
    public ValidDTO validateTadiAllIssueType(@RequestBody ValidateTadiDTO validate) {
        ValidDTO valid = new ValidDTO();
        valid.setValid(false);
        if (validate.getTadi() != null) {
            List<AppUser> users = userRepository.findByTadi(validate.getTadi());
            
            if (users != null && users.size() > 0) {
  
                List<Team> responseUserArea = teamRepository.findByAppUserAndIssueTypeIsNotNullAndActive(users.get(0), true);

                if (responseUserArea != null && responseUserArea.size() > 0) {
                    valid.setValid(true);
                    valid.setMessage(users.get(0).getName());
                    valid.setCodeError(0);
                } else {
                    valid.setCodeError(2);
                }  

            } else {
                valid.setCodeError(2);
            }
        }
        return valid;
    }
    
    

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public TeamDTO getTeamById(@PathVariable("id") Long id) {
        Optional<Team> present = teamRepository.findById(id);
        if (present.isPresent()) {
            Team team = present.get();
            TeamDTO teamDto = new TeamDTO();
            teamDto.setAssetDesc(team.getAsset().getName());
            teamDto.setAssetID(team.getAsset().getId());
            teamDto.setEmail(team.getAppUser().getEmail());
            teamDto.setEscalationRuleDesc(team.getEscalationRule().getDescEscalationRule());
            teamDto.setEscalationRuleId(team.getEscalationRule().getId());
            teamDto.setEscalationTypeDesc(team.getEscalationRule().getEscalationType().getDescEscalationType());
            teamDto.setEscalationTypeId(team.getEscalationRule().getEscalationType().getId());
            teamDto.setId(team.getId());
            teamDto.setName(team.getAppUser().getName());
            teamDto.setTadi(team.getAppUser().getTadi());
            teamDto.setUserId(new Long(team.getAppUser().getId()));
            teamDto.setIssueTypeId(team.getIssueType().getId());
            teamDto.setIssueTypeDesc(team.getIssueType().getDescIssueType());
            return teamDto;
        }
        return null;
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    public ResponseDTO save(@RequestBody TeamDTO team) {
        ResponseDTO response = new ResponseDTO();
        response.setCode(0);
        response.setMessage("OK");
        if (team.getAssets() != null) {
            List<Long> added = new ArrayList<>();
            for (Long assetId : team.getAssets()) {
                Team newTeam = new Team();
                Asset asset = assetRepository.getOne(assetId);
                newTeam.setLocation(asset.getLocation());
                newTeam.setAsset(asset);
                newTeam.setCreatedAt(new Date());
                newTeam.setCreatedBy("-");
                newTeam.setCreationDate(new Date());
                newTeam.setLastUpdatedBy("-");
                newTeam.setLastUpdateDate(new Date());
                newTeam.setEscalationRule(new EscalationRule(team.getEscalationRuleId()));
                AppUser user = new AppUser();
                user.setId(team.getUserId() + "");
                newTeam.setAppUser(user);
                newTeam.setIssueType(new IssueType(team.getIssueTypeId()));
                newTeam.setActive(true);
                
                try {
                    newTeam = teamRepository.save(newTeam);
                } catch (Exception e) {
                    response.setCode(-1);
                    response.setMessage("Usuario ya existe con los mismos parámetros");
                }
                
                added.add(newTeam.getId());
            }
            response.setObject(added);
        }
        return response;
    }

    @RequestMapping(path = "", method = RequestMethod.PUT)
    public ResponseDTO update(@RequestBody TeamDTO team) {
        ResponseDTO response = new ResponseDTO();
        response.setCode(0);
        response.setMessage("OK");
        Optional<Team> obj = teamRepository.findById(team.getId());
        if (obj.isPresent()) {
            Team update = obj.get();
            System.out.println(update.getId());
            update.setAsset(new Asset(team.getAssetID()));
            update.setLastUpdatedBy("-");
            update.setLastUpdateDate(new Date());
            update.setEscalationRule(new EscalationRule(team.getEscalationRuleId()));
            update.setIssueType(new IssueType(team.getIssueTypeId()));
            update.setActive(true);
            AppUser user = new AppUser();
            user.setId(team.getUserId() + "");
            update.setAppUser(user);
            teamRepository.save(update);
        } else {
            response.setCode(-1);
            response.setMessage("Error");
        }
        return response;
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public Long delete(@PathVariable("id") Long id) {
        Optional<Team> obj = teamRepository.findById(id);
        if (obj.isPresent()) {
            Team update = obj.get();
            update.setActive(false);
            update.setLastUpdateDate(new Date());
            update.setLastUpdatedBy("modificado");
            teamRepository.save(update);
            return 1L;
        }
        return 0L;
    }

    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    public ResponseDTO deleteRecords(@RequestBody List<Long> ids) {
        ResponseDTO response = new ResponseDTO();
        response.setCode(0);
        response.setMessage("OK");
        List<Long> deleted = new ArrayList<>();
        for (Long id : ids) {
            Optional<Team> obj = teamRepository.findById(id);
            if (obj.isPresent()) {
                Team update = obj.get();
                update.setActive(false);
                update.setLastUpdateDate(new Date());
                update.setLastUpdatedBy("modificado");
                Team saved = teamRepository.save(update);
                deleted.add(saved.getId());
            }
        }
        response.setObject(deleted);
        return response;
    }

    private List<TeamDTO> getTeamsByAsset(List<Team> list) {
        List<TeamDTO> response = new ArrayList<>();
        list.stream().map((team) -> {
            TeamDTO teamDto = new TeamDTO();
            teamDto.setAssetDesc(team.getAsset().getName());
            teamDto.setAssetID(team.getAsset().getId());
            teamDto.setEmail(team.getAppUser().getEmail());
            teamDto.setEscalationRuleDesc(team.getEscalationRule().getDescEscalationRule());
            teamDto.setEscalationRuleId(team.getEscalationRule().getId());
            teamDto.setEscalationTypeDesc(team.getEscalationRule().getEscalationType().getDescEscalationType());
            teamDto.setEscalationTypeId(team.getEscalationRule().getEscalationType().getId());
            teamDto.setId(team.getId());
            teamDto.setName(team.getAppUser().getName());
            teamDto.setTadi(team.getAppUser().getTadi());
            teamDto.setUserId(new Long(team.getAppUser().getId()));
            teamDto.setUsername(team.getAppUser().getUsername());
            teamDto.setIssueTypeId(team.getIssueType().getId());
            teamDto.setIssueTypeDesc(team.getIssueType().getDescIssueType());
            teamDto.setActive(team.isActive());
            return teamDto;
        }).forEachOrdered((teamDto) -> {
            response.add(teamDto);
        });
        return response;
    }
    
    @RequestMapping(path = "/activate", method = RequestMethod.POST)
    public ResponseDTO activate(@RequestBody TeamDTO team) {
        ResponseDTO response = new ResponseDTO();
        response.setCode(0);
        response.setMessage("OK");
        Optional<Team> obj = teamRepository.findById(team.getId());
        if (obj.isPresent()) {
            Team update = obj.get();
            update.setActive(true);
            update.setLastUpdateDate(new Date());
            update.setLastUpdatedBy("activado");
            teamRepository.save(update);
        } else {
            response.setCode(-1);
            response.setMessage("Error");
        }
        return response;
    }

}
