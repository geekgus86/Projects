/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.controller;

import com.metalsa.admin.dto.AssetDTO;
import com.metalsa.admin.entity.Asset;
import com.metalsa.admin.repository.AssetRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
@RequestMapping("/api/asset")
@CrossOrigin
public class AssetController {
    
    @Autowired
    AssetRepository assetRepository;
    
    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<AssetDTO> getAssets() {
        return getAssetsDto(assetRepository.findAll());
    }
    
    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public AssetDTO getAssetById(@PathVariable("id") Long id) {
        Optional<Asset> findById = assetRepository.findById(id);
        return findById.isPresent() ? getAssetDto(findById.get()) : null;
    }
    
    @RequestMapping(path = "/location/{loc}", method = RequestMethod.GET)
    public List<AssetDTO> getAssetsByLocation(@PathVariable("loc") String loc) {
        return getAssetsDto(assetRepository.findByLocationName(loc));
    }
    
    private List<AssetDTO> getAssetsDto(List<Asset> list) {
        List<AssetDTO> response = new ArrayList<>();
        list.forEach((asset) -> {
            response.add(new AssetDTO(asset.getId(), asset.getNbtid(), asset.getName(), asset.getLocation().getDescription()));
        });
        return response;
    }
    
    private AssetDTO getAssetDto(Asset asset) {
        return new AssetDTO(asset.getId(), asset.getNbtid(), asset.getName(), asset.getLocation().getDescription());
    }
    
}
