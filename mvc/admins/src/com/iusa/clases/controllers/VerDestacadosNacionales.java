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

public class VerDestacadosNacionales extends ActionSupport {
	
	private BigDecimal numeroDestaNacio;
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	
	Session session;
	
	
	public VerDestacadosNacionales(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		 Transaction tr = session.beginTransaction();
		  
		  try{
			  String sql2 = " SELECT Count(\"vacante\".\"id_vacante\")AS NUMERONACIONALES FROM \"vacante\" WHERE \"vacante\".\"destacado_nacional\" != '0'  ";
		      Query query2 = session.createSQLQuery(sql2);		        
		        
		      query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		      List data = query2.list();
		      for (Object object : data) {
		        	Map row = (Map) object;
		        	this.numeroDestaNacio=(BigDecimal)row.get("NUMERONACIONALES");
		       }
		        
		      HashMap<String, Object> itemMap = new HashMap<String, Object>();
	        	
	        	String mensaje1 = "Restantes: "+numeroDestaNacio;
	        	itemMap.put("error1", mensaje1);
	        	items.add(itemMap);
	        	
		        
		       tr.commit();
		  }catch(Exception e){
			  
			  tr.rollback();
		  }
		
		
		  jsonData.put("Mensajes", items);
		
		
		return SUCCESS;
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

	public BigDecimal getNumeroDestaNacio() {
		return numeroDestaNacio;
	}

	public void setNumeroDestaNacio(BigDecimal numeroDestaNacio) {
		this.numeroDestaNacio = numeroDestaNacio;
	}

}
