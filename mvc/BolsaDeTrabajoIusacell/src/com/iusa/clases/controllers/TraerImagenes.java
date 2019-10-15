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

public class TraerImagenes extends ActionSupport{
	
	private BigDecimal id_banner;
	private String url_banner;
	Session session;
	
	private LinkedHashMap<String, Object> jsonDataTI = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	
	public TraerImagenes(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
		
	}
	
	public String giveMe() {
		

		Transaction tr = session.beginTransaction();
		try{
        String sql_admin_id = " SELECT \"img_banner\".\"id_banner\", \"img_banner\".\"url_banner\" FROM \"img_banner\"  ";
        
        Query query1 = session.createSQLQuery(sql_admin_id);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data1 = query1.list();
        
       
        
        
        for (Object object : data1) {
         Map row1 = (Map) object;
         
         HashMap<String, Object> itemMap = new HashMap<String, Object>();
         id_banner = (BigDecimal)row1.get("id_banner");
         url_banner = (String)row1.get("url_banner");
         	
         	
         	
         	itemMap.put("id_imag", id_banner);
         	itemMap.put("ruta_imag", url_banner);
         	
         	
         	items.add(itemMap);
         }
		
        jsonDataTI.put("items", items);
		tr.commit();
		}catch(Exception e){
			tr.rollback();
		}
		return SUCCESS;
	}
	
	
	public BigDecimal getId_banner() {
		return id_banner;
	}
	public void setId_banner(BigDecimal id_banner) {
		this.id_banner = id_banner;
	}
	public String getUrl_banner() {
		return url_banner;
	}
	public void setUrl_banner(String url_banner) {
		this.url_banner = url_banner;
	}
	public LinkedHashMap<String, Object> getJsonDataTI() {
		return jsonDataTI;
	}
	public void setJsonDataTI(LinkedHashMap<String, Object> jsonDataTI) {
		this.jsonDataTI = jsonDataTI;
	}
	public Set<Map<String, Object>> getItems() {
		return items;
	}
	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}

}
