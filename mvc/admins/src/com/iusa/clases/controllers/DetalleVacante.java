package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;

public class DetalleVacante extends ActionSupport{
	
	
	private String num_folio;
	
	public String getNumFolio() {
		return num_folio;
		}
		public void setNumFolio(String num_folio) {
		this.num_folio = num_folio;
		}
	
	
	
	private LinkedHashMap<String, Object> jsonDataDV = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	public LinkedHashMap<String, Object> getJsonDataDV() {
		return jsonDataDV;
		}
	
	public Set<Map<String, Object>> getItems() {
		return items;
		}
	

	Session session;
	
	public DetalleVacante(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}

	
	public String giveMe() {
		
		 HttpServletRequest request = ServletActionContext.getRequest();
		 String usu = escapeChars(request.getParameter("num_folio"));
		 
		 Transaction transt = session.beginTransaction();
		 try{
		 
			 String sql = "SELECT \"vacante\".\"nombre_vacante\",\"vacante\".\"folio\",\"vacante\".\"ubicacion\",\"vacante\".\"area_experiencia\",\"vacante\".\"texto_introductorio\",\"vacante\".\"escolaridad\",\"vacante\".\"sueldo_vacante\",\"vacante\".\"anios_experiencia\",\"vacante\".\"conocimientos\",\"vacante\".\"talentos\",\"vacante\".\"principales_funciones\",\"vacante\".\"horario\",\"vacante\".\"edad\",\"vacante\".\"observaciones\",\"vacante\".\"fecha_publicacion\" FROM \"vacante\" WHERE \"vacante\".\"folio\" = :folio ";
				
				Query q = session.createSQLQuery(sql);
				
				q.setParameter("folio", usu);
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
				for (Object object : d) {
			         Map row = (Map) object;
			         
			         HashMap<String, Object> itemMap = new HashMap<String, Object>();
			         
			         
			         itemMap.put("nombre", (String) row.get("nombre_vacante"));
			         itemMap.put("folio", (String) row.get("folio"));
			         itemMap.put("texto", (String) row.get("texto_introductorio"));
			         itemMap.put("escolaridad", (String) row.get("escolaridad"));
			         itemMap.put("conocimientos", (String) row.get("conocimientos"));
			         itemMap.put("talentos", (String) row.get("talentos"));
			         itemMap.put("ubicaciones", (String) row.get("ubicacion"));
			         itemMap.put("area", (String) row.get("area_experiencia"));
			         itemMap.put("funciones", (String) row.get("principales_funciones"));
			         itemMap.put("sueldo", (BigDecimal) row.get("sueldo_vacante"));
			         itemMap.put("horario", (String) row.get("horario"));
			         itemMap.put("edad", (String) row.get("edad"));
			         itemMap.put("observaciones", (String) row.get("observaciones"));
			         String fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_publicacion"));
			         itemMap.put("fecha", (String) fechaxs );
			         
			         
			         items.add(itemMap);
			         
			        
			     	
			         }
				
				jsonDataDV.put("items", items);
				
				
				transt.commit();
		 }catch(Exception e){
			 	transt.rollback();
		 }
		
		return SUCCESS;
	}
	
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	

}
