package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class CambioEstadoDinamico extends ActionSupport {
	
	
	private String calificacionVac;
	private String idVacante;
	
	
	private LinkedHashMap<String, Object> jsonDataCED = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	
	Session session;
	
	
	public CambioEstadoDinamico(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		
		String secureCalificacionVac = escapeChars(calificacionVac);
		
		String secureIdVac = escapeChars(idVacante);
		
		
		if(secureCalificacionVac != ""){
			 
			
			  Transaction tr = session.beginTransaction();
			  
			  try{
				  String sql2="UPDATE \"vacante\" SET  \"vacante\".\"estado_vacante\" = :calificacionVac  WHERE \"vacante\".\"id_vacante\" = :idVacante ";
			        Query query2 = session.createSQLQuery(sql2);
			        query2.setParameter("calificacionVac", secureCalificacionVac).setParameter("idVacante", secureIdVac);
			        query2.executeUpdate();
			        
			       tr.commit();
			  }catch(Exception e){
				  
				  tr.rollback();
			  }
		        
		       
		       
	           HashMap<String, Object> itemMap = new HashMap<String, Object>();
	        	
	        	String mensaje1 = "HAS CAMBIADO EL ESTADO DE LA VACANTE";
	        	itemMap.put("error1", mensaje1);
	        	items.add(itemMap);
	        	jsonDataCED.put("Mensajes", items);
		}else{
			 
	           HashMap<String, Object> itemMap = new HashMap<String, Object>();
	        	
	        	String mensaje1 = "NO SE HA PODIDO MODIFICAR EL ESTADO DE LA VACANTE, DEBES INGRESAR UNA CALIFICACION";
	        	itemMap.put("error1", mensaje1);
	        	items.add(itemMap);
	        	jsonDataCED.put("Mensajes", items);
		}
		
		
		
		return SUCCESS;
	}
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}

	public String getCalificacionVac() {
		return calificacionVac;
	}

	public void setCalificacionVac(String calificacionVac) {
		this.calificacionVac = calificacionVac;
	}

	public LinkedHashMap<String, Object> getJsonDataCED() {
		return jsonDataCED;
	}

	public void setJsonDataCED(LinkedHashMap<String, Object> jsonDataCED) {
		this.jsonDataCED = jsonDataCED;
	}

	public Set<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}

	public String getIdVacante() {
		return idVacante;
	}

	public void setIdVacante(String idVacante) {
		this.idVacante = idVacante;
	}
}
