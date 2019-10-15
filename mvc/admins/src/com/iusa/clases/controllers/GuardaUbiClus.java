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

import com.iusa.clases.models.ClusterUbicacionModel;

public class GuardaUbiClus {
	
	
	private String idAdmin;
	private String idEstado;
	
	private LinkedHashMap<String, Object> jsonDataSaveUbi = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> itemsUbi = new HashSet<Map<String, Object>>();
	
	Session session;
	
	public GuardaUbiClus(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	public String giveMe() {
		
		
		Transaction tr = session.beginTransaction();
		
		
		
		
		try{
		    
				String sql = " SELECT \"clusters_ubicacion\".\"id_ubicacion_cluster\" FROM \"clusters_ubicacion\" WHERE \"clusters_ubicacion\".\"id_admin\" = :idAdmin AND \"clusters_ubicacion\".\"id_estado\" = :idEstado ";
				
				Query q = session.createSQLQuery(sql);
				
				q.setParameter("idAdmin", this.idAdmin).setParameter("idEstado", this.idEstado);
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
			
		if(d.size() == 0){
			
			
			ClusterUbicacionModel Cluster = new ClusterUbicacionModel();
			
			BigDecimal adm = new BigDecimal(idAdmin);
			BigDecimal est = new BigDecimal(idEstado);
		
			Cluster.setId_estado(est);
			Cluster.setId_admin(adm);
			
	     	session.save(Cluster);
			
	     	
	     	 String mensaje = "Se ha agregado Correctamente";
	     	
	     	 HashMap<String, Object> itemMapS = new HashMap<String, Object>();
	         
	     	itemMapS.put("mensaje", mensaje);
	        
	     	itemsUbi.add(itemMapS);
	     	jsonDataSaveUbi.put("Mensajes", itemsUbi);
	      
			
		}else{
			
			 String mensaje = "No se ha agregado, debido a que ya ha seleccionado esta Ubicacion";
		     	
	     	 HashMap<String, Object> itemMapE = new HashMap<String, Object>();
	         
	     	itemMapE.put("mensaje", mensaje);
	        
	     	itemsUbi.add(itemMapE);
	     	jsonDataSaveUbi.put("Mensajes", itemsUbi);
	       
			
			
		}
			 	 	
		     	tr.commit();
		}catch(Exception e){
			e.printStackTrace();
			tr.rollback();
		}	
		
		
		
		
		
		return "success";
	}


	public String getIdAdmin() {
		return idAdmin;
	}


	public void setIdAdmin(String idAdmin) {
		this.idAdmin = idAdmin;
	}


	public String getIdEstado() {
		return idEstado;
	}


	public void setIdEstado(String idEstado) {
		this.idEstado = idEstado;
	}


	public LinkedHashMap<String, Object> getJsonDataSaveUbi() {
		return jsonDataSaveUbi;
	}


	public void setJsonDataSaveUbi(LinkedHashMap<String, Object> jsonDataSaveUbi) {
		this.jsonDataSaveUbi = jsonDataSaveUbi;
	}


	public Set<Map<String, Object>> getItemsUbi() {
		return itemsUbi;
	}


	public void setItemsUbi(Set<Map<String, Object>> itemsUbi) {
		this.itemsUbi = itemsUbi;
	}


	
	
	

}
