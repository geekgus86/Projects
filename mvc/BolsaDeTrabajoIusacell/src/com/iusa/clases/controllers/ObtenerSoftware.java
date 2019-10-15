package com.iusa.clases.controllers;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.math.BigDecimal;


//import org.apache.struts2.interceptor.SessionAware;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.iusa.clases.interceptor.CaracterNoValidoException;





public class ObtenerSoftware extends perfilUsuario {
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	protected int categoria;
	public String execute(){
		Transaction tr = session.beginTransaction();
		try{
		listaSoftware=new ArrayList<String>();
	     listaIdSoftware=new ArrayList<BigDecimal>();
	     String sqlSw = "SELECT \"software\".\"id_software\",\"software\".\"nombre\" FROM \"software\" WHERE \"software\".\"categoria\"=:categoria";
	     Query querySw = session.createSQLQuery(sqlSw).setParameter("categoria", categoria);
	     querySw.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     List dataSw = querySw.list();
	     for (Object object : dataSw) {
	     	Map rowSw = (Map) object;
	          String software=(String)rowSw.get("categoria");
	          BigDecimal idSoftware=(BigDecimal)rowSw.get("id_categoria");
	          HashMap<String, Object> itemMap = new HashMap<String, Object>();   
	            
	             itemMap.put("id_software", (BigDecimal) rowSw.get("id_software"));
	 	         itemMap.put("nombre", (String) rowSw.get("nombre"));
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
	
	public void setCategoria(int categoria){
		this.categoria=categoria;
	}
	
	public int getCategoria(){
		return categoria;
	}
	
	 
}
