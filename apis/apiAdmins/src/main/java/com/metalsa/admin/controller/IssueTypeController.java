/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.controller;

import com.metalsa.admin.dto.IssueTypeDTO;
import com.metalsa.admin.dto.TeamDTO;
import com.metalsa.admin.entity.Asset;
import com.metalsa.admin.entity.IssueType;
import com.metalsa.admin.repository.IssueTypeRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author azbel.trinidad
 */
@RestController
@RequestMapping("/api/issueType")
@CrossOrigin
public class IssueTypeController {

    @Autowired
    IssueTypeRepository issueTypeRepository;

    @RequestMapping(path = "/asset/{id}", method = RequestMethod.GET)
    public List<IssueTypeDTO> getTeamsByAsset(@PathVariable("id") Long id) {
        List<IssueTypeDTO> response = new ArrayList<>();
        issueTypeRepository.findByAssetAndActive(new Asset(id), true).forEach((issueType) -> {
            if (issueType.getShortDesc() != null) {
                IssueTypeDTO dto = new IssueTypeDTO();
                dto.setDescription(issueType.getDescIssueType());
                dto.setId(issueType.getId());
                dto.setShortDesc(issueType.getShortDesc());
                response.add(dto);
            }
        });
        return response;
    }

}
