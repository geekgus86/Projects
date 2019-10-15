package com.iusa.clases.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;

public class PreLogin  {

	private String user;
	private int existe;
	Session session;
	
	public PreLogin(){
		session=HibernateUtil.getSessionFactory().openSession();
	}
	
	public String execute() {
	
	HttpServletRequest request = ServletActionContext.getRequest();
    HttpSession sesion = request.getSession();
    
    if(sesion!=null){
    	this.user=(String) sesion.getAttribute("usuario");
    }
    
    
    if(user==null){
    	existe=0;
    }else{
    	existe=1;
    }
	
    return "success";
    
	}
	
	public int getExiste() {
		return existe;
	}
	public void setExiste(int existe) {
		this.existe = existe;
	}
	
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}


	
}
