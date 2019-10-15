package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.iusa.clases.models.Habilidad;
import com.iusa.clases.interceptor.CaracterNoValidoException;


public class ActualizarHabilidad extends ActualizarDatos{

	public String habilidad;
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
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
		    
		    
		    
		    
		    
	        
	        	Habilidad h=new Habilidad();
	        	h.setIdUsuario(idUsuario);
	        	h.setHabilidad(habilidad);
	        	session.save(h);
	        	

	   	  tr.commit();
			}catch(HibernateException e){
				tr.rollback();
			}catch(Exception e){
				
				tr.rollback();
			}
		return "success";
		
	}
	
	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
		}
	
	public Set<Map<String, Object>> getItems() {
		return items;
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
	
}
