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

public class VerCalifCluster {
	
	
	private String idAdmin;
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	Session session;
	
	
	public VerCalifCluster(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	
	public String giveMe() {
		
		
		
		
		 Transaction tr = session.beginTransaction();
		  
		  try{
			  
			  
			  
			  
			  
		        String sql = " SELECT \"clusters\".\"id_cluster\", \"clusters\".\"id_admin\", \"clusters\".\"id_admin_calificador\", \"admins\".\"nombre\" FROM \"clusters\" , \"admins\" WHERE \"clusters\".\"id_admin\" = :idAdmin AND \"admins\".\"id_admin\" = \"clusters\".\"id_admin_calificador\" ";
				
				Query q = session.createSQLQuery(sql);
				
				q.setParameter("idAdmin", this.idAdmin);
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
				for (Object object : d) {
			         Map row = (Map) object;
			         
			         HashMap<String, Object> itemMap = new HashMap<String, Object>();
			         
			         itemMap.put("id_cluster", (BigDecimal) row.get("id_cluster"));
			         itemMap.put("id_admin", (BigDecimal) row.get("id_admin"));
			         itemMap.put("id_admin_calificador", (BigDecimal) row.get("id_admin_calificador"));
			         itemMap.put("nombre", (String) row.get("nombre"));
			         
			         items.add(itemMap);
			         
			        
			     	
			         }
		
		
		
				  
				  tr.commit();
			  }catch(Exception e){
				  
				  tr.rollback();
			  }
			
			
			
			  jsonData.put("items", items);
		
		return "success";
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



	public String getIdAdmin() {
		return idAdmin;
	}



	public void setIdAdmin(String idAdmin) {
		this.idAdmin = idAdmin;
	}
	
	

}
