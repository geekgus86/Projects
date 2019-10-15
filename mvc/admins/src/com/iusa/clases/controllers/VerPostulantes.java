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

public class VerPostulantes extends ActionSupport {
	
	
	
	private String id;
	
	
	
	private LinkedHashMap<String, Object> jsonDataVPR = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	
	Session session;
	
	public VerPostulantes(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		Transaction trans = session.beginTransaction();
		
		try{
			
			String secureID = escapeChars(id);
		
		 String sql = " SELECT \"vacante\".\"id_vacante\" FROM \"vacante\" WHERE \"vacante\".\"id_vacante\" = (SELECT Count(\"postulaciones\".\"id_vacante\") FROM \"postulaciones\" WHERE \"postulaciones\".\"id_vacante\" = :id )  ";
			
		 Query q = session.createSQLQuery(sql);
		 
		 q.setParameter("id", secureID);
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
		
			for (Object object : d) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         
		         itemMap.put("id", (BigDecimal) row.get("id_vacante"));
		         
		         
		         
		         items.add(itemMap);
		         
		        
		     	
		         }
			
			jsonDataVPR.put("items", items);
		
			trans.commit();
		}catch(Exception e){
			e.printStackTrace();
			trans.rollback();
		}
		
		return SUCCESS;
	}
	
public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public LinkedHashMap<String, Object> getJsonDataVPR() {
		return jsonDataVPR;
	}

	public void setJsonDataVPR(LinkedHashMap<String, Object> jsonDataVPR) {
		this.jsonDataVPR = jsonDataVPR;
	}

	public Set<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}
	
	
}
