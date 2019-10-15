package com.iusa.clases.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.math.BigDecimal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


//import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;


public class ObtenerTalentos extends perfilUsuario{
	
	private String IdAdmin;
	

	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	public String execute(){
		Transaction tr = session.beginTransaction();
		try{
			
			HttpServletRequest request = ServletActionContext.getRequest();
		    HttpSession sesion = request.getSession();
		    this.IdAdmin=escapeChars(request.getParameter("IdAdmin"));
		    
			
		 
		 String sqlTal = "SELECT \"talento\".\"talento\",\"talento_aux\".\"porcentaje\",\"talento_aux\".\"color\",\"talento_aux\".\"grado\" FROM \"talento\",\"talento_aux\" WHERE \"talento\".\"id_talento\"=\"talento_aux\".\"id_talento\" AND \"talento_aux\".\"id_usuario\" = :IdAdmin ";
	     Query queryTal = session.createSQLQuery(sqlTal);
	     queryTal.setParameter("IdAdmin", IdAdmin);
	     System.out.println("Talentos JUP");
	     queryTal.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     List dataTal = queryTal.list();
	     for (Object object : dataTal) {
	     	Map rowTal = (Map) object;

	          HashMap<String, Object> itemMap = new HashMap<String, Object>();   
	            
	             itemMap.put("talento", (String) rowTal.get("talento"));
	             itemMap.put("porcentaje", (BigDecimal) rowTal.get("porcentaje"));
	             itemMap.put("color", (String) rowTal.get("color"));
	             itemMap.put("grado", (BigDecimal) rowTal.get("grado"));
	 	        
	 	        items.add(itemMap);
          	     
          	     
     	}
		
		
		
		jsonData.put("items", items);
		tr.commit();
		}catch(Exception e){
			
			tr.rollback();
		}
		return "success";
	
	}
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
		}
	
	public Set<Map<String, Object>> getItems() {
		return items;
		}

	public String getIdAdmin() {
		return IdAdmin;
	}

	public void setIdAdmin(String idAdmin) {
		IdAdmin = idAdmin;
	}

}
