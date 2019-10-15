/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.dto;

/**
 *
 * @author azbel.trinidad
 */
public class AssetDTO {
    
    private Long id;
    private Long nbtid;
    private String name;
    private String location;
    
    public AssetDTO() { }

    public AssetDTO(Long id, Long nbtid, String name, String location) {
        this.id = id;
        this.nbtid = nbtid;
        this.name = name;
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNbtid() {
        return nbtid;
    }

    public void setNbtid(Long nbtid) {
        this.nbtid = nbtid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
    
}
