package com.iusa.clases.controllers;

import java.math.BigDecimal;
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

public class ReportesVacante extends ActionSupport{
	
	
	
	private  String idAdmin;
	
	private  BigDecimal vacTotalNum;
	
	private  BigDecimal usuTotalNum;
	
	
	private LinkedHashMap<String, Object> jsonDataRV = new LinkedHashMap<String, Object>();
	
	
	
	private Set<Map<String, Object>> numeroVacTotales = new HashSet<Map<String, Object>>();
	
	private Set<Map<String, Object>> numeroUsuTotales = new HashSet<Map<String, Object>>();
	
	
	
	
	private Set<Map<String, Object>> numeroVac = new HashSet<Map<String, Object>>();
	
	
	
	private Set<Map<String, Object>> vacantesData = new HashSet<Map<String, Object>>();

	
	
	
	private Set<Map<String, Object>> numeroVacAc = new HashSet<Map<String, Object>>();
	
	
	
	private Set<Map<String, Object>> numeroVacInactivas = new HashSet<Map<String, Object>>();
	
	
	private Set<Map<String, Object>> numeroVacEnRevCV = new HashSet<Map<String, Object>>();
	
	
	private Set<Map<String, Object>> numeroVacEnEntrevis = new HashSet<Map<String, Object>>();
	
	
	
	private Set<Map<String, Object>> numeroVacCubiertas = new HashSet<Map<String, Object>>();
	
	
	
	private Set<Map<String, Object>> numeroPostuPriFil = new HashSet<Map<String, Object>>();
	
	
	
	private Set<Map<String, Object>> numeroPostuMiFil = new HashSet<Map<String, Object>>();
	
	
	
	Session session;
	
	public ReportesVacante(){
		 session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	public String giveMe() {
		
		Transaction trans = session.beginTransaction();
		
		
		
		
		try{
			
			String sucereIdAmin = escapeChars(idAdmin);
			
		String sqlVacTotales = " SELECT Count(\"vacante\".\"id_vacante\") AS TOTALESVAC FROM \"vacante\" ";
		Query qT = session.createSQLQuery(sqlVacTotales);	
		qT.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dT = qT.list();
		for (Object object : dT) {
	         Map rowVT = (Map) object;
	         
	         //vacTotalNum = (BigDecimal) rowVT.get("id_vacante");
	         
	         HashMap<String, Object> itemMap = new HashMap<String, Object>();
	         itemMap.put("numVacTotalesP", (BigDecimal) rowVT.get("TOTALESVAC"));
	         numeroVacTotales.add(itemMap);
	     }
		
		
		String sqlUsuTotales = " SELECT Count(\"usuario\".\"id_postulante\") AS TOTALESUSU FROM \"usuario\" ";
		Query qU = session.createSQLQuery(sqlUsuTotales);
		qU.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dU = qU.list();
		for (Object object : dU) {
	         Map rowVU = (Map) object;
	         //usuTotalNum = (BigDecimal) rowVU.get("id_postulante");
	         HashMap<String, Object> itemMap = new HashMap<String, Object>();
	         itemMap.put("numUsuTotalesP", (BigDecimal) rowVU.get("TOTALESUSU"));
	         numeroUsuTotales.add(itemMap);
	     }
		
		
		String sql_no_vac = " SELECT Count(\"vacante\".\"subido_por\")AS NUMVACSUBIDAS FROM \"vacante\" WHERE \"vacante\".\"subido_por\" = :idAdmin   ";
		
		Query q = session.createSQLQuery(sql_no_vac);
		
		q.setParameter("idAdmin", sucereIdAmin);
		
		q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List d = q.list();
	
		for (Object object : d) {
	         Map row = (Map) object;
	         
	         HashMap<String, Object> itemMap = new HashMap<String, Object>();
	         itemMap.put("num_vacantes", (BigDecimal) row.get("NUMVACSUBIDAS"));
	         numeroVac.add(itemMap);
	         }
		
		
		
		
		String sql_no_vac_activa = " SELECT Count(\"vacante\".\"id_vacante\") AS VACACTIVAS FROM \"vacante\" WHERE \"vacante\".\"estado_vacante\" LIKE 'Activa' AND \"vacante\".\"subido_por\" = :idAdmin ";
		
		Query qA = session.createSQLQuery(sql_no_vac_activa);
		
		qA.setParameter("idAdmin", sucereIdAmin);
		
		qA.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dA = qA.list();
	
		for (Object object : dA) {
	         Map row3 = (Map) object;
	         
	         HashMap<String, Object> itemMap3 = new HashMap<String, Object>();
	         itemMap3.put("num_vacantes_activas", (BigDecimal) row3.get("VACACTIVAS"));
	         numeroVacAc.add(itemMap3);
	         }
		
		
		
		
		String sql_no_vac_inactiva = " SELECT Count(\"vacante\".\"id_vacante\") AS VACINACTIVAS FROM \"vacante\" WHERE \"vacante\".\"estado_vacante\" LIKE 'Inactiva' AND \"vacante\".\"subido_por\" = :idAdmin ";
		
		Query qI = session.createSQLQuery(sql_no_vac_inactiva);
		
		qI.setParameter("idAdmin", sucereIdAmin);
		
		qI.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dI = qI.list();
	
		for (Object object : dI) {
	         Map row4 = (Map) object;
	         
	         HashMap<String, Object> itemMap4 = new HashMap<String, Object>();
	         itemMap4.put("num_vacantes_inactivas", (BigDecimal) row4.get("VACINACTIVAS"));
	         numeroVacInactivas.add(itemMap4);
	         }
		
		
		
		String sql_no_vac_cv = " SELECT Count(\"vacante\".\"id_vacante\") AS VACSCV FROM \"vacante\" WHERE \"vacante\".\"estado_vacante\" LIKE 'EnRevisionCV' AND \"vacante\".\"subido_por\" = :idAdmin ";
		
		Query qCV = session.createSQLQuery(sql_no_vac_cv);
		
		qCV.setParameter("idAdmin", sucereIdAmin);
		
		qCV.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dCV = qCV.list();
	
		for (Object object : dCV) {
	         Map rowCV = (Map) object;
	         
	         HashMap<String, Object> itemMap4CV = new HashMap<String, Object>();
	         itemMap4CV.put("num_vacantes_en_cv", (BigDecimal) rowCV.get("VACSCV"));
	         numeroVacEnRevCV.add(itemMap4CV);
	         }
		
		
		
		String sql_no_vac_entrevis = " SELECT Count(\"vacante\".\"id_vacante\") AS VACSCV FROM \"vacante\" WHERE \"vacante\".\"estado_vacante\" LIKE 'EnEntrevistas' AND \"vacante\".\"subido_por\" = :idAdmin ";
		
		Query qET = session.createSQLQuery(sql_no_vac_entrevis);
		
		qET.setParameter("idAdmin", sucereIdAmin);
		
		qET.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dET = qET.list();
	
		for (Object object : dET) {
	         Map rowET = (Map) object;
	         
	         HashMap<String, Object> itemMap4ET = new HashMap<String, Object>();
	         itemMap4ET.put("num_vacantes_en_entrevis", (BigDecimal) rowET.get("VACSCV"));
	         numeroVacEnEntrevis.add(itemMap4ET);
	         }
		
		
		
		
		String sql_no_vac_cubierta = " SELECT Count(\"vacante\".\"id_vacante\") AS VACCUBIERTA FROM \"vacante\" WHERE \"vacante\".\"estado_vacante\" LIKE 'Cubierta' AND \"vacante\".\"subido_por\" = :idAdmin ";
		
		Query qC = session.createSQLQuery(sql_no_vac_cubierta);
		
		qC.setParameter("idAdmin", sucereIdAmin);
		
		qC.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dC = qC.list();
	
		for (Object object : dC) {
	         Map row5 = (Map) object;
	         
	         HashMap<String, Object> itemMap5 = new HashMap<String, Object>();
	         itemMap5.put("num_vacantes_cubiertas", (BigDecimal) row5.get("VACCUBIERTA"));
	         numeroVacCubiertas.add(itemMap5);
	         }
		
		
		
		
		String sql_no_postu_Pfil = " SELECT Count(\"primer_filltro\".\"id_usuario\") AS NUMPOSTUPF FROM \"primer_filltro\" WHERE \"primer_filltro\".\"id_admin\" = :idAdmin ";
		
		Query qPF = session.createSQLQuery(sql_no_postu_Pfil);
		
		qPF.setParameter("idAdmin", sucereIdAmin);
		
		qPF.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dPF = qPF.list();
	
		for (Object object : dPF) {
	         Map row6 = (Map) object;
	         
	         HashMap<String, Object> itemMap6 = new HashMap<String, Object>();
	         itemMap6.put("num_postu_PF", (BigDecimal) row6.get("NUMPOSTUPF"));
	         numeroPostuPriFil.add(itemMap6);
	         }
		
		
		
		
		String sql_no_postu_Mfil = " SELECT Count(\"filtro\".\"id_usuario\") AS NUMPOSTUMF FROM \"filtro\" WHERE \"filtro\".\"id_admin\" = :idAdmin ";
		
		Query qMF = session.createSQLQuery(sql_no_postu_Mfil);
		
		qMF.setParameter("idAdmin", sucereIdAmin);
		
		qMF.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dMF = qMF.list();
	
		for (Object object : dMF) {
	         Map row7 = (Map) object;
	         
	         HashMap<String, Object> itemMap7 = new HashMap<String, Object>();
	         itemMap7.put("num_postu_MF", (BigDecimal) row7.get("NUMPOSTUMF"));
	         numeroPostuMiFil.add(itemMap7);
	         }
		
		
		
		
		String sql_vac = " SELECT \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"id_vacante\" FROM \"vacante\" WHERE \"vacante\".\"subido_por\" = :idAdmin ";
		
		Query r = session.createSQLQuery(sql_vac);
		
		r.setParameter("idAdmin", sucereIdAmin);
		
		r.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dv = r.list();
	
		for (Object object : dv) {
	         Map row2 = (Map) object;
	         
	         HashMap<String, Object> itemMap2 = new HashMap<String, Object>();
	         itemMap2.put("nombre_vacante", (String) row2.get("nombre_vacante"));
	         itemMap2.put("folio", (String) row2.get("folio"));
	         itemMap2.put("id_vacante", (BigDecimal) row2.get("id_vacante"));
	         vacantesData.add(itemMap2);
	         }
		
		
		
		jsonDataRV.put("numeroVacantesTotales", numeroVacTotales); //INSERTANDO EN EL JSON EL NUMERO DE VACANTES
		
		jsonDataRV.put("numeroUsuariosTotales", numeroUsuTotales); //INSERTANDO EN EL JSON EL NUMERO DE VACANTES
		
		jsonDataRV.put("numeroVacantes", numeroVac); //INSERTANDO EN EL JSON EL NUMERO DE VACANTES
		
		jsonDataRV.put("lasVacantes", vacantesData); //INSERTANDO EN EL JSON LAS VACANTES 
		
		jsonDataRV.put("lasActivas", numeroVacAc); //INSERTANDO EN EL JSON EL NUMERO DE VACANTES ACTIVAS
		
		jsonDataRV.put("lasInactivas", numeroVacInactivas); //INSERTANDO EN EL JSON EL NUMERO DE VACANTES INACTIVAS
		
		jsonDataRV.put("lasEnCV", numeroVacEnRevCV); //INSERTANDO EN EL JSON EL NUMERO DE VACANTES EN REVISION DE CV
		
		jsonDataRV.put("lasEnEntrevis", numeroVacEnEntrevis); //INSERTANDO EN EL JSON EL NUMERO DE VACANTES EN ENTREVISTAS
		
		jsonDataRV.put("lasCubiertas", numeroVacCubiertas); //INSERTANDO EN EL JSON EL NUMERO DE VACANTES CUBIERTAS
		
		jsonDataRV.put("losPostuPF", numeroPostuPriFil); //INSERTANDO EN EL JSON EL NUMERO DE POSTULANTES EN PRIMER FILTRO
		
		jsonDataRV.put("losPostuMF", numeroPostuMiFil); //INSERTANDO EN EL JSON EL NUMERO DE POSTULANTES EN MI FILTRO
		
		
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
	
	
	public String getIdAdmin() {
		return idAdmin;
	}
	public void setIdAdmin(String idAdmin) {
		this.idAdmin = idAdmin;
	}


	public LinkedHashMap<String, Object> getJsonDataRV() {
		return jsonDataRV;
	}


	public void setJsonDataRV(LinkedHashMap<String, Object> jsonDataRV) {
		this.jsonDataRV = jsonDataRV;
	}


	public Set<Map<String, Object>> getNumeroVac() {
		return numeroVac;
	}


	public void setNumeroVac(Set<Map<String, Object>> numeroVac) {
		this.numeroVac = numeroVac;
	}


	public Set<Map<String, Object>> getVacantesData() {
		return vacantesData;
	}


	public void setVacantesData(Set<Map<String, Object>> vacantesData) {
		this.vacantesData = vacantesData;
	}


	public Set<Map<String, Object>> getNumeroVacAc() {
		return numeroVacAc;
	}


	public void setNumeroVacAc(Set<Map<String, Object>> numeroVacAc) {
		this.numeroVacAc = numeroVacAc;
	}


	public Set<Map<String, Object>> getNumeroVacInactivas() {
		return numeroVacInactivas;
	}


	public void setNumeroVacInactivas(Set<Map<String, Object>> numeroVacInactivas) {
		this.numeroVacInactivas = numeroVacInactivas;
	}


	public Set<Map<String, Object>> getNumeroVacCubiertas() {
		return numeroVacCubiertas;
	}


	public void setNumeroVacCubiertas(Set<Map<String, Object>> numeroVacCubiertas) {
		this.numeroVacCubiertas = numeroVacCubiertas;
	}


	public Set<Map<String, Object>> getNumeroPostuPriFil() {
		return numeroPostuPriFil;
	}


	public void setNumeroPostuPriFil(Set<Map<String, Object>> numeroPostuPriFil) {
		this.numeroPostuPriFil = numeroPostuPriFil;
	}


	public Set<Map<String, Object>> getNumeroPostuMiFil() {
		return numeroPostuMiFil;
	}


	public void setNumeroPostuMiFil(Set<Map<String, Object>> numeroPostuMiFil) {
		this.numeroPostuMiFil = numeroPostuMiFil;
	}


	public BigDecimal getVacTotalNum() {
		return vacTotalNum;
	}


	public void setVacTotalNum(BigDecimal vacTotalNum) {
		this.vacTotalNum = vacTotalNum;
	}


	public BigDecimal getUsuTotalNum() {
		return usuTotalNum;
	}


	public void setUsuTotalNum(BigDecimal usuTotalNum) {
		this.usuTotalNum = usuTotalNum;
	}


	public Set<Map<String, Object>> getNumeroVacTotales() {
		return numeroVacTotales;
	}


	public void setNumeroVacTotales(Set<Map<String, Object>> numeroVacTotales) {
		this.numeroVacTotales = numeroVacTotales;
	}


	public Set<Map<String, Object>> getNumeroUsuTotales() {
		return numeroUsuTotales;
	}


	public void setNumeroUsuTotales(Set<Map<String, Object>> numeroUsuTotales) {
		this.numeroUsuTotales = numeroUsuTotales;
	}


	public Set<Map<String, Object>> getNumeroVacEnRevCV() {
		return numeroVacEnRevCV;
	}


	public void setNumeroVacEnRevCV(Set<Map<String, Object>> numeroVacEnRevCV) {
		this.numeroVacEnRevCV = numeroVacEnRevCV;
	}


	public Set<Map<String, Object>> getNumeroVacEnEntrevis() {
		return numeroVacEnEntrevis;
	}


	public void setNumeroVacEnEntrevis(Set<Map<String, Object>> numeroVacEnEntrevis) {
		this.numeroVacEnEntrevis = numeroVacEnEntrevis;
	}
}
