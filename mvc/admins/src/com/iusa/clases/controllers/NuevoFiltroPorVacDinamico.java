package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
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

public class NuevoFiltroPorVacDinamico extends ActionSupport  {
	
	
	private String idVacante;
	private int edad;
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	Session session;
	
	public NuevoFiltroPorVacDinamico(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	
	public String giveMe() {
		
		
		HttpServletRequest request = ServletActionContext.getRequest();
		 String vac= escapeChars(request.getParameter("idVacante"));
		
		Transaction transt = session.beginTransaction();
		 try{
		 
			 String sql = " SELECT \"usuario\".\"nombre\", \"usuario\".\"apellido_materno\", \"usuario\".\"apellido_paterno\",\"usuario\".\"correo_electronico\",\"usuario\".\"telefono\", \"vacante\".\"nombre_vacante\", \"usuario\".\"id_postulante\", \"vacante\".\"id_vacante\", \"admins\".\"id_admin\", \"usuario\".\"area_de_interes\", \"usuario\".\"fecha_nacimiento\", \"datos_personales\".\"sexo\", \"mi_nuevo_filtro\".\"valor_calificacion\", \"mi_nuevo_filtro\".\"observaciones\", \"mi_nuevo_filtro\".\"id_mi_nuevo_filtro\" FROM \"usuario\" , \"vacante\" , \"mi_nuevo_filtro\" , \"admins\", \"datos_personales\" WHERE \"usuario\".\"id_postulante\" = \"mi_nuevo_filtro\".\"id_usuario\" AND \"vacante\".\"id_vacante\" = \"mi_nuevo_filtro\".\"id_vacante\"  AND \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"datos_personales\".\"id_usuario\" = \"usuario\".\"id_postulante\" AND \"vacante\".\"id_vacante\" = :vac ";
				
				Query q = session.createSQLQuery(sql);
				
				q.setParameter("vac", vac);
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
				for (Object object : d) {
			         Map row = (Map) object;
			         
			         HashMap<String, Object> itemMap = new HashMap<String, Object>();
			         
			         itemMap.put("idVAC", (BigDecimal) row.get("id_vacante"));
			         itemMap.put("idPOSTU", (BigDecimal) row.get("id_postulante"));
			         itemMap.put("idADM", (BigDecimal) row.get("id_admin"));
			         itemMap.put("nombreVAC", (String) row.get("nombre_vacante"));
			         
			         
			         String nombreAux=(String)row.get("nombre");
		        	 String apellidoPaterno=(String)row.get("apellido_paterno");
		        	 String apellidoMaterno=(String)row.get("apellido_materno");
		        	 String nombrePOSTU = nombreAux+" "+apellidoPaterno+" "+apellidoMaterno;
		        	 itemMap.put("nombrePOSTU", nombrePOSTU);
		        	 Date fechaNac=(Date)row.get("fecha_nacimiento");
		        	 this.setEdad(calcularEdad(fechaNac));
		        	 itemMap.put("edad", edad);
		        	 itemMap.put("areaInteres", (String) row.get("area_de_interes"));
		        	 itemMap.put("sexo", (String) row.get("sexo"));
		        	 itemMap.put("calif", (BigDecimal) row.get("valor_calificacion"));
		        	 itemMap.put("observaciones", (String) row.get("observaciones"));
		        	 itemMap.put("tel", (String) row.get("correo_electronico"));
		        	 itemMap.put("mail", (String) row.get("telefono"));
		        	 itemMap.put("id_mi_nuevo_filtro",(BigDecimal) row.get("id_mi_nuevo_filtro"));
		        	 
			         
			         
			         
			         
			         
			         
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
	
	
	public int calcularEdad(Date fechaNac){
		try {
			
			Calendar birth = new GregorianCalendar();
			Calendar today = new GregorianCalendar();
			int age=0;
			int factor=0;
			Date birthDate=fechaNac;
			Date currentDate=new Date();
			birth.setTime(birthDate);
			today.setTime(currentDate);
			if (today.get(Calendar.MONTH) <= birth.get(Calendar.MONTH)) {
			if (today.get(Calendar.MONTH) == birth.get(Calendar.MONTH)) {
			if (today.get(Calendar.DATE) > birth.get(Calendar.DATE)) {
			factor = -1; //Aun no celebra su cumpleaños
			}
			} else {
			factor = -1; //Aun no celebra su cumpleaños
			}
			}
			age=(today.get(Calendar.YEAR)-birth.get(Calendar.YEAR))+factor;
			
			return age;
			
		}catch(Exception e){
		    return -1;
		}
	}
	

	public String getIdVacante() {
		return idVacante;
	}

	public void setIdVacante(String idVacante) {
		this.idVacante = idVacante;
	}

	public int getEdad() {
		return edad;
	}

	public void setEdad(int edad) {
		this.edad = edad;
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

}
