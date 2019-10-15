package com.iusa.clases.controllers;


import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.opensymphony.xwork2.ActionSupport;

public class Login extends ActionSupport implements SessionAware {
private String username;
private String password;
private String user;
private int existe;
Session session;

private Map<String,Object> s2session;
@Override
public void setSession(Map<String,Object> s2session) {
  this.s2session = s2session;
}



public Login(){
	session=HibernateUtil.getSessionFactory().getCurrentSession();
	
}

@SuppressWarnings("unchecked")
public String execute() {
	Transaction tr = session.beginTransaction();
	try{

		String query="SELECT \"usuario\".\"id_postulante\" FROM \"usuario\" WHERE \"usuario\".\"usuario_nombre\"= :username AND \"usuario\".\"password\"=:password";
		
		Query forlogin = session.createSQLQuery(query).setParameter("username", username).setParameter("password", password);

		if (forlogin.list().size()==1) {
	

			HttpServletRequest request = ServletActionContext.getRequest();
		    HttpSession sesion = request.getSession();
		    sesion.setAttribute("usuario", username);

		    System.out.print(query);
		    tr.commit();
		    
		   
	        
	        if(sesion!=null){
	        	this.setUser((String) sesion.getAttribute("usuario"));
	        	this.setExiste(1);
		    }
	        
		    
		    return "success";

		} else {
			
			this.setExiste(0);
			
			addActionError("Datos Incorrectos");
			tr.commit();
				return "error";
		}
	}catch(Exception e){

		tr.rollback();
		return "error";
	}
}
public String getUsername() {
return username;
}
public void setUsername(String username) {
	try{
		this.username = escapeChars(username);
	}catch(CaracterNoValidoException e){
		e.printStackTrace();
	}
}
public String getPassword() {
return password;
}
public void setPassword(String password) {
	
	try{
		this.password = escapeChars(password);
	}catch(CaracterNoValidoException e){
		e.printStackTrace();
	}
}

public String escapeChars(String cadena)throws CaracterNoValidoException{

   	String escapedString="";
  
   	if(cadena.matches("[0-9a-zA-Z._@-]*")){
   		
   		String reg = "[=;*|()%#!&?]";
   		   
       	escapedString= cadena.replaceAll(reg,"");
   		
   	}else{
   		
   		throw new CaracterNoValidoException();
   		
   	}
   	
   	
   	return escapedString;
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
	try{
	this.user = escapeChars(user);
	}catch(CaracterNoValidoException e){
		e.printStackTrace();
	}
}
}
