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

public class VerDestacadosRegionales extends ActionSupport {
	
	private BigDecimal numeroDestaRegio;
	
	private String ubicacion;
	private String nivel;
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	Session session;
	
	
	public VerDestacadosRegionales(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}

	
	
	public String giveMe() {
		
		 Transaction tr = session.beginTransaction();
		  
		  try{
			  
			  
			  String secureRegion = escapeChars(ubicacion);
			  
			  String secureRegNiv = escapeChars(nivel);
			  	
			  	if(secureRegNiv.equals("2")){
			  String sql2 = "SELECT Count(\"vacante\".\"id_vacante\")AS NUMEROREGIONALES FROM \"vacante\" WHERE \"vacante\".\"destacado\" != '0'";
		      Query query2 = session.createSQLQuery(sql2);		        
		      query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		      List data = query2.list();
		      for (Object object : data) {
		        	Map row = (Map) object;
		        	this.numeroDestaRegio=(BigDecimal)row.get("NUMEROREGIONALES");
		       }
		        
		      HashMap<String, Object> itemMap = new HashMap<String, Object>();
	        	
	        	String mensaje1 = "Restantes: "+numeroDestaRegio;
	        	itemMap.put("error1", mensaje1);
	        	items.add(itemMap);
			  	}else{
			  	  String sql2 = "SELECT Count(\"vacante\".\"id_vacante\")AS NUMEROREGIONALES FROM \"vacante\" WHERE \"vacante\".\"destacado\" != '0' AND \"vacante\".\"ubicacion\" LIKE :ubicacion  ";
			      Query query2 = session.createSQLQuery(sql2);		        
			      query2.setParameter("ubicacion", '%'+secureRegion+'%');
			      query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			      List data = query2.list();
			      for (Object object : data) {
			        	Map row = (Map) object;
			        	this.numeroDestaRegio=(BigDecimal)row.get("NUMEROREGIONALES");
			       }
			        
			      HashMap<String, Object> itemMap = new HashMap<String, Object>();
		        	
		        	String mensaje1 = "Restantes: "+numeroDestaRegio;
		        	itemMap.put("error1", mensaje1);
		        	items.add(itemMap);
		        	
			  	}
		        
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

	public BigDecimal getNumeroDestaRegio() {
		return numeroDestaRegio;
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






	public String getUbicacion() {
		return ubicacion;
	}



	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}

}
