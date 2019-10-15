package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class QuitarNacional extends ActionSupport {
	
	private String idVacante;
	
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	Session session;
	
	
	public QuitarNacional(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	public String giveMe() {
		
		
		Transaction tr = session.beginTransaction();
		  
		  try{
			  
			  
			  String secureIdVac = escapeChars(idVacante);
			  
			  
			    String sql2="UPDATE \"vacante\" SET  \"vacante\".\"destacado_nacional\" = '0'  WHERE \"vacante\".\"id_vacante\" = :idVacante ";
		        Query query2 = session.createSQLQuery(sql2);
		        query2.setParameter("idVacante", secureIdVac);
		        query2.executeUpdate();
		        
		        
		        
		        HashMap<String, Object> itemMap = new HashMap<String, Object>();
	        	
	        	String mensaje1 = "Se ha quitado de Destacados";
	        	itemMap.put("mensajes", mensaje1);
	        	items.add(itemMap);
			
		        
		        
		        
		       tr.commit();
		  }catch(Exception e){
			 
			  tr.rollback();
		  }
		  
		  jsonData.put("Mensajes", items);
		
		
		return SUCCESS;
	}


	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
	}


	public void setJsonData(LinkedHashMap<String, Object> jsonData) {
		this.jsonData = jsonData;
	}
	
	


	public Set<Map<String, Object>> getItems() {
		return items;
	}


	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}
	
	
	public String getIdVacante() {
		return idVacante;
	}


	public void setIdVacante(String idVacante) {
		this.idVacante = idVacante;
	}

}
