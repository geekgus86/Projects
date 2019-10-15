package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class OtroProceso extends ActionSupport{
	
	private String postulante;
	
	private LinkedHashMap<String, Object> jsonDataOP = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> NombrePostu = new HashSet<Map<String, Object>>();
	private Set<Map<String, Object>> otroProcesoPostulaciones = new HashSet<Map<String, Object>>();
	private Set<Map<String, Object>> otroProcesoVacantes = new HashSet<Map<String, Object>>();
	private Set<Map<String, Object>> otroPocesoPrimerFiltro = new HashSet<Map<String, Object>>();
	private Set<Map<String, Object>> otroPocesoPrimerFiltroPersonas = new HashSet<Map<String, Object>>();
	private Set<Map<String, Object>> otroPocesoMiFiltro = new HashSet<Map<String, Object>>();
	private Set<Map<String, Object>> observacionesMiFiltro = new HashSet<Map<String, Object>>();
	
	
	
	Session session;
	
	public OtroProceso(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	public String giveMe() {
		
		
		String securePostulante = escapeChars(postulante);
		
		Transaction trans = session.beginTransaction();
		
		try{
		
		 String sql_nombre = " SELECT \"usuario\".\"nombre\", \"usuario\".\"apellido_materno\", \"usuario\".\"apellido_paterno\" FROM \"usuario\" WHERE \"usuario\".\"id_postulante\" = :postulante   ";
			
			Query qN = session.createSQLQuery(sql_nombre);
			
			qN.setParameter("postulante", securePostulante);
			
			qN.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dN = qN.list();
		
			for (Object object : dN) {
		         Map row5 = (Map) object;
		         
		         HashMap<String, Object> itemMap5 = new HashMap<String, Object>();
		         	String nombreAux=(String)row5.get("nombre");
	        	    String apellidoPaterno=(String)row5.get("apellido_paterno");
	        	    String apellidoMaterno=(String)row5.get("apellido_materno");
	        	    String todo =   nombreAux+" "+apellidoPaterno+" "+apellidoMaterno;
		         itemMap5.put("nombre",todo);
		         NombrePostu.add(itemMap5);
		         }
		
	
		
		 String sql_postulaciones = "  SELECT \"usuario\".\"id_postulante\" FROM \"usuario\"  WHERE \"usuario\".\"id_postulante\" = (SELECT Count(\"postulaciones\".\"id_usuario\") FROM \"postulaciones\" WHERE \"postulaciones\".\"id_usuario\" = :postulante )  ";
			
			Query q = session.createSQLQuery(sql_postulaciones);
			q.setParameter("postulante", securePostulante);
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
		
			for (Object object : d) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         itemMap.put("num_postulaciones", (BigDecimal) row.get("id_postulante"));
		         otroProcesoPostulaciones.add(itemMap);
		         }
			
		
			
			String sql_postuladoA = "  SELECT \"vacante\".\"nombre_vacante\" FROM \"vacante\" , \"usuario\" , \"postulaciones\" WHERE \"vacante\".\"id_vacante\" = \"postulaciones\".\"id_vacante\" AND \"usuario\".\"id_postulante\" = :postulante  AND \"usuario\".\"id_postulante\" = \"postulaciones\".\"id_usuario\" AND \"usuario\".\"id_postulante\" = :postulante   ";
			
			Query qA = session.createSQLQuery(sql_postuladoA);
			
			qA.setParameter("postulante", securePostulante).setParameter("postulante", securePostulante);
			
			qA.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dA = qA.list();
		
			for (Object object : dA) {
		         Map row3 = (Map) object;
		         
		         HashMap<String, Object> itemMap3 = new HashMap<String, Object>();
		         itemMap3.put("lasVacantes", (String) row3.get("nombre_vacante"));
		         otroProcesoVacantes.add(itemMap3);
		         }
			
		
		 String sql_primerfiltro = "  SELECT \"usuario\".\"id_postulante\" FROM \"usuario\"  WHERE \"usuario\".\"id_postulante\" = (SELECT Count(\"primer_filltro\".\"id_usuario\") FROM \"primer_filltro\" WHERE \"primer_filltro\".\"id_usuario\" = :postulante )  ";
			
			Query q2 = session.createSQLQuery(sql_primerfiltro);
			
			q2.setParameter("postulante", securePostulante);
			
			q2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d2 = q2.list();
		
			for (Object object : d2) {
		         Map row2 = (Map) object;
		         
		         HashMap<String, Object> itemMap2 = new HashMap<String, Object>();
		         itemMap2.put("num_postulaciones_primer_filtro", (BigDecimal) row2.get("id_postulante"));
		         otroPocesoPrimerFiltro.add(itemMap2);
		         }
			
		
			
			String sql_primerfiltro_persona = " SELECT \"admins\".\"nombre\" FROM \"admins\" , \"vacante\" , \"postulaciones\" WHERE \"admins\".\"id_admin\" = \"vacante\".\"subido_por\" AND \"postulaciones\".\"id_vacante\" = \"vacante\".\"id_vacante\" AND \"postulaciones\".\"id_usuario\" = :postulante ";
			
			Query qP = session.createSQLQuery(sql_primerfiltro_persona);
			
			qP.setParameter("postulante", securePostulante);
			
			qP.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dP = qP.list();
		
			for (Object object : dP) {
		         Map row6 = (Map) object;
		         
		         HashMap<String, Object> itemMap6 = new HashMap<String, Object>();
		         itemMap6.put("interactuando", (String) row6.get("nombre"));
		         otroPocesoPrimerFiltroPersonas.add(itemMap6);
		         }
			
			
	
		 String sql_mifiltro = " SELECT \"usuario\".\"id_postulante\" FROM \"usuario\"  WHERE \"usuario\".\"id_postulante\" = (SELECT Count(\"filtro\".\"id_usuario\") FROM \"filtro\" WHERE \"filtro\".\"id_usuario\" = :postulante )    ";
			
			Query q7 = session.createSQLQuery(sql_mifiltro);
			
			q7.setParameter("postulante", securePostulante);
			
			q7.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d7 = q7.list();
		
			for (Object object : d7) {
		         Map row7 = (Map) object;
		         
		         HashMap<String, Object> itemMap7 = new HashMap<String, Object>();
		         itemMap7.put("num_postulaciones_mi_filtro", (BigDecimal) row7.get("id_postulante"));
		         otroPocesoMiFiltro.add(itemMap7);
		         }
			
			 String sql_filtroobser = "select \"observaciones\" from \"mi_nuevo_filtro\" where \"id_usuario\" = :postulante";
				
				Query q8 = session.createSQLQuery(sql_filtroobser);
				
				q8.setParameter("postulante", securePostulante);
				
				q8.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d8 = q8.list();
			
				for (Object object : d8) {
			         Map row8 = (Map) object;
			         
			         HashMap<String, Object> itemMap8 = new HashMap<String, Object>();
			         itemMap8.put("filtro_obs", (String) row8.get("observaciones"));
			         observacionesMiFiltro.add(itemMap8);
			         }
			
			
			jsonDataOP.put("nombre", NombrePostu);
			jsonDataOP.put("postulaciones", otroProcesoPostulaciones);
			jsonDataOP.put("listaVacantes", otroProcesoVacantes);
			jsonDataOP.put("primerFiltro", otroPocesoPrimerFiltro);
			jsonDataOP.put("interactuandoPrimerFiltro", otroPocesoPrimerFiltroPersonas);
			jsonDataOP.put("miFiltro", otroPocesoMiFiltro);
			jsonDataOP.put("observaciones", observacionesMiFiltro);
		
		
			trans.commit();
			
		}catch(Exception e){
			
			trans.rollback();
		}
		
		return SUCCESS;
	}

	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	

	public String getPostulante() {
		return postulante;
	}


	public void setPostulante(String postulante) {
		this.postulante = postulante;
	}


	public LinkedHashMap<String, Object> getJsonDataOP() {
		return jsonDataOP;
	}


	public void setJsonDataOP(LinkedHashMap<String, Object> jsonDataOP) {
		this.jsonDataOP = jsonDataOP;
	}


	public Set<Map<String, Object>> getOtroProcesoPostulaciones() {
		return otroProcesoPostulaciones;
	}


	public void setOtroProcesoPostulaciones(Set<Map<String, Object>> otroProcesoPostulaciones) {
		this.otroProcesoPostulaciones = otroProcesoPostulaciones;
	}


	public Set<Map<String, Object>> getOtroPocesoPrimerFiltro() {
		return otroPocesoPrimerFiltro;
	}


	public void setOtroPocesoPrimerFiltro(Set<Map<String, Object>> otroPocesoPrimerFiltro) {
		this.otroPocesoPrimerFiltro = otroPocesoPrimerFiltro;
	}


	public Set<Map<String, Object>> getOtroProcesoVacantes() {
		return otroProcesoVacantes;
	}


	public void setOtroProcesoVacantes(Set<Map<String, Object>> otroProcesoVacantes) {
		this.otroProcesoVacantes = otroProcesoVacantes;
	}


	public Set<Map<String, Object>> getNombrePostu() {
		return NombrePostu;
	}


	public void setNombrePostu(Set<Map<String, Object>> nombrePostu) {
		NombrePostu = nombrePostu;
	}


	public Set<Map<String, Object>> getOtroPocesoPrimerFiltroPersonas() {
		return otroPocesoPrimerFiltroPersonas;
	}


	public void setOtroPocesoPrimerFiltroPersonas(
			Set<Map<String, Object>> otroPocesoPrimerFiltroPersonas) {
		this.otroPocesoPrimerFiltroPersonas = otroPocesoPrimerFiltroPersonas;
	}


	public Set<Map<String, Object>> getOtroPocesoMiFiltro() {
		return otroPocesoMiFiltro;
	}


	public void setOtroPocesoMiFiltro(Set<Map<String, Object>> otroPocesoMiFiltro) {
		this.otroPocesoMiFiltro = otroPocesoMiFiltro;
	}

}
