package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class Vacantes extends ActionSupport{
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	private Set<Map<String, Object>> numeroVac = new HashSet<Map<String, Object>>();
	
	private  String idAdmin;
	private  String idTipo;
	private String nombreVacante;
	
	private String desdePag;
	private String hastaPag;
	

	Session session;

	public Vacantes(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
		
		
		
		
		
		
		Transaction vacanteMax = session.beginTransaction();
		
		try{
			
			
			String UbicacionAdmin = "";
			
			String ubicacionAdmin = " SELECT \"admins\".\"ubicacion\" FROM \"admins\" WHERE \"admins\".\"id_admin\" = :idAdmin ";
			
			Query q2 = session.createSQLQuery(ubicacionAdmin);
			q2.setParameter("idAdmin", idAdmin);
			
			q2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d2 = q2.list();
		
			for (Object object : d2) {
		         Map row2 = (Map) object;
		         	UbicacionAdmin = (String) row2.get("ubicacion");
		         }
			
			
		
		if(idAdmin!=null){
			
			
			if(desdePag ==null ){this.desdePag = "0";}
			if(hastaPag ==null ){this.hastaPag = "5";}
			
			
			
			String sql_no_vac = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE \"vacante\".\"ubicacion\" LIKE :ubicacion ";
			
			Query q = session.createSQLQuery(sql_no_vac);
			
			q.setParameter("ubicacion", '%' + UbicacionAdmin + '%');
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
		
			for (Object object : d) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         itemMap.put("num_vacantes", (BigDecimal) row.get("NUMVACS"));
		         numeroVac.add(itemMap);
		         }
			
			
			String sql_vac_no_filtro = "  SELECT * FROM (SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"ubicacion\" LIKE :ubicacion  ) WHERE FILAS BETWEEN :desdePag  AND :hastaPag ";
			
			
			
			Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
			
			query_vac_no_filtro.setParameter("ubicacion", '%' + UbicacionAdmin + '%').setParameter("desdePag", desdePag ).setParameter("hastaPag", hastaPag);
			
			query_vac_no_filtro.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List list_vac_no_filtro = query_vac_no_filtro.list();
			
			
			for (Object object : list_vac_no_filtro) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         
		         itemMap.put("id_vacante", (BigDecimal) row.get("id_vacante"));
		         itemMap.put("nombre", (String) row.get("nombre_vacante"));
		         itemMap.put("folio", (String) row.get("folio"));
		         String fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_publicacion"));
		         itemMap.put("fechaP", (String) fechaxs );
		         String fechaxs2 = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_vigencia"));
		         itemMap.put("fechaV", (String) fechaxs2 );
		         itemMap.put("texto", (String) row.get("texto_introductorio"));
		         itemMap.put("escolaridad", (String) row.get("escolaridad"));
		         itemMap.put("sueldo", (BigDecimal) row.get("sueldo_vacante"));
		         itemMap.put("anios", (BigDecimal) row.get("anios_experiencia"));
		         itemMap.put("conocimientos", (String) row.get("conocimientos"));
		         itemMap.put("talentos", (String) row.get("talentos"));
		         itemMap.put("ubicaciones", (String) row.get("ubicacion"));
		         itemMap.put("estado", (String) row.get("estado_vacante"));
		         itemMap.put("destacado", (BigDecimal) row.get("destacado"));
		         itemMap.put("area", (String) row.get("area_experiencia"));
		         itemMap.put("funciones", (String) row.get("principales_funciones"));
		         itemMap.put("horario", (String) row.get("horario"));
		         itemMap.put("edad", (String) row.get("edad"));
		         itemMap.put("observaciones", (String) row.get("observaciones"));
		         itemMap.put("subido_por", (String) row.get("nombre"));
		         itemMap.put("tipo_vacante", (String) row.get("tipo_vacante"));
		         itemMap.put("vac_ubi_vacante", (String) row.get("VAC_UBICACION"));
		        
		         
		         items.add(itemMap);
		     	
		     	
		         }
			
			
		}else if(idTipo!=null){
			
			if(desdePag ==null ){this.desdePag = "0";}
			if(hastaPag ==null ){this.hastaPag = "5";}
			
				
			
			String sql_no_vac = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE  \"vacante\".\"ubicacion\" LIKE :ubicacion ";
			
			Query q = session.createSQLQuery(sql_no_vac);
			
			q.setParameter("ubicacion", '%' + UbicacionAdmin + '%');
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
		
			for (Object object : d) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         itemMap.put("num_vacantes", (BigDecimal) row.get("NUMVACS"));
		         numeroVac.add(itemMap);
		         }
			
			
			
			
			String sql_vac_no_filtro = " SELECT * FROM (SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"ubicacion\" LIKE :ubicacion AND \"vacante\".\"tipo_vacante\" = :idTipo  ) WHERE FILAS BETWEEN :desdePag  AND :hastaPag   ";
			
			Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
			
			query_vac_no_filtro.setParameter("ubicacion", '%' + UbicacionAdmin + '%').setParameter("idTipo", idTipo).setParameter("desdePag", desdePag).setParameter("hastaPag", hastaPag);
			
			query_vac_no_filtro.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List list_vac_no_filtro = query_vac_no_filtro.list();
			
			
			for (Object object : list_vac_no_filtro) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         
		         itemMap.put("id_vacante", (BigDecimal) row.get("id_vacante"));
		         itemMap.put("nombre", (String) row.get("nombre_vacante"));
		         itemMap.put("folio", (String) row.get("folio"));
		         String fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_publicacion"));
		         itemMap.put("fechaP", (String) fechaxs );
		         String fechaxs2 = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_vigencia"));
		         itemMap.put("fechaV", (String) fechaxs2 );
		         itemMap.put("texto", (String) row.get("texto_introductorio"));
		         itemMap.put("escolaridad", (String) row.get("escolaridad"));
		         itemMap.put("sueldo", (BigDecimal) row.get("sueldo_vacante"));
		         itemMap.put("anios", (BigDecimal) row.get("anios_experiencia"));
		         itemMap.put("conocimientos", (String) row.get("conocimientos"));
		         itemMap.put("talentos", (String) row.get("talentos"));
		         itemMap.put("ubicaciones", (String) row.get("ubicacion"));
		         itemMap.put("estado", (String) row.get("estado_vacante"));
		         itemMap.put("destacado", (BigDecimal) row.get("destacado"));
		         itemMap.put("area", (String) row.get("area_experiencia"));
		         itemMap.put("funciones", (String) row.get("principales_funciones"));
		         itemMap.put("horario", (String) row.get("horario"));
		         itemMap.put("edad", (String) row.get("edad"));
		         itemMap.put("observaciones", (String) row.get("observaciones"));
		         itemMap.put("subido_por", (String) row.get("nombre"));
		         itemMap.put("tipo_vacante", (String) row.get("tipo_vacante"));
		         itemMap.put("vac_ubi_vacante", (String) row.get("VAC_UBICACION"));
		        
		         
		         items.add(itemMap);
		     	
		     	
		         }
			
			
			
		}else if(nombreVacante!=null){
			
			if(desdePag ==null ){this.desdePag = "0";}
			if(hastaPag ==null ){this.hastaPag = "5";}
			
			
			
			String sql_no_vac = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE \"vacante\".\"nombre_vacante\" LIKE :nombreVacante  ";
			
			Query q = session.createSQLQuery(sql_no_vac);
			
			q.setParameter("nombreVacante", '%' + nombreVacante + '%' );
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
		
			for (Object object : d) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         itemMap.put("num_vacantes", (BigDecimal) row.get("NUMVACS"));
		         numeroVac.add(itemMap);
		         }
			
			String sql_vac_no_filtro = "  SELECT * FROM (SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND  \"vacante\".\"nombre_vacante\" LIKE :nombreVacante ) WHERE FILAS BETWEEN :desdePag  AND :hastaPag  ";
			
			Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
			
			query_vac_no_filtro.setParameter("nombreVacante", '%' + nombreVacante + '%').setParameter("desdePag", desdePag).setParameter("hastaPag", hastaPag);
			
			query_vac_no_filtro.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List list_vac_no_filtro = query_vac_no_filtro.list();
			
			
			for (Object object : list_vac_no_filtro) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         
		         itemMap.put("id_vacante", (BigDecimal) row.get("id_vacante"));
		         itemMap.put("nombre", (String) row.get("nombre_vacante"));
		         itemMap.put("folio", (String) row.get("folio"));
		         String fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_publicacion"));
		         itemMap.put("fechaP", (String) fechaxs );
		         String fechaxs2 = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_vigencia"));
		         itemMap.put("fechaV", (String) fechaxs2 );
		         itemMap.put("texto", (String) row.get("texto_introductorio"));
		         itemMap.put("escolaridad", (String) row.get("escolaridad"));
		         itemMap.put("sueldo", (BigDecimal) row.get("sueldo_vacante"));
		         itemMap.put("anios", (BigDecimal) row.get("anios_experiencia"));
		         itemMap.put("conocimientos", (String) row.get("conocimientos"));
		         itemMap.put("talentos", (String) row.get("talentos"));
		         itemMap.put("ubicaciones", (String) row.get("ubicacion"));
		         itemMap.put("estado", (String) row.get("estado_vacante"));
		         itemMap.put("destacado", (BigDecimal) row.get("destacado"));
		         itemMap.put("area", (String) row.get("area_experiencia"));
		         itemMap.put("funciones", (String) row.get("principales_funciones"));
		         itemMap.put("horario", (String) row.get("horario"));
		         itemMap.put("edad", (String) row.get("edad"));
		         itemMap.put("observaciones", (String) row.get("observaciones"));
		         itemMap.put("subido_por", (String) row.get("nombre"));
		         itemMap.put("tipo_vacante", (String) row.get("tipo_vacante"));
		         itemMap.put("vac_ubi_vacante", (String) row.get("VAC_UBICACION"));
		        
		         
		         items.add(itemMap);
				}
			
			
			
			
		}else{
			
			 
			if(desdePag ==null ){this.desdePag = "0";}
			if(hastaPag ==null ){this.hastaPag = "5";}
			
			
			
			
			String sql_no_vac = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\"  ";
			
			Query q = session.createSQLQuery(sql_no_vac);
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
		
			for (Object object : d) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         itemMap.put("num_vacantes", (BigDecimal) row.get("NUMVACS"));
		         numeroVac.add(itemMap);
		         }
			
			
			
			
			String sql_vac_no_filtro = "  SELECT * FROM (SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" ) WHERE FILAS BETWEEN :desdePag  AND :hastaPag  ";
			
			Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
			
			query_vac_no_filtro.setParameter("desdePag", desdePag).setParameter("hastaPag", hastaPag);
			
			query_vac_no_filtro.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List list_vac_no_filtro = query_vac_no_filtro.list();
			
			
			for (Object object : list_vac_no_filtro) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         
		         itemMap.put("id_vacante", (BigDecimal) row.get("id_vacante"));
		         itemMap.put("nombre", (String) row.get("nombre_vacante"));
		         itemMap.put("folio", (String) row.get("folio"));
		         String fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_publicacion"));
		         itemMap.put("fechaP", (String) fechaxs );
		         String fechaxs2 = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_vigencia"));
		         itemMap.put("fechaV", (String) fechaxs2 );
		         itemMap.put("texto", (String) row.get("texto_introductorio"));
		         itemMap.put("escolaridad", (String) row.get("escolaridad"));
		         itemMap.put("sueldo", (BigDecimal) row.get("sueldo_vacante"));
		         itemMap.put("anios", (BigDecimal) row.get("anios_experiencia"));
		         itemMap.put("conocimientos", (String) row.get("conocimientos"));
		         itemMap.put("talentos", (String) row.get("talentos"));
		         itemMap.put("ubicaciones", (String) row.get("ubicacion"));
		         itemMap.put("estado", (String) row.get("estado_vacante"));
		         itemMap.put("destacado", (BigDecimal) row.get("destacado"));
		         itemMap.put("area", (String) row.get("area_experiencia"));
		         itemMap.put("funciones", (String) row.get("principales_funciones"));
		         itemMap.put("horario", (String) row.get("horario"));
		         itemMap.put("edad", (String) row.get("edad"));
		         itemMap.put("observaciones", (String) row.get("observaciones"));
		         itemMap.put("subido_por", (String) row.get("nombre"));
		         itemMap.put("tipo_vacante", (String) row.get("tipo_vacante"));
		         itemMap.put("vac_ubi_vacante", (String) row.get("VAC_UBICACION"));
		        
		         
		         items.add(itemMap);
		     	
		     	
		         }
			
			
			
			
		}
		
		
		jsonData.put("numeroVacantes", numeroVac); 
		
		
		jsonData.put("items", items);
		
		
		
		
		vacanteMax.commit();
		}catch(Exception e){
			
			vacanteMax.rollback();
		}
		
		return SUCCESS;
		
		
		
	}
	
	
	
	
	
	
	
	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
		}
	
	public Set<Map<String, Object>> getItems() {
		return items;
		}

	
	
	
	
	public String getIdAdmin() {
		return idAdmin;
	}

	public void setIdAdmin(String idAdmin) {
		
		

		String reg = "[=;*|()%#!&?]";
        String result = idAdmin.replaceAll(reg,"");
        this.idAdmin = result;
		
	}

	public String getIdTipo() {
		return idTipo;
	}

	public void setIdTipo(String idTipo) {
		
		String reg = "[=;*|()%#!&?]";
        String result = idTipo.replaceAll(reg,"");
        this.idTipo = result;
        
		
	}


	public String getNombreVacante() {
		return nombreVacante;
	}


	public void setNombreVacante(String nombreVacante) {
		this.nombreVacante = nombreVacante;
	}



	public Set<Map<String, Object>> getNumeroVac() {
		return numeroVac;
	}



	public void setNumeroVac(Set<Map<String, Object>> numeroVac) {
		this.numeroVac = numeroVac;
	}



	public String getDesdePag() {
		return desdePag;
	}



	public void setDesdePag(String desdePag) {
		
		
		String reg = "[=;*|()%#!&?]";
        String result = desdePag.replaceAll(reg,"");
        this.desdePag = result;
		
		
		
	}



	public String getHastaPag() {
		return hastaPag;
	}



	public void setHastaPag(String hastaPag) {
		
		String reg = "[=;*|()%#!&?]";
        String result = hastaPag.replaceAll(reg,"");
        this.hastaPag = result;
		
	}

}
