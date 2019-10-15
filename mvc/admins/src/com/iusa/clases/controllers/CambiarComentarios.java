package com.iusa.clases.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import oracle.sql.CLOB;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class CambiarComentarios extends ActionSupport {

	
	private String num_aux_filtro;
	private String comentarios;
	private String calificacion;
	
	
	
	private LinkedHashMap<String, Object> jsonDataDC = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	Session session;
	
	public CambiarComentarios(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		
		
	  Transaction tr = session.beginTransaction();
	  
	  try{
		  
		  
		  String secureNumAuxFiltro = escapeChars(num_aux_filtro);
		  String secureComentarios = escapeChars(comentarios);
		  String secureCalificacion = escapeChars(calificacion);
		  
		    String sql2="UPDATE \"mi_nuevo_filtro\" SET \"mi_nuevo_filtro\".\"observaciones\" = :comentarios ,\"mi_nuevo_filtro\".\"valor_calificacion\" = :calificacion  WHERE \"mi_nuevo_filtro\".\"id_mi_nuevo_filtro\" = :num_aux_filtro ";
	        Query query2 = session.createSQLQuery(sql2);
	        query2.setParameter("comentarios", secureComentarios).setParameter("calificacion", secureCalificacion).setParameter("num_aux_filtro", secureNumAuxFiltro);
	        query2.executeUpdate();
	        
	 
        
       
       
     
    	   
       
	     String sql = " SELECT \"mi_nuevo_filtro\".\"observaciones\", \"mi_nuevo_filtro\".\"id_mi_nuevo_filtro\", \"mi_nuevo_filtro\".\"valor_calificacion\" FROM \"mi_nuevo_filtro\" WHERE \"mi_nuevo_filtro\".\"id_mi_nuevo_filtro\" = :num_aux_filtro ";
		
		 Query q = session.createSQLQuery(sql);
		 q.setParameter("num_aux_filtro", secureNumAuxFiltro);
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
		
			for (Object object : d) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         
		         itemMap.put("id_aux", (BigDecimal) row.get("id_mi_nuevo_filtro"));
		         
		         itemMap.put("observacionesNuevas", (String) row.get("observaciones"));
		         
		         itemMap.put("valorCalif", (BigDecimal) row.get("valor_calificacion"));
		         
		         
		         items.add(itemMap);
		         
		        
		     	
		     }
     tr.commit();
	  }catch(Exception e){
		 
		  tr.rollback();
	  }
			
			jsonDataDC.put("items", items);
		
		return SUCCESS;
	}
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	
	
	
	

	public String getComentarios() {
		return comentarios;
	}

	public void setComentarios(String comentarios) {
		this.comentarios = comentarios;
	}

	public String getNum_aux_filtro() {
		return num_aux_filtro;
	}

	public void setNum_aux_filtro(String num_aux_filtro) {
		
		String reg = "[=;*|()%#!&?]";
        String result = num_aux_filtro.replaceAll(reg,"");
        this.num_aux_filtro = result;

	}

	public LinkedHashMap<String, Object> getJsonDataDC() {
		return jsonDataDC;
	}

	public void setJsonDataDC(LinkedHashMap<String, Object> jsonDataDC) {
		this.jsonDataDC = jsonDataDC;
	}

	public Set<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}

	public String getCalificacion() {
		return calificacion;
	}

	public void setCalificacion(String calificacion) {
		this.calificacion = calificacion;
	}
	
}
