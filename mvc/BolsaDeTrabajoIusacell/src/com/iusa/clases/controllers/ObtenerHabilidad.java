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

import com.iusa.clases.interceptor.CaracterNoValidoException;


public class ObtenerHabilidad extends perfilUsuario {
	
	protected LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	protected Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	public String execute(){
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
    	
    	Transaction tr = session.beginTransaction();
    	try{
    		this.usuario=escapeChars((String) sesion.getAttribute("usuario"));		
        String sql = "SELECT \"usuario\".\"id_postulante\" FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:usuario";
        Query query = session.createSQLQuery(sql).setParameter("usuario", usuario);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data = query.list();
        for (Object object : data) {
        	Map row = (Map) object;
        	  this.idUsuario=(BigDecimal)row.get("id_postulante");
        	}
        
        String sql1 = "SELECT \"habilidad\".\"habilidad\",\"habilidad\".\"id_aux_habilidad\" FROM \"habilidad\" WHERE \"id_usuario\"=:idUsuario";
        Query query1 = session.createSQLQuery(sql1).setParameter("idUsuario", idUsuario);
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
	

	 public String escapeChars(String cadena)throws CaracterNoValidoException{

		   	String escapedString="";
		  
		   	if(cadena.matches("[0-9a-zA-Z._@-]*")){
		   		
		   		String reg = "[=;*|()%#!&?]";
		   		   
		       	escapedString= cadena.replaceAll(reg,"");
		   		
		   	}else{
		   		
		   		throw new CaracterNoValidoException();
		   		
		   	}
		   	
		   	
		   	return escapedString;
		   }
	
	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
		}
	
	public Set<Map<String, Object>> getItems() {
		return items;
		}

}
