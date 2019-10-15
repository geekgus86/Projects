/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.controller;

import com.metalsa.admin.dto.ResponseDTO;
import com.metalsa.admin.dto.tool.ToolDTO;
import com.metalsa.admin.entity.Asset;
import com.metalsa.admin.entity.Tool;
import com.metalsa.admin.repository.AssetRepository;
import com.metalsa.admin.repository.ToolRepository;
import com.metalsa.admin.util.Util;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author azbel.trinidad
 */
@RestController
@RequestMapping("/api/tool")
@CrossOrigin
public class ToolController {

    @Autowired
    ToolRepository toolRepository;
    @Autowired
    AssetRepository assetRepository;

    private final static Logger LOGGER = Logger.getLogger(ToolController.class);

    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<ToolDTO> getTools() {
        List<Tool> findAll = toolRepository.findAll();

        List<ToolDTO> response = new ArrayList<>();
        if (findAll != null) {
            findAll.stream().map((tool) -> {
                ToolDTO dto = new ToolDTO();
                dto.setCreatedAt(tool.getCreatedAt() != null ? Util.formateaFechaYMD(tool.getCreatedAt()) : null);
                dto.setDescTool(tool.getDescTool());
                dto.setDesignSpeed(tool.getDesignSpeed());
                dto.setId(tool.getId());
                dto.setJobNumber(tool.getJobNumber());
                dto.setNoRollo(tool.getNoRollo());
                dto.setPzPerStroke(tool.getPzPerStroke());
                dto.setToolType(tool.getToolType());
                dto.setAssetId(tool.getAsset().getId());
                dto.setLocation(tool.getLocation().getDescription());
                dto.setActive(tool.getActive());
                dto.setAssetDesc(tool.getAsset().getName());
                return dto;
            }).forEachOrdered((dto) -> {
                response.add(dto);
            });
        }
        return response;
    }

    @RequestMapping(path = "/asset/{id}", method = RequestMethod.GET)
    public List<ToolDTO> getToolsByAsset(@PathVariable("id") Long id) {
        List<Tool> findAll = toolRepository.findByAssetId(id);

        List<ToolDTO> response = new ArrayList<>();
        findAll.stream().map((tool) -> {
            ToolDTO dto = new ToolDTO();
            dto.setCreatedAt(tool.getCreatedAt() != null ? Util.formateaFechaYMD(tool.getCreatedAt()) : null);
            dto.setDescTool(tool.getDescTool());
            dto.setDesignSpeed(tool.getDesignSpeed());
            dto.setId(tool.getId());
            dto.setJobNumber(tool.getJobNumber());
            dto.setNoRollo(tool.getNoRollo());
            dto.setPzPerStroke(tool.getPzPerStroke());
            dto.setToolType(tool.getToolType());
            dto.setAssetId(tool.getAsset().getId());
            dto.setLocation(tool.getLocation().getDescription());
            dto.setActive(tool.getActive());
            dto.setAssetDesc(tool.getAsset().getName());
            return dto;
        }).forEachOrdered((dto) -> {
            response.add(dto);
        });
        return response;
    }

    @RequestMapping(path = "/location/{loc}", method = RequestMethod.GET)
    public List<ToolDTO> getToolsByLocation(@PathVariable("loc") String loc) {
        List<Tool> findAll = toolRepository.findByLocation(loc);

        List<ToolDTO> response = new ArrayList<>();
        findAll.stream().map((tool) -> {
            ToolDTO dto = new ToolDTO();
            dto.setCreatedAt(tool.getCreatedAt() != null ? Util.formateaFechaYMD(tool.getCreatedAt()) : null);
            dto.setDescTool(tool.getDescTool());
            dto.setDesignSpeed(tool.getDesignSpeed());
            dto.setId(tool.getId());
            dto.setJobNumber(tool.getJobNumber());
            dto.setNoRollo(tool.getNoRollo());
            dto.setPzPerStroke(tool.getPzPerStroke());
            dto.setToolType(tool.getToolType());
            dto.setAssetId(tool.getAsset().getId());
            dto.setLocation(tool.getLocation().getDescription());
            dto.setActive(tool.getActive());
            dto.setAssetDesc(tool.getAsset().getName());
            return dto;
        }).forEachOrdered((dto) -> {
            response.add(dto);
        });
        return response;
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ToolDTO getTool(@PathVariable("id") Long id) {
        return getToolById(id);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    public ResponseDTO save(@RequestBody ToolDTO tool) {
        ResponseDTO response = new ResponseDTO();
        response.setCode(0);
        response.setMessage("OK");
        
        if (tool.getAssets() != null) {
            List<Long> added = new ArrayList<>();
            List<String> tools = new ArrayList<>();
            
            for (Long assetId : tool.getAssets()) {
                Tool newTool = new Tool();
                newTool.setActive(true);
                newTool.setCreatedAt(new Date());
                newTool.setDescTool(tool.getDescTool());
                newTool.setDesignSpeed(tool.getDesignSpeed());
                newTool.setJobNumber(tool.getJobNumber());
                newTool.setNoRollo(tool.getNoRollo());
                newTool.setPzPerStroke(tool.getPzPerStroke());
                newTool.setToolType((tool.getToolType() == 2) ? null : tool.getToolType());
                Asset asset = assetRepository.getOne(assetId);
                newTool.setLocation(asset.getLocation());
                newTool.setAsset(asset);
                newTool.setCreationDate(new Date());
                newTool.setLastUpdateDate(new Date());
                newTool.setCreatedBy("creado");
                newTool.setLastUpdatedBy("creado");
                try {
                    newTool = toolRepository.save(newTool);
                    added.add(newTool.getId());
                }catch ( Exception e ) {
                    tools.add(asset.getName());
                    LOGGER.error(e.getMessage());
                }

            }
            if(added.isEmpty()) {
                response.setCode(2);
                response.setMessage("No se agrego ninguna herramienta para las prensas " + tools + ", favor de reactivarlas.");
            } else if(added.size() != tool.getAssets().size()) {
                response.setCode(1);
                response.setMessage("La herramienta para la prensa " + tools + " no se agrego, favor de reactivarla.");
            }
            response.setObject(response.getCode() == 2 ? null : added);
        }
        return response;
    }

    @RequestMapping(path = "", method = RequestMethod.PUT)
    public ResponseDTO update(@RequestBody ToolDTO tool) {
        System.out.println(tool);
        ResponseDTO response = new ResponseDTO();
        response.setCode(0);
        response.setMessage("OK");
        Tool update = toolRepository.findById(tool.getId());
        if (update != null) {
            update.setActive(tool.getActive() != null ? tool.getActive() : update.getActive());
            update.setDescTool(tool.getDescTool() != null ? tool.getDescTool() : update.getDescTool());
            update.setDesignSpeed(tool.getDesignSpeed() != null ? tool.getDesignSpeed() : update.getDesignSpeed());
            update.setJobNumber(tool.getJobNumber() != null ? tool.getJobNumber() : update.getJobNumber());
            update.setNoRollo(tool.getNoRollo() != null ? tool.getNoRollo() : update.getNoRollo());
            update.setPzPerStroke(tool.getPzPerStroke() != null ? tool.getPzPerStroke() : update.getPzPerStroke());
            //update.setToolType(tool.getToolType() != null ? tool.getToolType() : update.getToolType());
            update.setToolType((tool.getToolType() == null || tool.getToolType() == 2)  ? null : tool.getToolType());
            update.setLastUpdateDate(new Date());
            update.setLastUpdatedBy("modificado");
            Tool saved = toolRepository.save(update);
            response.setObject(getToolById(saved.getId()));
        }
        return response;
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseDTO delete(@PathVariable("id") Long id) {
        ResponseDTO response = new ResponseDTO();
        response.setCode(0);
        response.setMessage("OK");
        Tool update = toolRepository.findById(id);
        if (update != null) {
            update.setActive(false);
            update.setLastUpdateDate(new Date());
            update.setLastUpdatedBy("modificado");
            Tool saved = toolRepository.save(update);
            response.setObject(getToolById(saved.getId()));
        }
        return response;
    }

    @RequestMapping(path = "/activate/{id}", method = RequestMethod.PUT)
    public ResponseDTO activate(@PathVariable("id") Long id) {
        ResponseDTO response = new ResponseDTO();
        response.setCode(0);
        response.setMessage("OK");
        Tool update = toolRepository.findById(id);
        if (update != null) {
            update.setActive(true);
            update.setLastUpdatedBy("reactivado");
            Tool saved = toolRepository.save(update);
            response.setObject(saved.getId());
        }
        return response;
    }

    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    public ResponseDTO deleteRecords(@RequestBody List<Long> ids) {
        ResponseDTO response = new ResponseDTO();
        response.setCode(0);
        response.setMessage("OK");
        List<Long> deleted = new ArrayList<>();
        for (Long id : ids) {
            Tool update = toolRepository.findById(id);
            if (update != null) {
                update.setActive(false);
                update.setLastUpdateDate(new Date());
                update.setLastUpdatedBy("modificado");
                Tool saved = toolRepository.save(update);
                deleted.add(saved.getId());
            }
        }
        response.setObject(deleted);
        return response;
    }

    private ToolDTO getToolById(Long id) {
        Tool tool = toolRepository.findById(id);
        if (tool == null) {
            return null;
        }
        ToolDTO dto = new ToolDTO();
        dto.setCreatedAt(tool.getCreatedAt() != null ? Util.formateaFechaYMD(tool.getCreatedAt()) : null);
        dto.setDescTool(tool.getDescTool());
        dto.setDesignSpeed(tool.getDesignSpeed());
        dto.setId(tool.getId());
        dto.setJobNumber(tool.getJobNumber());
        dto.setNoRollo(tool.getNoRollo());
        dto.setPzPerStroke(tool.getPzPerStroke());
        dto.setToolType(tool.getToolType());
        dto.setAssetId(tool.getAsset().getId());
        dto.setLocation(tool.getLocation().getDescription());
        dto.setActive(tool.getActive());
        dto.setAssetDesc(tool.getAsset().getName());
        return dto;
    }
}
