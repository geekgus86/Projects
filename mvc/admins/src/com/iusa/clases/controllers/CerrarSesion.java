package com.iusa.clases.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

public class CerrarSesion extends ActionSupport {
	
	
	
	public String execute() {
		
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
	    user=(String) sesion.getAttribute("usuario");
	    
	    
	    if(sesion!=null){
	    	sesion.setAttribute("usuario", null);
	    	user=(String) sesion.getAttribute("usuario");
	    	sesion.invalidate();
	    }
	    
	    
	    return SUCCESS;
		
	}
	
	

}
