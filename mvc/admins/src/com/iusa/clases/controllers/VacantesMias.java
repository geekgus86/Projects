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

public class VacantesMias extends ActionSupport{
	
	
	private LinkedHashMap<String, Object> jsonDataMV = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	private Set<Map<String, Object>> numeroVac = new HashSet<Map<String, Object>>();
	
	
	private  String idAdmin;
	private  String idTipo;
	private String nombreVacante;
	
	
	private BigDecimal nivelAdmin;
	
	private String desdePag;
	private String hastaPag;
	
	
	
	Session session;
	
	public VacantesMias(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		HttpServletRequest request = ServletActionContext.getRequest();
		
		
		
		Transaction vacanteMia = session.beginTransaction();
		
		try{
		
			
			
			String ubicacionAdmin = " SELECT \"admins\".\"nivel\" FROM \"admins\" WHERE \"admins\".\"id_admin\" = :idAdmin ";
			
			Query q2 = session.createSQLQuery(ubicacionAdmin);
			q2.setParameter("idAdmin", idAdmin);
			
			q2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d2 = q2.list();
		
			for (Object object : d2) {
		         Map row2 = (Map) object;
		         nivelAdmin = (BigDecimal) row2.get("nivel");
		         }
			
		
			
			
		if(nivelAdmin.intValueExact() == 4){
			
			
			
			if(idTipo!=null){
				
				
				if(desdePag ==null ){this.desdePag = "0";}
				if(hastaPag ==null ){this.hastaPag = "5";}
				
				String sql_no_vac = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE  \"vacante\".\"subido_por\" =:idAdmin AND \"vacante\".\"tipo_vacante\" =:idTipo ";
				
				Query q = session.createSQLQuery(sql_no_vac);
				q.setParameter("idAdmin", idAdmin).setParameter("idTipo", idTipo);
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
				for (Object object : d) {
			         Map row = (Map) object;
			         
			         HashMap<String, Object> itemMap = new HashMap<String, Object>();
			         itemMap.put("num_vacantes", (BigDecimal) row.get("NUMVACS"));
			         numeroVac.add(itemMap);
			         }
				
				
				
				String sql_vac_no_filtro = " SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"subido_por\" =:idAdmin AND \"vacante\".\"tipo_vacante\" =:idTipo ";
				
				Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
				
				query_vac_no_filtro.setParameter("idAdmin",idAdmin).setParameter("idTipo", idTipo);
				
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
				
				String sql_no_vac = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE \"vacante\".\"nombre_vacante\" LIKE :nombreVacante AND \"vacante\".\"subido_por\" = :idAdmin ";
				
				Query q = session.createSQLQuery(sql_no_vac);
				
				q.setParameter("nombreVacante", '%' + nombreVacante + '%' ).setParameter("idAdmin", idAdmin);
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
				for (Object object : d) {
			         Map row = (Map) object;
			         
			         HashMap<String, Object> itemMap = new HashMap<String, Object>();
			         itemMap.put("num_vacantes", (BigDecimal) row.get("NUMVACS"));
			         numeroVac.add(itemMap);
			         }
				
				
				
				String sql_vac_no_filtro = "SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"ubicacion\" LIKE :ubicacion  AND  \"vacante\".\"nombre_vacante\" LIKE :nombreVacante  AND \"vacante\".\"subido_por\" = :idAdmin ";
				
				
				Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
				
				query_vac_no_filtro.setParameter("nombreVacante", '%' + nombreVacante + '%').setParameter("idAdmin", idAdmin);
				
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
				
				String sql_no_vac = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE  \"vacante\".\"subido_por\" =:idAdmin ";
				
				Query q = session.createSQLQuery(sql_no_vac);
				
				q.setParameter("idAdmin", idAdmin);
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
				for (Object object : d) {
			         Map row = (Map) object;
			         
			         HashMap<String, Object> itemMap = new HashMap<String, Object>();
			         itemMap.put("num_vacantes", (BigDecimal) row.get("NUMVACS"));
			         numeroVac.add(itemMap);
			         }
				
				
				String sql_vac_no_filtro = "  SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"subido_por\" = :idAdmin ";
				
				
				Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
				
				query_vac_no_filtro.setParameter("idAdmin", idAdmin);
				
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
			
			
			
			
			
			
			
		}else{
			
			
			/* Verificando cuantos usuarios tiene el Cluster */
			
			
			String sql_cluster = " SELECT \"clusters\".\"id_admin_calificador\" FROM \"clusters\" WHERE \"clusters\".\"id_admin\" = :idAdmin ";
			
			
			Query queryclus = session.createSQLQuery(sql_cluster);
			
			queryclus.setParameter("idAdmin", idAdmin);
			
			queryclus.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List list_calif_tiene = queryclus.list();
			
			
			if(list_calif_tiene.size() == 0){
				/* SI NI TIENE CALIFICADORES HACE OPERACIONES NORMALES DE MUESTRA */
				
				if(idTipo!=null){
					
					
					if(desdePag ==null ){this.desdePag = "0";}
					if(hastaPag ==null ){this.hastaPag = "5";}
					
					String sql_no_vac = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE  \"vacante\".\"subido_por\" =:idAdmin AND \"vacante\".\"tipo_vacante\" =:idTipo ";
					
					Query q = session.createSQLQuery(sql_no_vac);
					q.setParameter("idAdmin", idAdmin).setParameter("idTipo", idTipo);
					
					q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List d = q.list();
				
					for (Object object : d) {
				         Map row = (Map) object;
				         
				         HashMap<String, Object> itemMap = new HashMap<String, Object>();
				         itemMap.put("num_vacantes", (BigDecimal) row.get("NUMVACS"));
				         numeroVac.add(itemMap);
				         }
					
					
					
					String sql_vac_no_filtro = " SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"subido_por\" =:idAdmin AND \"vacante\".\"tipo_vacante\" =:idTipo  ";
					
					Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
					
					query_vac_no_filtro.setParameter("idAdmin",idAdmin).setParameter("idTipo", idTipo);
					
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
					
					String sql_no_vac = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE \"vacante\".\"nombre_vacante\" LIKE :nombreVacante AND \"vacante\".\"subido_por\" = :idAdmin ";
					
					Query q = session.createSQLQuery(sql_no_vac);
					
					q.setParameter("nombreVacante", '%' + nombreVacante + '%' ).setParameter("idAdmin", idAdmin);
					
					q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List d = q.list();
				
					for (Object object : d) {
				         Map row = (Map) object;
				         
				         HashMap<String, Object> itemMap = new HashMap<String, Object>();
				         itemMap.put("num_vacantes", (BigDecimal) row.get("NUMVACS"));
				         numeroVac.add(itemMap);
				         }
					
					
					
					String sql_vac_no_filtro = " SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"ubicacion\" LIKE :ubicacion  AND  \"vacante\".\"nombre_vacante\" LIKE :nombreVacante  AND \"vacante\".\"subido_por\" = :idAdmin ";
					
					
					Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
					
					query_vac_no_filtro.setParameter("nombreVacante", '%' + nombreVacante + '%').setParameter("idAdmin", idAdmin);
					
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
					String sql_no_vac = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE  \"vacante\".\"subido_por\" =:idAdmin ";
					
					Query q = session.createSQLQuery(sql_no_vac);
					
					q.setParameter("idAdmin", idAdmin);
					
					q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List d = q.list();
				
					for (Object object : d) {
				         Map row = (Map) object;
				         
				         HashMap<String, Object> itemMap = new HashMap<String, Object>();
				         itemMap.put("num_vacantes", (BigDecimal) row.get("NUMVACS"));
				         numeroVac.add(itemMap);
				         }
					
					
					String sql_vac_no_filtro = "  SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"subido_por\" = :idAdmin   ";
					
					
					Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
					
					query_vac_no_filtro.setParameter("idAdmin", idAdmin);
					
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
				
				
				
			}else{
				
				/* EN CASO DE QUE SI TENGA CALIFICADORES */
				
				int arrayIdCalif[] = new int[list_calif_tiene.size()];
				BigDecimal tempIdCalif;
				
				int i = 0;
				
				for (Object object : list_calif_tiene) {
			         Map rowLC = (Map) object;
			         
			         tempIdCalif = (BigDecimal) rowLC.get("id_admin_calificador");
			         arrayIdCalif[i] = tempIdCalif.intValueExact();
			         i = i + 1;
			     }
				
				
				
				
				if(idTipo!=null){
					
					
					BigDecimal noVacClus = new BigDecimal(0);
					BigDecimal noVacCalif =  new BigDecimal(0);
					
					int sumaNumcalif = 0;
					
					/* NUMERO VACANTES CLUSTER */
					String sql_no_vac = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE  \"vacante\".\"subido_por\" =:idAdmin AND \"vacante\".\"tipo_vacante\" =:idTipo ";
					
					Query q = session.createSQLQuery(sql_no_vac);
					q.setParameter("idAdmin", idAdmin).setParameter("idTipo", idTipo);
					
					q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List d = q.list();
				
					for (Object object : d) {
				         Map row = (Map) object;

				         noVacClus = (BigDecimal) row.get("NUMVACS");
				        
				     }
					
					/* NUMERO VACANTES CALIFICADORES DEL CLUSTER */
					
					for(int j=0;j<=(arrayIdCalif.length)-1;j++){
						
						String sql_no_vac2 = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE  \"vacante\".\"subido_por\" =:idAdmin AND \"vacante\".\"tipo_vacante\" =:idTipo ";
						
						Query q2c = session.createSQLQuery(sql_no_vac2);
						q2c.setParameter("idAdmin", arrayIdCalif[j]).setParameter("idTipo", idTipo);
						
						q2c.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List d2c = q2c.list();
					
						for (Object object : d2c) {
					         Map row2c = (Map) object;

					         noVacCalif = (BigDecimal) row2c.get("NUMVACS");
					   
					     }
						
						sumaNumcalif = sumaNumcalif + noVacCalif.intValueExact();
						
					}
					
					sumaNumcalif = sumaNumcalif + noVacClus.intValueExact();
					
					HashMap<String, Object> itemMapN = new HashMap<String, Object>();
			        itemMapN.put("num_vacantes", sumaNumcalif);
			        numeroVac.add(itemMapN);
			        
			        
			        
			        /* VACANTES DEL CLUSTER */
			        
			        if(desdePag ==null ){this.desdePag = "0";}
					if(hastaPag ==null ){this.hastaPag = "5";}
			        String sql_vac_no_filtro = "SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"subido_por\" =:idAdmin AND \"vacante\".\"tipo_vacante\" =:idTipo ";
					
					Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
					
					query_vac_no_filtro.setParameter("idAdmin",idAdmin).setParameter("idTipo", idTipo);
					
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
			        
			        
			        
			        /* VACANTES DE LOS CALIFICADORES */
					if(desdePag ==null ){this.desdePag = "0";}
					if(hastaPag ==null ){this.hastaPag = "5";}
					
					for(int k=0;k<=(arrayIdCalif.length)-1;k++){
						
						
						 String sql_vac_no_filtroC = " SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"subido_por\" =:idAdmin AND \"vacante\".\"tipo_vacante\" =:idTipo";
							
							Query query_vac_no_filtroC = session.createSQLQuery(sql_vac_no_filtroC);
							
							query_vac_no_filtroC.setParameter("idAdmin",arrayIdCalif[k]).setParameter("idTipo", idTipo);
							
							query_vac_no_filtroC.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List list_vac_no_filtroC = query_vac_no_filtroC.list();
							
							
							for (Object object : list_vac_no_filtroC) {
						         Map rowC = (Map) object;
						         
						         HashMap<String, Object> itemMapC = new HashMap<String, Object>();
						         
						         
						         itemMapC.put("id_vacante", (BigDecimal) rowC.get("id_vacante"));
						         itemMapC.put("nombre", (String) rowC.get("nombre_vacante"));
						         itemMapC.put("folio", (String) rowC.get("folio"));
						         String fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(rowC.get("fecha_publicacion"));
						         itemMapC.put("fechaP", (String) fechaxs );
						         String fechaxs2 = new SimpleDateFormat("dd/MM/yyyy").format(rowC.get("fecha_vigencia"));
						         itemMapC.put("fechaV", (String) fechaxs2 );
						         itemMapC.put("texto", (String) rowC.get("texto_introductorio"));
						         itemMapC.put("escolaridad", (String) rowC.get("escolaridad"));
						         itemMapC.put("sueldo", (BigDecimal) rowC.get("sueldo_vacante"));
						         itemMapC.put("anios", (BigDecimal) rowC.get("anios_experiencia"));
						         itemMapC.put("conocimientos", (String) rowC.get("conocimientos"));
						         itemMapC.put("talentos", (String) rowC.get("talentos"));
						         itemMapC.put("ubicaciones", (String) rowC.get("ubicacion"));
						         itemMapC.put("estado", (String) rowC.get("estado_vacante"));
						         itemMapC.put("destacado", (BigDecimal) rowC.get("destacado"));
						         itemMapC.put("area", (String) rowC.get("area_experiencia"));
						         itemMapC.put("funciones", (String) rowC.get("principales_funciones"));
						         itemMapC.put("horario", (String) rowC.get("horario"));
						         itemMapC.put("edad", (String) rowC.get("edad"));
						         itemMapC.put("observaciones", (String) rowC.get("observaciones"));
						         itemMapC.put("subido_por", (String) rowC.get("nombre"));
						         itemMapC.put("tipo_vacante", (String) rowC.get("tipo_vacante"));
						         itemMapC.put("vac_ubi_vacante", (String) rowC.get("VAC_UBICACION"));
						        
						         
						         items.add(itemMapC);
							
							}
						
						
						
					}
					
					
					
					
					
					
				}else if(nombreVacante!=null){
					
					
					BigDecimal noVacClus = new BigDecimal(0);
					BigDecimal noVacCalif =  new BigDecimal(0);
					
					int sumaNumcalif = 0;
					
					/* NUMERO VACANTES CLUSTER */
					String sql_no_vac = " SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE \"vacante\".\"nombre_vacante\" LIKE :nombreVacante AND \"vacante\".\"subido_por\" = :idAdmin ";
					
					Query q = session.createSQLQuery(sql_no_vac);
					q.setParameter("nombreVacante", '%' + nombreVacante + '%').setParameter("idAdmin", idAdmin);
					
					q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List d = q.list();
				
					for (Object object : d) {
				         Map row = (Map) object;

				         noVacClus = (BigDecimal) row.get("NUMVACS");
				        
				     }
					
					/* NUMERO VACANTES CALIFICADORES DEL CLUSTER */
					
					for(int j=0;j<=(arrayIdCalif.length)-1;j++){
						
						String sql_no_vac2 = "SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE \"vacante\".\"nombre_vacante\" LIKE :nombreVacante AND \"vacante\".\"subido_por\" = :idAdmin ";
						
						Query q2c = session.createSQLQuery(sql_no_vac2);
						q2c.setParameter("nombreVacante", '%' + nombreVacante + '%').setParameter("idAdmin", idAdmin);
						
						q2c.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List d2c = q2c.list();
					
						for (Object object : d2c) {
					         Map row2c = (Map) object;

					         noVacCalif = (BigDecimal) row2c.get("NUMVACS");
					   
					     }
						
						sumaNumcalif = sumaNumcalif + noVacCalif.intValueExact();
						
					}
					
					sumaNumcalif = sumaNumcalif + noVacClus.intValueExact();
					
					HashMap<String, Object> itemMapN = new HashMap<String, Object>();
			        itemMapN.put("num_vacantes", sumaNumcalif);
			        numeroVac.add(itemMapN);
			        
			        
			        
			        /* VACANTES DEL CLUSTER */
			        
			        if(desdePag ==null ){this.desdePag = "0";}
					if(hastaPag ==null ){this.hastaPag = "5";}
					
			        String sql_vac_no_filtro = "SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"ubicacion\" LIKE :ubicacion  AND  \"vacante\".\"nombre_vacante\" LIKE :nombreVacante  AND \"vacante\".\"subido_por\" = :idAdmin ";
					
					Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
					
					query_vac_no_filtro.setParameter("nombreVacante", '%' + nombreVacante + '%').setParameter("idAdmin", idAdmin);
					
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
			        
			        
			        
			        /* VACANTES DE LOS CALIFICADORES */
					 if(desdePag ==null ){this.desdePag = "0";}
						if(hastaPag ==null ){this.hastaPag = "5";}
						
					for(int k=0;k<=(arrayIdCalif.length)-1;k++){
						
						
						 String sql_vac_no_filtroC = " SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"ubicacion\" LIKE :ubicacion  AND  \"vacante\".\"nombre_vacante\" LIKE :nombreVacante  AND \"vacante\".\"subido_por\" = :idAdmin";
							
							Query query_vac_no_filtroC = session.createSQLQuery(sql_vac_no_filtroC);
							
							query_vac_no_filtroC.setParameter("nombreVacante", '%' + nombreVacante + '%').setParameter("idAdmin", idAdmin);
							
							query_vac_no_filtroC.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List list_vac_no_filtroC = query_vac_no_filtroC.list();
							
							
							for (Object object : list_vac_no_filtroC) {
						         Map rowC = (Map) object;
						         
						         HashMap<String, Object> itemMapC = new HashMap<String, Object>();
						         
						         
						         itemMapC.put("id_vacante", (BigDecimal) rowC.get("id_vacante"));
						         itemMapC.put("nombre", (String) rowC.get("nombre_vacante"));
						         itemMapC.put("folio", (String) rowC.get("folio"));
						         String fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(rowC.get("fecha_publicacion"));
						         itemMapC.put("fechaP", (String) fechaxs );
						         String fechaxs2 = new SimpleDateFormat("dd/MM/yyyy").format(rowC.get("fecha_vigencia"));
						         itemMapC.put("fechaV", (String) fechaxs2 );
						         itemMapC.put("texto", (String) rowC.get("texto_introductorio"));
						         itemMapC.put("escolaridad", (String) rowC.get("escolaridad"));
						         itemMapC.put("sueldo", (BigDecimal) rowC.get("sueldo_vacante"));
						         itemMapC.put("anios", (BigDecimal) rowC.get("anios_experiencia"));
						         itemMapC.put("conocimientos", (String) rowC.get("conocimientos"));
						         itemMapC.put("talentos", (String) rowC.get("talentos"));
						         itemMapC.put("ubicaciones", (String) rowC.get("ubicacion"));
						         itemMapC.put("estado", (String) rowC.get("estado_vacante"));
						         itemMapC.put("destacado", (BigDecimal) rowC.get("destacado"));
						         itemMapC.put("area", (String) rowC.get("area_experiencia"));
						         itemMapC.put("funciones", (String) rowC.get("principales_funciones"));
						         itemMapC.put("horario", (String) rowC.get("horario"));
						         itemMapC.put("edad", (String) rowC.get("edad"));
						         itemMapC.put("observaciones", (String) rowC.get("observaciones"));
						         itemMapC.put("subido_por", (String) rowC.get("nombre"));
						         itemMapC.put("tipo_vacante", (String) rowC.get("tipo_vacante"));
						         itemMapC.put("vac_ubi_vacante", (String) rowC.get("VAC_UBICACION"));
						        
						         
						         items.add(itemMapC);
							
							}
						
						
						
					}
					
					
					
					
				}else{
					
					
					BigDecimal noVacClus = new BigDecimal(0);
					BigDecimal noVacCalif =  new BigDecimal(0);
					
					int sumaNumcalif = 0;
					
					/* NUMERO VACANTES CLUSTER */
					
					String sql_no_vac = "SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE  \"vacante\".\"subido_por\" =:idAdmin";
					
					Query q = session.createSQLQuery(sql_no_vac);
					q.setParameter("idAdmin", idAdmin);
					
					q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List d = q.list();
				
					for (Object object : d) {
				         Map row = (Map) object;

				         noVacClus = (BigDecimal) row.get("NUMVACS");
				        
				     }
					
					/* NUMERO VACANTES CALIFICADORES DEL CLUSTER */
					
					for(int j=0;j<=(arrayIdCalif.length)-1;j++){
						
						String sql_no_vac2 = "SELECT Count(\"vacante\".\"id_vacante\") AS NUMVACS FROM \"vacante\" WHERE  \"vacante\".\"subido_por\" =:idAdmin";
						
						Query q2c = session.createSQLQuery(sql_no_vac2);
						q2c.setParameter("idAdmin", arrayIdCalif[j]);
						
						q2c.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List d2c = q2c.list();
					
						for (Object object : d2c) {
					         Map row2c = (Map) object;

					         noVacCalif = (BigDecimal) row2c.get("NUMVACS");
					   
					     }
						
						sumaNumcalif = sumaNumcalif + noVacCalif.intValueExact();
						
					}
					
					sumaNumcalif = sumaNumcalif + noVacClus.intValueExact();
					
					HashMap<String, Object> itemMapN = new HashMap<String, Object>();
			        itemMapN.put("num_vacantes", sumaNumcalif);
			        numeroVac.add(itemMapN);
			        
			        
			        
			        /* VACANTES DEL CLUSTER */
			        
			        if(desdePag ==null ){this.desdePag = "0";}
					if(hastaPag ==null ){this.hastaPag = "5";}
			        String sql_vac_no_filtro = " SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"subido_por\" = :idAdmin";
					
					Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
					
					query_vac_no_filtro.setParameter("idAdmin",idAdmin);
					
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
			        
			        
			        
			        /* VACANTES DE LOS CALIFICADORES */
					 if(desdePag ==null ){this.desdePag = "0";}
						if(hastaPag ==null ){this.hastaPag = "5";}
					for(int k=0;k<=(arrayIdCalif.length)-1;k++){
						
						
						 String sql_vac_no_filtroC = " SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION  FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"subido_por\" = :idAdmin";
							
							Query query_vac_no_filtroC = session.createSQLQuery(sql_vac_no_filtroC);
							
							query_vac_no_filtroC.setParameter("idAdmin",arrayIdCalif[k]);
							
							query_vac_no_filtroC.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List list_vac_no_filtroC = query_vac_no_filtroC.list();
							
							
							for (Object object : list_vac_no_filtroC) {
						         Map rowC = (Map) object;
						         
						         HashMap<String, Object> itemMapC = new HashMap<String, Object>();
						         
						         
						         itemMapC.put("id_vacante", (BigDecimal) rowC.get("id_vacante"));
						         itemMapC.put("nombre", (String) rowC.get("nombre_vacante"));
						         itemMapC.put("folio", (String) rowC.get("folio"));
						         String fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(rowC.get("fecha_publicacion"));
						         itemMapC.put("fechaP", (String) fechaxs );
						         String fechaxs2 = new SimpleDateFormat("dd/MM/yyyy").format(rowC.get("fecha_vigencia"));
						         itemMapC.put("fechaV", (String) fechaxs2 );
						         itemMapC.put("texto", (String) rowC.get("texto_introductorio"));
						         itemMapC.put("escolaridad", (String) rowC.get("escolaridad"));
						         itemMapC.put("sueldo", (BigDecimal) rowC.get("sueldo_vacante"));
						         itemMapC.put("anios", (BigDecimal) rowC.get("anios_experiencia"));
						         itemMapC.put("conocimientos", (String) rowC.get("conocimientos"));
						         itemMapC.put("talentos", (String) rowC.get("talentos"));
						         itemMapC.put("ubicaciones", (String) rowC.get("ubicacion"));
						         itemMapC.put("estado", (String) rowC.get("estado_vacante"));
						         itemMapC.put("destacado", (BigDecimal) rowC.get("destacado"));
						         itemMapC.put("area", (String) rowC.get("area_experiencia"));
						         itemMapC.put("funciones", (String) rowC.get("principales_funciones"));
						         itemMapC.put("horario", (String) rowC.get("horario"));
						         itemMapC.put("edad", (String) rowC.get("edad"));
						         itemMapC.put("observaciones", (String) rowC.get("observaciones"));
						         itemMapC.put("subido_por", (String) rowC.get("nombre"));
						         itemMapC.put("tipo_vacante", (String) rowC.get("tipo_vacante"));
						         itemMapC.put("vac_ubi_vacante", (String) rowC.get("VAC_UBICACION"));
						        
						         
						         items.add(itemMapC);
							
							}
						
						
						
					}
					
					
					
					
				}
				
				
				
				
				
				
			}
			
			
			
			
			
			
		}	
			
			
			
			
			

		
		jsonDataMV.put("numeroVacantes", numeroVac); 
		
		jsonDataMV.put("items", items);
		
		vacanteMia.commit();
		}catch(Exception e){
			e.printStackTrace();
			vacanteMia.rollback();
		}
		
		return SUCCESS;
	}
	
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}

	
	
	public LinkedHashMap<String, Object> getJsonDataMV() {
		return jsonDataMV;
	}
	public void setJsonDataMV(LinkedHashMap<String, Object> jsonDataMV) {
		this.jsonDataMV = jsonDataMV;
	}
	public Set<Map<String, Object>> getItems() {
		return items;
	}
	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
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

	public BigDecimal getNivelAdmin() {
		return nivelAdmin;
	}

	public void setNivelAdmin(BigDecimal nivelAdmin) {
		this.nivelAdmin = nivelAdmin;
	}
}
