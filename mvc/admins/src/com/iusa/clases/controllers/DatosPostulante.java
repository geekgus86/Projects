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

public class DatosPostulante extends ActionSupport{

	
	private String num_id;
	
	
	
	private LinkedHashMap<String, Object> jsonDataDP = new LinkedHashMap<String, Object>();
	
	
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	
	private Set<Map<String, Object>> talentos = new HashSet<Map<String, Object>>();
	
	
	private Set<Map<String, Object>> hobits = new HashSet<Map<String, Object>>();
	
	
	
	Session session;
	
	public DatosPostulante(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		HttpServletRequest request = ServletActionContext.getRequest();
		
		String usu_id = escapeChars( request.getParameter("num_id"));
		
		
		Transaction selectUsuario = session.beginTransaction();
		
		try{
		
		 
		 String sql = " SELECT \"usuario\".\"id_postulante\", \"usuario\".\"nombre\", \"usuario\".\"apellido_materno\", \"usuario\".\"apellido_paterno\", \"usuario\".\"area_de_interes\", \"nivel_academico\".\"nivel_academico\", \"usuario\".\"telefono\" , \"usuario\".\"correo_electronico\", \"usuario\".\"fecha_nacimiento\" FROM \"usuario\" , \"nivel_academico\", \"datos_personales\" WHERE \"usuario\".\"nivel_de_estudios\" = \"nivel_academico\".\"id_academico\" AND \"usuario\".\"id_postulante\" = :usu_id  AND \"datos_personales\".\"id_usuario\" = :usu_id ";
		
		 Query q = session.createSQLQuery(sql);
		 
		 q.setParameter("usu_id", usu_id).setParameter("usu_id", usu_id);
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
		
			for (Object object : d) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         
		         itemMap.put("id", (BigDecimal) row.get("id_postulante"));
		         itemMap.put("nombre", (String) row.get("nombre"));
		         itemMap.put("apellidoM", (String) row.get("apellido_materno"));
		         itemMap.put("apellidoP", (String) row.get("apellido_paterno"));
		         itemMap.put("areaInteres", (String) row.get("area_de_interes"));
		         itemMap.put("areaFormacion", (String) row.get("area_formacion"));
		         itemMap.put("niveAcademico", (String) row.get("nivel_academico"));
		         itemMap.put("telefono", (String) row.get("telefono"));
		         itemMap.put("correo_electronico", (String) row.get("correo_electronico"));
		         itemMap.put("fechaNac", new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_nacimiento")));
		         
		         
		         
		         items.add(itemMap);
		         
		        
		     	
		         }
			
			
			
			
			
			
			
			 String sql2 = " SELECT \"talento\".\"talento\",\"talento_aux\".\"porcentaje\" FROM \"talento\",\"talento_aux\" WHERE \"talento\".\"id_talento\" = \"talento_aux\".\"id_talento\" AND \"talento_aux\".\"id_usuario\" = :usu_id  ";
				
			 Query q2 = session.createSQLQuery(sql2);
			 q2.setParameter("usu_id", usu_id);
				
				q2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d2 = q2.list();
			
				for (Object object : d2) {
			         Map row2 = (Map) object;
			         
			         HashMap<String, Object> itemMap2 = new HashMap<String, Object>();
			         
			         
			         itemMap2.put("porcentaje", (BigDecimal) row2.get("porcentaje"));
			         itemMap2.put("talento", (String) row2.get("talento"));
			         
			         talentos.add(itemMap2);
			         
			        
			     	
			         }
				
				
				
				
				
				
				 String sql3 = " SELECT \"hobbie\".\"hobbie\", \"hobbie\".\"categoria\", \"hobbie\".\"id_hob\" FROM \"hobbie\" , \"aux_hob\" WHERE \"aux_hob\".\"id_hobbie\" = \"hobbie\".\"id_hob\" AND \"aux_hob\".\"id_usuario\" = :usu_id  ";
					
				 Query q3 = session.createSQLQuery(sql3);
				 
				 q3.setParameter("usu_id", usu_id);
					
					q3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List d3 = q3.list();
				
					for (Object object : d3) {
				         Map row3 = (Map) object;
				         
				         HashMap<String, Object> itemMap3 = new HashMap<String, Object>();
				         
				         
				         itemMap3.put("idHobit", (BigDecimal) row3.get("id_hob"));
				         itemMap3.put("hobbie", (String) row3.get("hobbie"));
				         itemMap3.put("categoria", (String) row3.get("categoria"));
				         
				         hobits.add(itemMap3);
				         
				        
				     	
				         }
				
					
			
			
			jsonDataDP.put("items", items);
			jsonDataDP.put("talentos", talentos);
			jsonDataDP.put("hobits", hobits);
			
			
			selectUsuario.commit();
		}catch(Exception e){
			
			selectUsuario.rollback();
		}
		
		return SUCCESS;
	}
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}

	public String getNum_folio() {
		return num_id;
	}

	public void setNum_folio(String num_id) {
		this.num_id = num_id;
	}

	public LinkedHashMap<String, Object> getJsonDataDP() {
		return jsonDataDP;
	}

	public void setJsonDataDP(LinkedHashMap<String, Object> jsonDataDP) {
		this.jsonDataDP = jsonDataDP;
	}

	public Set<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}

	public Set<Map<String, Object>> getTalentos() {
		return talentos;
	}

	public void setTalentos(Set<Map<String, Object>> talentos) {
		this.talentos = talentos;
	}

	public Set<Map<String, Object>> getHobits() {
		return hobits;
	}

	public void setHobits(Set<Map<String, Object>> hobits) {
		this.hobits = hobits;
	}
}
