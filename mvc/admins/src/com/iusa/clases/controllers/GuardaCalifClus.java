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

import com.iusa.clases.models.ClusterModel;

public class GuardaCalifClus {
	
	private String idAdmin;
	private String idCalificador;
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	Session session;
	
	public GuardaCalifClus(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	public String giveMe() {
		
		

		Transaction tr = session.beginTransaction();
		
		
		
		
		try{     	
			
			
			String sql = " SELECT \"clusters\".\"id_cluster\" FROM \"clusters\" WHERE  \"clusters\".\"id_admin_calificador\" = :idCalificador ";
			
			Query q = session.createSQLQuery(sql);
			
			q.setParameter("idCalificador", this.idCalificador);
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
		
		
			if(d.size() == 0){
				
				
				ClusterModel cluster = new ClusterModel();
				
				BigDecimal adm = new BigDecimal(idAdmin);
				BigDecimal calif = new BigDecimal(idCalificador);
			
				cluster.setId_admin(adm);
				cluster.setId_admin_calificador(calif);
				
		     	session.save(cluster);
				
				 String mensaje = "Se ha agregado Correctamente";
			     	
		     	 HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         itemMap.put("mensaje", mensaje);
		        
		         
		         items.add(itemMap);
				
			}else{
				
				
				String mensaje = "No se ha agregado, debido a que ya ha seleccionado esta Ubicacion";
		     	
		     	 HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         itemMap.put("mensaje", mensaje);
		        
		         
		         items.add(itemMap);
				
				
				
			}
			
			
			tr.commit();
		}catch(Exception e){
			e.printStackTrace();
			tr.rollback();
		}	
		
		 jsonData.put("items", items);
		
		
		return "success";
	}


	public String getIdAdmin() {
		return idAdmin;
	}


	public void setIdAdmin(String idAdmin) {
		this.idAdmin = idAdmin;
	}


	public String getIdCalificador() {
		return idCalificador;
	}


	public void setIdCalificador(String idCalificador) {
		this.idCalificador = idCalificador;
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
