package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class ObtenerPostusDinamic extends ActionSupport {
	
	private String idVacante;
	private String sunP;
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	Session session;
	
	public ObtenerPostusDinamic(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		 HttpServletRequest request = ServletActionContext.getRequest();
		 String vac = escapeChars(request.getParameter("idVacante"));
		 String adm = escapeChars(request.getParameter("sunP"));
		 
		 
		 Transaction transt = session.beginTransaction();
		 try{
		 
			 String sql = "  SELECT  \"usuario\".\"nombre\", \"usuario\".\"apellido_materno\", \"usuario\".\"apellido_paterno\", \"vacante\".\"nombre_vacante\", \"usuario\".\"id_postulante\",  \"usuario\".\"area_de_interes\", \"datos_personales\".\"sexo\" FROM \"usuario\" , \"vacante\" , \"postulaciones\" , \"admins\", \"datos_personales\" WHERE \"usuario\".\"id_postulante\" = \"postulaciones\".\"id_usuario\" AND \"vacante\".\"id_vacante\" = \"postulaciones\".\"id_vacante\"  AND \"datos_personales\".\"id_usuario\" = \"usuario\".\"id_postulante\"  AND \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"datos_personales\".\"id_usuario\" = \"usuario\".\"id_postulante\" AND \"vacante\".\"subido_por\" = :adm  AND \"vacante\".\"id_vacante\" = :vac ";
				
				Query q = session.createSQLQuery(sql);
				
				q.setParameter("adm", adm).setParameter("vac", vac);
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
				for (Object object : d) {
			         Map row = (Map) object;
			         
			         HashMap<String, Object> itemMap = new HashMap<String, Object>();
			         
			         itemMap.put("PosId", (BigDecimal) row.get("id_postulante"));
			         itemMap.put("nombre", (String) row.get("nombre"));
			         itemMap.put("apellidoMaterno", (String) row.get("apellido_materno"));
			         itemMap.put("apellidoPaterno", (String) row.get("apellido_paterno"));
			         itemMap.put("areaInteres", (String) row.get("area_de_interes"));
			         itemMap.put("nombreVacante", (String) row.get("nombre_vacante"));
			         itemMap.put("genero", (String) row.get("sexo"));
			         
			         
			         
			         
			         items.add(itemMap);
			         
			        
			     	
			         }
				
				jsonData.put("items", items);
				
				System.out.print(jsonData);
				
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
	

	public String getIdVacante() {
		return idVacante;
	}

	public void setIdVacante(String idVacante) {
		this.idVacante = idVacante;
	}

	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
	}

	public void setJsonData(LinkedHashMap<String, Object> jsonData) {
		this.jsonData = jsonData;
	}

	public Set<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}

	public String getSunP() {
		return sunP;
	}

	public void setSunP(String sunP) {
		this.sunP = sunP;
	}

}
