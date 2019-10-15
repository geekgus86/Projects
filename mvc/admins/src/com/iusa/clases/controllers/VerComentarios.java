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

public class VerComentarios extends ActionSupport {
	
	private String id_postu;
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	Session session;
	
	public VerComentarios(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		
		Transaction tr = session.beginTransaction();
		  
		  try{
			  
			  String secureIdPostu = escapeChars(id_postu);
			  
	       
	       String sql = " SELECT \"mi_nuevo_filtro\".\"observaciones\", \"mi_nuevo_filtro\".\"id_mi_nuevo_filtro\", \"mi_nuevo_filtro\".\"valor_calificacion\" FROM \"mi_nuevo_filtro\" WHERE \"mi_nuevo_filtro\".\"id_mi_nuevo_filtro\" = :id_postu ";
			
			 Query q = session.createSQLQuery(sql);
			 
			 q.setParameter("id_postu", secureIdPostu);
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
				for (Object object : d) {
			         Map row = (Map) object;
			         
			         HashMap<String, Object> itemMap = new HashMap<String, Object>();
			         
			         
			         itemMap.put("id_aux", (BigDecimal) row.get("id_mi_nuevo_filtro"));
			         
			         itemMap.put("observacionesNuevas", (String) row.get("observaciones"));
			         
			         itemMap.put("valorCalif", (BigDecimal) row.get("valor_calificacion"));
			         
			         
			         items.add(itemMap);
			         
			        
			     	
			     }
	     tr.commit();
		  }catch(Exception e){
			 
			  tr.rollback();
		  }
		
		
		  jsonData.put("items", items);
		  
		return SUCCESS;
	}
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}

	public String getId_postu() {
		return id_postu;
	}

	public void setId_postu(String id_postu) {
		this.id_postu = id_postu;
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
		

}
