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

public class TraeVideos extends ActionSupport{
	
	private BigDecimal id_video;
	private String ruta_video;
	private String donde_va;

	private LinkedHashMap<String, Object> jsonDataTV = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	Session session=HibernateUtil.getSessionFactory().getCurrentSession();
	
	
	public String giveMe() {
		
		
		Transaction tr = session.beginTransaction();
		try{
        String sql_admin_id = " SELECT \"videos\".\"id_video\", \"videos\".\"url_video\", \"videos\".\"donde_va\" FROM \"videos\"  ";
        
        Query query1 = session.createSQLQuery(sql_admin_id);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data1 = query1.list();
        
       
        
        
        for (Object object : data1) {
         Map row1 = (Map) object;
         
         HashMap<String, Object> itemMap = new HashMap<String, Object>();
         	id_video = (BigDecimal)row1.get("id_video");
         	ruta_video = (String)row1.get("url_video");
         	donde_va = (String)row1.get("donde_va");
         	
         	
         	itemMap.put("id_video", id_video);
         	itemMap.put("ruta_video", ruta_video);
         	itemMap.put("donde_va", donde_va);
         	
         	items.add(itemMap);
         }
		
        
        jsonDataTV.put("items", items);
        

		tr.commit();
		}catch(Exception e){
			tr.rollback();
		}
		return SUCCESS;
	}
	
	
	
	
	
	public BigDecimal getId_video() {
		return id_video;
	}
	public void setId_video(BigDecimal id_video) {
		this.id_video = id_video;
	}
	public String getRuta_video() {
		return ruta_video;
	}
	public void setRuta_video(String ruta_video) {
		this.ruta_video = ruta_video;
	}
	public LinkedHashMap<String, Object> getJsonDataTV() {
		return jsonDataTV;
	}
	public void setJsonDataTV(LinkedHashMap<String, Object> jsonDataTV) {
		this.jsonDataTV = jsonDataTV;
	}
	public Set<Map<String, Object>> getItems() {
		return items;
	}
	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}





	public String getDonde_va() {
		return donde_va;
	}





	public void setDonde_va(String donde_va) {
		this.donde_va = donde_va;
	}

}
