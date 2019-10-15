/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.controller;

import com.metalsa.admin.dto.escalation.EscalationRuleDTO;
import com.metalsa.admin.dto.escalation.EscalationTypeDTO;
import com.metalsa.admin.entity.EscalationRule;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import com.metalsa.admin.entity.EscalationType;
import com.metalsa.admin.repository.EscalationRuleRepository;
import com.metalsa.admin.repository.EscalationTypeRepository;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author alfredo.delangel02
 */
@RestController
@RequestMapping("/api/escalation")
@CrossOrigin
public class EscalationController {

    @Autowired
    EscalationRuleRepository escalationRuleRepository;

    @Autowired
    EscalationTypeRepository escalationTypeRepository;

    private final static Logger logger = Logger.getLogger(UserController.class);

    @RequestMapping(value = "/rule", method = RequestMethod.GET)
    public List<EscalationRuleDTO> getAllRules() {
        return getEscalationsRuleDto(escalationRuleRepository.findAll());
    }

    @RequestMapping(value = "/rule/type/{id}", method = RequestMethod.GET)
    public List<EscalationRuleDTO> getByEsclationRuleType(@PathVariable(name = "id") Long id) {
        return getEscalationsRuleDto(escalationRuleRepository.findByEscalationTypeId(id));
    }

    private List<EscalationRuleDTO> getEscalationsRuleDto(List<EscalationRule> list) {
        List<EscalationRuleDTO> response = new ArrayList<>();
        list.forEach((escRule) -> {
            response.add(
                    new EscalationRuleDTO(
                            escRule.getId(),
                            escRule.getLevelEscalation(),
                            escRule.getLimitEscalation(),
                            escRule.getDescEscalationRule(),
                            escRule.getColor(),
                            null,
                            escRule.getActive(),
                            escRule.getEscalationType().getId(),
                            escRule.getEscalationType().getDescEscalationType()
                    )
            );
        });
        return response;
    }

    @RequestMapping(value = "/type", method = RequestMethod.GET)
    public List<EscalationTypeDTO> getAllTypes() {
        List<EscalationType> list = escalationTypeRepository.findAll();
        List<EscalationTypeDTO> response = new ArrayList<>();
        list.forEach((escRule) -> {
            response.add(
                    new EscalationTypeDTO(
                            escRule.getId(),
                            escRule.getDescEscalationType(),
                            escRule.getOrganizationID(),
                            escRule.getActive()
                    )
            );
        });
        return response;
    }

}
