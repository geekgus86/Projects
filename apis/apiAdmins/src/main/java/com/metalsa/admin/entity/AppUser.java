/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.metalsa.admin.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author palacios
 */
@Entity
@Table(name = "AppUser", schema = "admins")
public class AppUser {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private String id;
    @Column
    private String name;
    @Column
    private String email;
    @Column
    private String username;
    @Column
    private String password_digest;
    @Column
    private String confirmation_token;
    @Column
    private String confirmed_at;
    @Column
    private String confirmation_sent_at;
    @Column
    private String created_at;
    @Column
    private String updated_at;
    @Column
    private String photo;
    @Column
    private String employee_id;
    @Column
    private String tadi;
    @Column
    private String os_id;
    @Column
    private String role_id;
    @Column
    private String push_token;
    @Column
    private String notification_token;
    @Column
    private String GroupID;
    @Column
    private String LocaleID;
    @Column
    private String location;
    @Column
    private String appId;
    @Column
    private String appUserId;
    @Column 
    private String enabled;
    
    public AppUser() {
    }
    
    public AppUser(String tadi) {
        this.tadi = tadi;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword_digest() {
        return password_digest;
    }

    public void setPassword_digest(String password_digest) {
        this.password_digest = password_digest;
    }

    public String getConfirmation_token() {
        return confirmation_token;
    }

    public void setConfirmation_token(String confirmation_token) {
        this.confirmation_token = confirmation_token;
    }

    public String getConfirmed_at() {
        return confirmed_at;
    }

    public void setConfirmed_at(String confirmed_at) {
        this.confirmed_at = confirmed_at;
    }

    public String getConfirmation_sent_at() {
        return confirmation_sent_at;
    }

    public void setConfirmation_sent_at(String confirmation_sent_at) {
        this.confirmation_sent_at = confirmation_sent_at;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public String getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(String updated_at) {
        this.updated_at = updated_at;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getEmployee_id() {
        return employee_id;
    }

    public void setEmployee_id(String employee_id) {
        this.employee_id = employee_id;
    }

    public String getTadi() {
        return tadi;
    }

    public void setTadi(String tadi) {
        this.tadi = tadi;
    }

    public String getOs_id() {
        return os_id;
    }

    public void setOs_id(String os_id) {
        this.os_id = os_id;
    }

    public String getRole_id() {
        return role_id;
    }

    public void setRole_id(String role_id) {
        this.role_id = role_id;
    }

    public String getPush_token() {
        return push_token;
    }

    public void setPush_token(String push_token) {
        this.push_token = push_token;
    }

    public String getNotification_token() {
        return notification_token;
    }

    public void setNotification_token(String notification_token) {
        this.notification_token = notification_token;
    }

    public String getGroupID() {
        return GroupID;
    }

    public void setGroupID(String GroupID) {
        this.GroupID = GroupID;
    }

    public String getLocaleID() {
        return LocaleID;
    }

    public void setLocaleID(String LocaleID) {
        this.LocaleID = LocaleID;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(String appUserId) {
        this.appUserId = appUserId;
    }

    public String getEnabled() {
        return enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
    
    
}
