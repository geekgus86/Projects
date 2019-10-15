/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 *
 * @author azbel.trinidad
 */
public class ResponseDTO {
    
    private Integer code;
    private String message;    
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object object;

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    
    
}
