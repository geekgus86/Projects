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
public class LocationDTO {
    
    private Integer id;
    private String name;
    private String description;
    private String timezone;
    
    public LocationDTO() { }

    public LocationDTO(Integer id, String name, String description, String timezone) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.timezone = timezone;
    }

    public LocationDTO(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }
}
