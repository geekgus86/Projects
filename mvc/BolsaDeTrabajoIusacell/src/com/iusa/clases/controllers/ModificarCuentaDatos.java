package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.opensymphony.xwork2.ActionSupport; //PERMITIENDO LA INTERACCION DE ACTION

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;
import org.hibernate.Session;

import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.iusa.clases.models.*;

public class ModificarCuentaDatos extends ActualizarDatos{
	public String newemail;
	public String newpass;
	public String oldmail;
	public String oldpass;
	public String olduser;
    Session session=HibernateUtil.getSessionFactory().openSession();
    
	public String execute(){
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
    	
    	Transaction tr = session.beginTransaction();
    	try{
    	this.user=escapeChars((String) sesion.getAttribute("usuario"));
    	 String sql = "SELECT \"usuario\".\"id_postulante\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:user";
         Query query = session.createSQLQuery(sql).setParameter("user", user);
         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
         List data = query.list();
         for (Object object : data) {
         	Map row = (Map) object;
         	  this.idUsuario=(BigDecimal)row.get("id_postulante");
         	}
		
         
         String sqloldpass = "SELECT \"usuario\".\"password\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:user";
         Query queryoldpass = session.createSQLQuery(sqloldpass).setParameter("user", user);
         queryoldpass.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
         List dataoldpass = queryoldpass.list();
         for (Object object : dataoldpass) {
         	Map row = (Map) object;
         	  this.oldpass=(String)row.get("password");
         	}
         
         String sqloldmail = "SELECT \"usuario\".\"correo_electronico\",\"usuario\".\"usuario_nombre\" FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:user";
         Query queryoldmail = session.createSQLQuery(sqloldmail).setParameter("user", user);
         queryoldmail.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
         List dataoldmail = queryoldmail.list();
         for (Object object : dataoldmail) {
         	Map row = (Map) object;
         	  this.olduser=(String)row.get("usuario_nombre");
         	  this.oldmail=(String)row.get("correo_electronico");
         	}
	
         
         
         if(!(newemail.equals("sin cambios"))){
        	
             String sql2 = "UPDATE \"usuario\" SET \"usuario\".\"correo_electronico\"=:newemail,\"usuario\".\"usuario_nombre\"=:newemail WHERE \"usuario\".\"id_postulante\"=:idUsuario";
    	        Query query2 = session.createSQLQuery(sql2).setParameter("newemail", newemail).setParameter("newemail", newemail).setParameter("idUsuario", idUsuario);
    	        query2.executeUpdate();
    	        
    	        sesion.setAttribute("usuario",newemail);

         }
         
         if(!(newpass.equals("sin cambios"))){
             String sql3 = "UPDATE \"usuario\" SET \"usuario\".\"password\"=:newpass WHERE \"usuario\".\"id_postulante\"=:idUsuario";
    	        Query query3 = session.createSQLQuery(sql3).setParameter("newpass", newpass).setParameter("idUsuario", idUsuario);
    	        query3.executeUpdate();
    	    
    	        

         }
		
         tr.commit(); 
    	}catch(Exception e){
    		e.printStackTrace();
    		tr.rollback();
    	}
		return "success";
	}
	
	 public String escapeChars(String cadena)throws CaracterNoValidoException{

		   	String escapedString="";
		  
		   	if(cadena.matches("[0-9a-zA-Z\\s._@-]*")){
		   		
		   		String reg = "[=;*|()%#!&?]";
		   		   
		       	escapedString= cadena.replaceAll(reg,"");
		   		
		   	}else{
		   		
		   		throw new CaracterNoValidoException();
		   		
		   	}
		   	
		   	
		   	return escapedString;
		   }
	
	public void setNewemail(String newemail) {
		try{
		this.newemail = escapeChars(newemail);
		}catch(CaracterNoValidoException e){
			e.printStackTrace();
		}
	}

	public String getNewemail() {
		return newemail;
	}

	public void setNewpass(String newpass) {
		try{
		this.newpass = escapeChars(newpass);
		}catch(CaracterNoValidoException e){
			e.printStackTrace();
		}
	}

	public String getNewpass() {
		return newpass;
	}
}
