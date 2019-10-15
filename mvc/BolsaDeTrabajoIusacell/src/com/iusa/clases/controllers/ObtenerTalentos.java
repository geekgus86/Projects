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

import com.iusa.clases.interceptor.CaracterNoValidoException;


public class ObtenerTalentos extends perfilUsuario{
	

	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	public String execute(){
		Transaction tr = session.beginTransaction();
		try{
		  HttpServletRequest request = ServletActionContext.getRequest();
		    HttpSession sesion = request.getSession();
			this.usuario=escapeChars((String) sesion.getAttribute("usuario"));
			String sql = "SELECT \"usuario\".\"id_postulante\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:usuario";
		    Query query = session.createSQLQuery(sql).setParameter("usuario", usuario);
		    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		    List data = query.list();
		    for (Object object : data) {
		    	Map row = (Map) object;
		    	  this.idUsuario=(BigDecimal)row.get("id_postulante");
		    	}
		 
		 String sqlTal = "SELECT \"talento\".\"talento\",\"talento_aux\".\"porcentaje\",\"talento_aux\".\"color\",\"talento_aux\".\"grado\" FROM \"talento\",\"talento_aux\" WHERE \"talento\".\"id_talento\"=\"talento_aux\".\"id_talento\" AND \"talento_aux\".\"id_usuario\"=:idUsuario ";
	     Query queryTal = session.createSQLQuery(sqlTal).setParameter("idUsuario", idUsuario);
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
	
	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
		}
	
	public Set<Map<String, Object>> getItems() {
		return items;
		}

}
