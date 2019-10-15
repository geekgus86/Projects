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

public class YaEsDestacadaNa extends ActionSupport {
	
	private BigDecimal yaEsDes;
	
	private String idVac;
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	Session session;
	
	
	public YaEsDestacadaNa(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}

	
	
	public String giveMe() {
		
		 Transaction tr = session.beginTransaction();
		  
		  try{
			  
			  String secureIdVac = escapeChars(idVac);
			  
			  String sql2 = " SELECT Count(\"vacante\".\"id_vacante\")AS YAESDESNACIO FROM \"vacante\" WHERE \"vacante\".\"destacado_nacional\" = '1' AND \"vacante\".\"id_vacante\" = :idVac  ";
		      Query query2 = session.createSQLQuery(sql2);		        
		      query2.setParameter("idVac", secureIdVac);
		      query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		      List data = query2.list();
		      for (Object object : data) {
		        	Map row = (Map) object;
		        	this.yaEsDes=(BigDecimal)row.get("YAESDESNACIO");
		       }
		        
		      HashMap<String, Object> itemMap = new HashMap<String, Object>();
	        	
	        	String mensaje1 = yaEsDes.toString();
	        	itemMap.put("YAESDESNACIO", mensaje1);
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

	public BigDecimal getYaEsDes() {
		return yaEsDes;
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



	public String getIdVac() {
		return idVac;
	}



	public void setIdVac(String idVac) {
		this.idVac = idVac;
	}

}
