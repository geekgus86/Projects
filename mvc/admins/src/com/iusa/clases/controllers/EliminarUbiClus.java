package com.iusa.clases.controllers;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class EliminarUbiClus {

	
	
	private String idUbicacionCLuster;
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	Session session;
	
	public EliminarUbiClus(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	public String giveMe() {
		
		
		 Transaction tr = session.beginTransaction();
		  
		  try{
		        
		        String sql2="DELETE FROM \"clusters_ubicacion\" WHERE \"clusters_ubicacion\".\"id_ubicacion_cluster\"= :idUbicacionCLuster ";
		        Query query2 = session.createSQLQuery(sql2);
		        query2.setParameter("idUbicacionCLuster", idUbicacionCLuster);
		        query2.executeUpdate();
		        
		        
		        String mensaje = "Se ha eliminado Correctamente";
		     	
		     	 HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         itemMap.put("mensaje", mensaje);
		        
		         
		         items.add(itemMap);
		        
		        
		        
		        tr.commit();
		  }catch(Exception e){
			  tr.rollback();
			  
		  }
		  
		  
		  jsonData.put("items", items);
		
		
		return "success";
	}


	public String getIdUbicacionCLuster() {
		return idUbicacionCLuster;
	}


	public void setIdUbicacionCLuster(String idUbicacionCLuster) {
		this.idUbicacionCLuster = idUbicacionCLuster;
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
