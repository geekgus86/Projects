/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.controller;

import com.metalsa.admin.dto.AssetDTO;
import com.metalsa.admin.dto.LocationDTO;
import com.metalsa.admin.entity.Asset;
import com.metalsa.admin.entity.Location;
import com.metalsa.admin.repository.AssetRepository;
import com.metalsa.admin.repository.LocationRepository;
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
@RequestMapping("/api/location")
@CrossOrigin
public class LocationController {
    
    @Autowired
    LocationRepository locationRepository;
    
    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<LocationDTO> getAssets() {
        return getLocationsDto(locationRepository.findAll());
    }
    
    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public LocationDTO getAssetById(@PathVariable("id") Integer id) {
        Optional<Location> loc = locationRepository.findById(id);
        return loc.isPresent() ? getLocationDto(loc.get()) : null;
    }
    
    private List<LocationDTO> getLocationsDto(List<Location> list) {
        List<LocationDTO> response = new ArrayList<>();
        list.forEach((loc) -> {
            response.add(new LocationDTO(loc.getId(), loc.getName(), loc.getDescription(), loc.getTimezone()));
        });
        return response;
    }
    
    private LocationDTO getLocationDto(Location loc) {
        return new LocationDTO(loc.getId(), loc.getName(), loc.getDescription(), loc.getTimezone());
    }
    
}
