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



public class ObtenerEducacionInfo extends obtenerEducacion{

	
	
	private String idEdu;
	private String IdUsuario2;
	
	
	
	public String execute(){
		
	String secureIdEdu =escapeChars(idEdu) ;
	String secureIdUsuario2 = escapeChars(IdUsuario2);
		
		
		Transaction tr = session.beginTransaction();
		try{
		
        
    	
    	 
        String sql1 = "SELECT \"formacion_academica\".\"id_formacion\",\"nivel_academico\".\"nivel_academico\",\"formacion_academica\".\"nivel_estudios\",\"formacion_academica\".\"instituto\",\"formacion_academica\".\"pais_instituto\",\"formacion_academica\".\"estado_instituto\",\"formacion_academica\".\"fecha_inicio\",\"formacion_academica\".\"fecha_fin\",\"formacion_academica\".\"status\",\"formacion_academica\".\"estudio_actual\" FROM \"formacion_academica\",\"nivel_academico\" WHERE \"formacion_academica\".\"id_usuario\" = :idUsuario   AND \"nivel_academico\".\"id_academico\"=\"formacion_academica\".\"nivel_estudios\" AND \"formacion_academica\".\"id_formacion\" = :idEdu ";
        Query query1 = session.createSQLQuery(sql1);
        query1.setParameter("idUsuario", secureIdUsuario2).setParameter("idEdu", secureIdEdu);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data1 = query1.list();
        for (Object object : data1) {
        	Map row1 = (Map) object;
          	String fechaInicio=new SimpleDateFormat("dd/MM/yyyy").format(row1.get("fecha_inicio"));
          	String fechaFin=new SimpleDateFormat("dd/MM/yyyy").format(row1.get("fecha_fin"));
          	
          	 HashMap<String, Object> itemMap = new HashMap<String, Object>();      
          	 itemMap.put("id_formacion", (BigDecimal) row1.get("id_formacion"));
           	 itemMap.put("nivel_academico", (String) row1.get("nivel_academico"));
           	 itemMap.put("nivel_estudios", (BigDecimal) row1.get("nivel_estudios"));
 	         itemMap.put("instituto", (String) row1.get("instituto"));
 	         itemMap.put("fecha_inicio", (String)fechaInicio);
 	         itemMap.put("fecha_fin", (String) fechaFin);
 	         itemMap.put("pais_instituto", (String) row1.get("pais_instituto"));
 	         itemMap.put("estado_instituto", (String) row1.get("estado_instituto"));
 	         itemMap.put("status", (String) row1.get("status"));
 	        itemMap.put("estudio_actual", (String) row1.get("estudio_actual"));
 	       
 	         
 	         items.add(itemMap);
           	     
           	     
        	}
        
        
        tr.commit();
		}catch(Exception e){
			
			tr.rollback();
		}
		
		jsonData.put("items", items);
		
		return "success";
	}
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}

	public String getIdEdu() {
		return idEdu;
	}

	public void setIdEdu(String idEdu) {
		this.idEdu = idEdu;
	}
	
	

	public String getIdUsuario2() {
		return IdUsuario2;
	}

	public void setIdUsuario2(String idUsuario2) {
		IdUsuario2 = idUsuario2;
	}
	
	
}
