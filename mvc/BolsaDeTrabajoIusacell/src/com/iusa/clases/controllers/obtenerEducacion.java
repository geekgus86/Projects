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
import com.iusa.clases.models.FormacionAcademica;

public class obtenerEducacion extends perfilUsuario{

	protected LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	protected Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	public String execute(){
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
    	
		Transaction tr = session.beginTransaction();
		try{
		this.usuario=escapeChars((String) sesion.getAttribute("usuario"));
		
        String sql = "SELECT \"usuario\".\"id_postulante\" FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:usuario";
        Query query = session.createSQLQuery(sql).setParameter("usuario",usuario);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data = query.list();
        for (Object object : data) {
        	Map row = (Map) object;
        	  this.idUsuario=(BigDecimal)row.get("id_postulante");
        	}
        
        
    	
    	 
        String sql1 = "SELECT \"formacion_academica\".\"id_formacion\",\"nivel_academico\".\"nivel_academico\",\"formacion_academica\".\"instituto\",\"formacion_academica\".\"pais_instituto\",\"formacion_academica\".\"estado_instituto\",\"formacion_academica\".\"fecha_inicio\",\"formacion_academica\".\"fecha_fin\",\"formacion_academica\".\"status\",\"formacion_academica\".\"estudio_actual\" FROM \"formacion_academica\",\"nivel_academico\" WHERE \"formacion_academica\".\"id_usuario\"=:idUsuario AND \"nivel_academico\".\"id_academico\"=\"formacion_academica\".\"nivel_estudios\" ";
        Query query1 = session.createSQLQuery(sql1).setParameter("idUsuario", idUsuario);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data1 = query1.list();
        for (Object object : data1) {
        	Map row1 = (Map) object;
          	String fechaInicio=new SimpleDateFormat("dd/MM/yyyy").format(row1.get("fecha_inicio"));
          	String fechaFin=new SimpleDateFormat("dd/MM/yyyy").format(row1.get("fecha_fin"));
          	
          	 HashMap<String, Object> itemMap = new HashMap<String, Object>();      
          	 itemMap.put("id_formacion", (BigDecimal) row1.get("id_formacion"));
           	 itemMap.put("nivel_academico", (String) row1.get("nivel_academico"));
 	         itemMap.put("instituto", (String) row1.get("instituto"));
 	         itemMap.put("fecha_inicio", (String)fechaInicio);
 	         itemMap.put("fecha_fin", (String) fechaFin);
 	         itemMap.put("pais_instituto", (String) row1.get("pais_instituto"));
 	         itemMap.put("estado_instituto", (String) row1.get("estado_instituto"));
 	         itemMap.put("status", (String) row1.get("status"));
 	        itemMap.put("estudio_actual", (String) row1.get("estudio_actual"));
 	       
 	         
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
