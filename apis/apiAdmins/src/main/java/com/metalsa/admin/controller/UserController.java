/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.controller;


import com.google.gson.Gson;
import com.metalsa.admin.dto.CredentialsDTO;
import com.metalsa.admin.dto.FindUserDTO;
import com.metalsa.admin.dto.UserDTO;
import com.metalsa.admin.entity.AppUser;
import com.metalsa.admin.repository.AppUserRepository;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.metalsa.admin.repository.UserRepository;
import com.metalsa.admin.util.Util;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author palacios
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {
    
    @Autowired
    UserRepository userRepo;
    
    @Autowired
    AppUserRepository appUserRepo;
    
    private final static Logger logger = Logger.getLogger(UserController.class);
    
    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public List<UserDTO> getName(@PathVariable("name") String name) {
        ArrayList<UserDTO> response = new ArrayList<>();
        userRepo.findByFullNameLike("%"+name+"%").stream().forEach((user) -> {
            UserDTO us = new UserDTO();
            us.setFullName(user.getFullName());
            us.setBirth(user.getDATE_OF_BIRTH());
            us.setCoordinator(user.getCOORDINADOR());
            us.setEmail(user.getEMAIL_ADDRESS());
            us.setLocation(user.getLOCATION_CODE());
            us.setPosition(user.getPOSITION());
            response.add(us);
        });
        return response;
    }
    
    @RequestMapping(value = "/registered", method = RequestMethod.GET)
    public List<UserDTO> getRegistered() {
        ArrayList<UserDTO> response = new ArrayList<>();
        appUserRepo.findAll().stream().forEach((user) -> {
            UserDTO us = new UserDTO();
            us.setId(user.getId());
            us.setFullName(user.getName());
            us.setEmail(user.getEmail());
            us.setLocation(user.getLocation());
            us.setLocale(user.getLocaleID());
            us.setTadi(user.getTadi());
            us.setUsername(user.getUsername());
            us.setEnabled(user.getEnabled());
            response.add(us);
        });
        return response;
    }
    
    @RequestMapping(value = "/registered/{name}", method = RequestMethod.GET)
    public List<UserDTO> getRegisteredByName(@PathVariable("name") String name) {
        ArrayList<UserDTO> response = new ArrayList<>();
        appUserRepo.findByNameLike("%"+name+"%").stream().forEach((user) -> {
            UserDTO us = new UserDTO();
            us.setId(user.getId());
            us.setFullName(user.getName());
            us.setEmail(user.getEmail());
            us.setLocation(user.getLocation());
            us.setLocale(user.getLocaleID());
            us.setUsername(user.getUsername());
            us.setTadi(user.getTadi());
            us.setEnabled(user.getEnabled());
            response.add(us);
        });
        return response;
    }
    
    @RequestMapping(value = "/validaUsuario", method = RequestMethod.POST)
    public @ResponseBody String validaUsuario(@RequestBody CredentialsDTO credentials) {
        Map<String,String> resp = new TreeMap<>();
        Util util = new Util();
        AppUser appUser = appUserRepo.findByUsername(credentials.getUsuario());
        if(appUser != null){
            boolean isValid = BCrypt.checkpw(credentials.getPassword(), appUser.getPassword_digest());
            if(isValid){
                resp.put("user", credentials.getUsuario());
                resp.put("name", appUser.getName());
                resp.put("id", appUser.getId());
                resp.put("locale", appUser.getLocaleID());
                resp.put("token", util.generaToken(credentials.getUsuario(), null));
                resp.put("group", appUser.getGroupID());
            }
        }
        return new Gson().toJson(resp);
    }
    
    
    @RequestMapping(value = "/getByUsername", method = RequestMethod.POST)
    public AppUser getAppUserByUsername(@RequestBody FindUserDTO us) {
        return appUserRepo.findByUsername(us.getUsername());
    }
    
    
    @RequestMapping(value = "/addAppUser", method = RequestMethod.POST)
    public AppUser addAppUser(@RequestBody AppUser us) {
        us.setAppId("1");
        us.setAppUserId("0");
        us.setEnabled((us.getEnabled() == null) ? "1" : us.getEnabled());
        Optional<AppUser> op;
        AppUser record = null;
        if(us.getId() != null && !us.getId().isEmpty()){
            op = appUserRepo.findById(us.getId());
            record = op.get();
        }
        if(record == null ){
            record = appUserRepo.findByUsername(us.getUsername());
        }
        if(record!= null){
            if(us.getPassword_digest()==null){
                us.setPassword_digest(record.getPassword_digest());
            }
            if((us.getTadi() == null) || (us.getTadi().isEmpty())){
                us.setTadi(record.getTadi());
            }
            if((us.getLocaleID()== null) || (us.getLocaleID().isEmpty())){
                us.setLocaleID(record.getLocaleID());
            }
            us.setId(record.getId());
            us.setPush_token(record.getPush_token());
            us.setNotification_token(record.getNotification_token());
            us.setGroupID(record.getGroupID());
        }
        us.setLocaleID((us.getLocaleID() == null) ? "1": us.getLocaleID());
        if(us.getPassword_digest().length() < 60 ){
            us.setPassword_digest(BCrypt.hashpw(us.getPassword_digest(), BCrypt.gensalt()));
        }
        return appUserRepo.save(us);
    }
    
    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
    public boolean deleteUser(@RequestBody AppUser us) {
        try {
            
            AppUser record = appUserRepo.findByUsername(us.getUsername());
            if(record!=null){
                record.setEnabled("0");
                record.setPassword_digest(BCrypt.hashpw("6f9O5dE4pmmzt3pqES9E", BCrypt.gensalt()));
                appUserRepo.save(record);
            }
        } catch (Exception e) {
            return false;
        }
        
        return true;
    }
    
    @RequestMapping(value = "/updatePushToken", method = RequestMethod.POST)
    public boolean updatePushToken(@RequestBody AppUser us) {
        try {
            
            AppUser record = appUserRepo.findByUsername(us.getUsername());
            if(record!=null){
                record.setPush_token(us.getPush_token());
                record.setNotification_token(us.getNotification_token());
                appUserRepo.save(record);
            }
        } catch (Exception e) {
            return false;
        }
        
        return true;
    }
    
    
    @RequestMapping(value = "/updateLocale", method = RequestMethod.POST)
    public boolean updateLocale(@RequestBody AppUser us) {
        try {
            Optional<AppUser> op;
            op = appUserRepo.findById(us.getId());
            if(op!=null){
                AppUser record = op.get();
                record.setLocaleID(us.getLocaleID());
                appUserRepo.save(record);
            }
        } catch (Exception e) {
            return false;
        }
        
        return true;
    }

}