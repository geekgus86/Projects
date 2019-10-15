package com.iusa.clases.controllers;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.math.BigDecimal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


//import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.iusa.clases.interceptor.CaracterNoValidoException;



public class ObtenerCatSoftware extends ObtenerSoftware{
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
	   
	   listaSoftware=new ArrayList<String>();
	     listaIdSoftware=new ArrayList<BigDecimal>();
	     String sqlSw = "SELECT \"software\".\"nombre\",\"software\".\"categoria\",\"software_aux\".\"dominio\",\"software_aux\".\"id_aux\" FROM \"software\",\"categoria_software\",\"software_aux\" WHERE \"software_aux\".\"id_usuario\"=:idUsuario AND \"software_aux\".\"id_software\"=\"software\".\"id_software\" AND \"software\".\"categoria\"=\"categoria_software\".\"id_categoria\" AND \"software\".\"categoria\"=:categoria";
	     Query querySw = session.createSQLQuery(sqlSw).setParameter("idUsuario", idUsuario).setParameter("categoria", categoria);
	     querySw.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     List dataSw = querySw.list();
	     for (Object object : dataSw) {
	     	Map rowSw = (Map) object;
	         
	          HashMap<String, Object> itemMap = new HashMap<String, Object>();   
	            
	             itemMap.put("idSoftware", (BigDecimal) rowSw.get("id_aux"));
	 	         itemMap.put("dominio", (BigDecimal) rowSw.get("dominio"));
	 	        itemMap.put("nombre", (String) rowSw.get("nombre"));
	 	       itemMap.put("categoria", (BigDecimal) rowSw.get("categoria"));
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
