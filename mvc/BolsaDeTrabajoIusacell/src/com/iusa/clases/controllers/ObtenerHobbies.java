package com.iusa.clases.controllers;
import java.math.*;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.iusa.clases.models.*;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;

public class ObtenerHobbies extends perfilUsuario{
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	public String execute(){
		
	    HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
		
		Transaction tr = session.beginTransaction();
		try{
         this.usuario=escapeChars((String) sesion.getAttribute("usuario"));
		String sql = "SELECT \"usuario\".\"id_postulante\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:usuario";
	    Query query = session.createSQLQuery(sql).setParameter("usuario", usuario);
	    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	    List data = query.list();
	    for (Object object : data) {
	    	Map row = (Map) object;
	    	  this.idUsuario=(BigDecimal)row.get("id_postulante");
	    	}
		
		String sqlHob = "SELECT \"hobbie\".\"hobbie\",\"aux_hob\".\"id_hobbie\",\"aux_hob\".\"casilla\" FROM \"hobbie\",\"aux_hob\" WHERE \"aux_hob\".\"id_usuario\"=:idUsuario AND \"aux_hob\".\"id_hobbie\"=\"hobbie\".\"id_hob\"";
	    Query queryHob = session.createSQLQuery(sqlHob).setParameter("idUsuario", idUsuario);
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
