package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;


public class ObtenerHabilidad extends perfilUsuario {
	
	private String IdAdmin;
	
	protected LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	protected Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	public String execute(){
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        this.IdAdmin=escapeChars(request.getParameter("IdAdmin"));
    	Transaction tr = session.beginTransaction();
    	 
    	try{
       
        
        String sql1 = "SELECT \"habilidad\".\"habilidad\",\"habilidad\".\"id_aux_habilidad\" FROM \"habilidad\" WHERE \"id_usuario\" = :IdAdmin ";
        Query query1 = session.createSQLQuery(sql1);
        query1.setParameter("IdAdmin", IdAdmin);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data1 = query1.list();
        for (Object object : data1) {
        	Map row1 = (Map) object;
          	
          	 HashMap<String, Object> itemMap = new HashMap<String, Object>();    
          	 itemMap.put("id_habilidad", (BigDecimal) row1.get("id_aux_habilidad"));
           	 itemMap.put("habilidad", (String) row1.get("habilidad"));
 	       
 	       
 	         
 	         items.add(itemMap);
           	     
           	     
        	}
        
        tr.commit();
        jsonData.put("items", items);
    	}catch(Exception e){
    		
    		tr.rollback();
    	}
	    return "success";
	}
	
	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
		}
	
	public Set<Map<String, Object>> getItems() {
		return items;
		}

	public String getIdAdmin() {
		return IdAdmin;
	}

	public void setIdAdmin(String idAdmin) {
		IdAdmin = idAdmin;
	}

}
