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

public class VerMunicipio extends ActionSupport {
	
	
	private String id_estado;

	
	private LinkedHashMap<String, Object> jsonDataMNP = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	Session session;
	
	public VerMunicipio(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		Transaction trans = session.beginTransaction();
		
		try{
			
			String secureidEstado = escapeChars(id_estado);
		
		 String sql = " SELECT \"municipios\".\"id_municipio\", \"municipios\".\"municipio\" FROM \"municipios\" WHERE \"municipios\".\"id_estado\" = :id_estado  ORDER BY \"municipios\".\"municipio\" ASC ";
			
		 Query q = session.createSQLQuery(sql);
			
		 q.setParameter("id_estado", secureidEstado);
		 
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
		
			for (Object object : d) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         
		         itemMap.put("id_municipio", (BigDecimal) row.get("id_municipio"));
		         itemMap.put("municipio", (String) row.get("municipio"));
		     
		         
		         items.add(itemMap);
		         
		        
		     	
		         }
			
			jsonDataMNP.put("items", items);
		
			trans.commit();
		}catch(Exception e){
			
			trans.rollback();
		}
		return SUCCESS;
	}
	
	
public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	
	public String getId_estado() {
		return id_estado;
	}

	public void setId_estado(String id_estado) {
		this.id_estado = id_estado;
	}

	public LinkedHashMap<String, Object> getJsonDataMNP() {
		return jsonDataMNP;
	}

	public void setJsonDataMNP(LinkedHashMap<String, Object> jsonDataMNP) {
		this.jsonDataMNP = jsonDataMNP;
	}

	public Set<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}

}
