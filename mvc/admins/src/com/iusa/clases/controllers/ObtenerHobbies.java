package com.iusa.clases.controllers;
import java.math.*;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import com.iusa.clases.models.*;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;

public class ObtenerHobbies extends perfilUsuario{
	
	private String IdAdmin;
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	public String execute(){
		
	    HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
	    this.IdAdmin= escapeChars(request.getParameter("IdAdmin"));
		Transaction tr = session.beginTransaction();
		try{
		
		
		String sqlHob = "SELECT \"hobbie\".\"hobbie\",\"aux_hob\".\"id_hobbie\",\"aux_hob\".\"casilla\" FROM \"hobbie\",\"aux_hob\" WHERE \"aux_hob\".\"id_usuario\" = :IdAdmin  AND \"aux_hob\".\"id_hobbie\"=\"hobbie\".\"id_hob\"";
	    Query queryHob = session.createSQLQuery(sqlHob);
	    queryHob.setParameter("IdAdmin", IdAdmin);
	    System.out.println("Hobbie JUP");
	    queryHob.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	    List data1 = queryHob.list();
	    for (Object object : data1) {
	    	Map rowHob = (Map) object;
	    	HashMap<String, Object> itemMap = new HashMap<String, Object>();   
            
            itemMap.put("hobbie", (String) rowHob.get("hobbie"));
	         itemMap.put("id_hobbie", (BigDecimal) rowHob.get("id_hobbie"));
	        itemMap.put("casilla", (BigDecimal) rowHob.get("casilla"));
	        items.add(itemMap);
	    	}
		
	
	    jsonData.put("items", items);
	    tr.commit();
		}catch(Exception e){
			
			tr.rollback();
		}
		return "success";
	}
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
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
