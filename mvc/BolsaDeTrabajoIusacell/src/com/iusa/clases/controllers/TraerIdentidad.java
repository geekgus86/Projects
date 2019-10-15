package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.iusa.clases.models.Identidad_aux;


public class TraerIdentidad extends GuardarIdentidad{
	
	 private String categoria_identidad;
	
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
	        
	        String sql1 = "SELECT \"identidad\".\"identidad\" , \"identidad\".\"categoria_identidad\" FROM \"identidad\",\"identidad_aux\" WHERE \"identidad_aux\".\"id_identidad\"=\"identidad\".\"id_identidad\" AND \"identidad_aux\".\"id_usuario\"=:idUsuario AND \"identidad\".\"categoria_identidad\"=:categoria_identidad";
	        Query query1 = session.createSQLQuery(sql1).setParameter("idUsuario", idUsuario).setParameter("categoria_identidad", categoria_identidad);
	        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List data1 = query1.list();
	        for (Object object : data1) {
	        	Map row1 = (Map) object;
	        	
	        	 HashMap<String, Object> itemMap = new HashMap<String, Object>();       
	          	 itemMap.put("identidad", (String) row1.get("identidad"));
	          	 itemMap.put("categoria", (String) row1.get("categoria_identidad"));
	 	         items.add(itemMap);
	        	  
	        	}
	      
	        
	        jsonData.put("items", items);
	
	        tr.commit(); 
	        
	    }
		 catch(Exception e){
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
		
		public void setCategoria_identidad(String categoria_identidad){
			this.categoria_identidad=categoria_identidad;
		}
		
		public String getCategoria_identidad(){
			return categoria_identidad;
		}
		
	

}
