package com.iusa.clases.controllers;

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

public class VerificarExisAdmin {
	
	
	private String email;
	
	private LinkedHashMap<String, Object> jsonDataVerifAd = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> itemsVeri = new HashSet<Map<String, Object>>();
	
	Session session;
	
	public VerificarExisAdmin(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	public String giveMe() {
		
		
		Transaction tr = session.beginTransaction();
		
		
		
		
		try{
		    
				String sql = " SELECT \"admins\".\"id_admin\" FROM \"admins\" WHERE \"admins\".\"email\" = :email ";
				
				Query q = session.createSQLQuery(sql);
				
				q.setParameter("email", this.email);
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
		
				
				if(d.size() > 0){
					
					String mensaje = "Ya existe el Administrador";
			     	
			     	 HashMap<String, Object> itemMapS = new HashMap<String, Object>();
			         
			     	itemMapS.put("mensaje", mensaje);
			        
			     	itemsVeri.add(itemMapS);
			     	jsonDataVerifAd.put("Mensajes", itemsVeri);
					
					
				}
		
		
     	tr.commit();
		}catch(Exception e){
			e.printStackTrace();
			tr.rollback();
		}	
		
		return "success";
		
	}


	


	public LinkedHashMap<String, Object> getJsonDataVerifAd() {
		return jsonDataVerifAd;
	}


	public void setJsonDataVerifAd(LinkedHashMap<String, Object> jsonDataVerifAd) {
		this.jsonDataVerifAd = jsonDataVerifAd;
	}


	public Set<Map<String, Object>> getItemsVeri() {
		return itemsVeri;
	}


	public void setItemsVeri(Set<Map<String, Object>> itemsVeri) {
		this.itemsVeri = itemsVeri;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}

}
