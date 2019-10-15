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

public class TraerVacantesEsp {
	
	
	
	private String ubicacion;
	
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	Session session;
	
	
	public TraerVacantesEsp(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	
	public String giveMe() {
		
		
		
		 Transaction tr = session.beginTransaction();
		  
		  try{
			  
			  
			  
			  
			  
			  
			  String sql = " SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\" FROM \"vacante\" WHERE \"vacante\".\"ubicacion\" LIKE :ubicacion ";
				
				Query q = session.createSQLQuery(sql);
				
				q.setParameter("ubicacion", '%' + ubicacion  + '%');
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
				for (Object object : d) {
			         Map row = (Map) object;
			         
			         HashMap<String, Object> itemMap = new HashMap<String, Object>();
			         
			         itemMap.put("id_vacante", (BigDecimal) row.get("id_vacante"));
			         itemMap.put("nombre_vacante", (String) row.get("nombre_vacante"));
			        
			         
			         
			         items.add(itemMap);
			         
			        
			     	
			         }
			  
			  
			  
			  
			  
		  tr.commit();
	  }catch(Exception e){
		  
		  tr.rollback();
	  }
        
       
	  jsonData.put("items", items);
		
		
		
		
		return "success";
		
	}



	public String getUbicacion() {
		return ubicacion;
	}



	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
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
