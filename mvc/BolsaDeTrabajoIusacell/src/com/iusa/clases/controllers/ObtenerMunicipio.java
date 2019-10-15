package com.iusa.clases.controllers;

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
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.interceptor.CaracterNoValidoException;

public class ObtenerMunicipio{

	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	private String estado;
	Session session=HibernateUtil.getSessionFactory().openSession();
	public String execute(){
		Transaction tr = session.beginTransaction();
		String sql = "SELECT \"municipios\".\"municipio\" FROM \"municipios\",\"estado\" WHERE \"municipios\".\"id_estado\"=\"estado\".\"id_estado\" AND \"estado\".\"nombre_estado\"=:estado ORDER BY \"municipio\"";
	     Query query = session.createSQLQuery(sql).setParameter("estado", estado);
	     query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     List data = query.list();
	     for (Object object : data) {
	     	Map row = (Map) object;
            HashMap<String, Object> itemMap = new HashMap<String, Object>();
            itemMap.put("municipio", (String) row.get("municipio"));
            items.add(itemMap);
    	}
		
	     jsonData.put("items", items);
	     tr.commit();
		return "success";
	}
	
	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
		}
	
	public Set<Map<String, Object>> getItems() {
		return items;
		}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		try{
		this.estado = escapeChars(estado);
		}catch(CaracterNoValidoException e){
	
		}
	}
	

	 public String escapeChars(String cadena)throws CaracterNoValidoException{

		   	String escapedString="";
		  
		   	if(cadena.matches("[0-9a-zA-Záéíóú\\s._@-]*")){
		   		
		   		String reg = "[=;*|()%#!&?]";
		   		   
		       	escapedString= cadena.replaceAll(reg,"");
		   		
		   	}else{
		   		
		   		throw new CaracterNoValidoException();
		   		
		   	}
		   	
		   	
		   	return escapedString;
		   }
	
}
