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

public class VerUbicacionesClus {
	
	
	private String idAdmin;
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	Session session;
	
	
	public VerUbicacionesClus(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	
	public String giveMe() {
		
		
		
		 Transaction tr = session.beginTransaction();
		  
		  try{
			  
			  
			  
			  
			  
		        String sql = " SELECT \"clusters_ubicacion\".\"id_admin\", \"clusters_ubicacion\".\"id_ubicacion_cluster\", \"estado\".\"nombre_estado\" FROM \"clusters_ubicacion\" , \"estado\" WHERE \"clusters_ubicacion\".\"id_admin\" = :idAdmin  AND \"estado\".\"id_estado\" = \"clusters_ubicacion\".\"id_estado\" ";
				
				Query q = session.createSQLQuery(sql);
				
				q.setParameter("idAdmin", this.idAdmin);
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
				for (Object object : d) {
			         Map row = (Map) object;
			         
			         HashMap<String, Object> itemMap = new HashMap<String, Object>();
			         
			         itemMap.put("nombre_estado", (String) row.get("nombre_estado"));
			         itemMap.put("idCluster", (BigDecimal) row.get("id_ubicacion_cluster"));
			         itemMap.put("idAdmin", (BigDecimal) row.get("id_admin"));
			         
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
