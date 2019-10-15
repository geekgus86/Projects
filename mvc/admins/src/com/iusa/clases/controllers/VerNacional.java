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

public class VerNacional extends ActionSupport {
	
	private String folio;
	private String nombreVacante;
	private BigDecimal id_vacante;
	
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	Session session;
	
	
	public VerNacional(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	
	public String giveMe() {
		
		
		
		 
		
		  Transaction tr = session.beginTransaction();
		  
		  try{
			  
			    
		        
		        
		        String sql = " SELECT \"vacante\".\"folio\", \"vacante\".\"nombre_vacante\",\"vacante\".\"id_vacante\" FROM \"vacante\" WHERE \"vacante\".\"destacado_nacional\" = '1' ";
				
				Query q = session.createSQLQuery(sql);
				
				
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
				for (Object object : d) {
			         Map row = (Map) object;
			         
			         HashMap<String, Object> itemMap = new HashMap<String, Object>();
			         
			         itemMap.put("idVac", (BigDecimal) row.get("id_vacante"));
			         itemMap.put("nombre", (String) row.get("nombre_vacante"));
			         itemMap.put("folio", (String) row.get("folio"));
			         
			         
			         
			         items.add(itemMap);
			         
			        
			     	
			         }
				
				
			
		        
		        
		        
		       tr.commit();
		  }catch(Exception e){
			  
			  tr.rollback();
		  }
	        
	       
		  jsonData.put("items", items);
         
	
	
	
	return SUCCESS;
	}
	


	public String getFolio() {
		return folio;
	}


	public void setFolio(String folio) {
		this.folio = folio;
	}


	public String getNombreVacante() {
		return nombreVacante;
	}


	public void setNombreVacante(String nombreVacante) {
		this.nombreVacante = nombreVacante;
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



	public BigDecimal getId_vacante() {
		return id_vacante;
	}



	public void setId_vacante(BigDecimal id_vacante) {
		this.id_vacante = id_vacante;
	}
	
	
	

}
