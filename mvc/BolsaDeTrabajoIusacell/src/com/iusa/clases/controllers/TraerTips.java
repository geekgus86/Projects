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

public class TraerTips extends ActionSupport{
	

	
	
	private BigDecimal idTipEntre; 
	private String desTipEntre;
	private String desTipTipoEntre;
	
	
	
	
	private BigDecimal idTipInfogra; 
	private String desTipInfogra;
	private String desTipTipoInfogra;
	
	
	
	private LinkedHashMap<String, Object> jsonDataTT = new LinkedHashMap<String, Object>();
	
	
	
	private Set<Map<String, Object>> tipoEntre = new HashSet<Map<String, Object>>();
	
	
	
	private Set<Map<String, Object>> tipoInfogra = new HashSet<Map<String, Object>>();

	
	
	
	
	Session session=HibernateUtil.getSessionFactory().getCurrentSession();
	
	public String giveMe() {
		
		Transaction tr = session.beginTransaction();
        try{
        String sql_tip_entre = " SELECT \"tips\".\"id_tip\", \"tips\".\"tip_descripcion\", \"tips\".\"tipo_tip\" FROM \"tips\" WHERE \"tips\".\"tipo_tip\" LIKE 'Entrevista' ";
        
        Query query1 = session.createSQLQuery(sql_tip_entre);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data1 = query1.list();
        
        for (Object object : data1) {
         Map row1 = (Map) object;
         
         HashMap<String, Object> itemMapa1 = new HashMap<String, Object>();
         idTipEntre = (BigDecimal)row1.get("id_tip");
         desTipEntre = (String)row1.get("tip_descripcion");
         desTipTipoEntre = (String)row1.get("tipo_tip");
         	
         	
         itemMapa1.put("id_tip_Entre", idTipEntre);
         itemMapa1.put("tip_descripcion_Entre", desTipEntre);
         itemMapa1.put("tipo_tip_Entre", desTipTipoEntre);
         	
         	
         tipoEntre.add(itemMapa1);
         }
		
		
        
     
        
        String sql_tip_info = " SELECT \"tips\".\"id_tip\", \"tips\".\"tip_descripcion\", \"tips\".\"tipo_tip\" FROM \"tips\" WHERE \"tips\".\"tipo_tip\" LIKE 'Infografia' ";
        
        Query query2 = session.createSQLQuery(sql_tip_info);
        query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data2 = query2.list();
        
        for (Object object : data2) {
         Map row2 = (Map) object;
         
         HashMap<String, Object> itemMapa2 = new HashMap<String, Object>();
         idTipInfogra = (BigDecimal)row2.get("id_tip");
         desTipInfogra = (String)row2.get("tip_descripcion");
         desTipTipoInfogra = (String)row2.get("tipo_tip");
         	
         	
         itemMapa2.put("id_tip_Info", idTipInfogra);
         itemMapa2.put("tip_descripcion_Info", desTipInfogra);
         itemMapa2.put("tipo_tip_Info", desTipTipoInfogra);
         	
         	
         tipoInfogra.add(itemMapa2);
         }
		
        
        jsonDataTT.put("tipsEntrevista", tipoEntre); //INSERTANDO EN EL JSON EL NUMERO DE VACANTES
		
        jsonDataTT.put("tipsInfografia", tipoInfogra); //INSERTANDO EN EL JSON LAS VACANTES 
		tr.commit();
        }catch(Exception e){
        	tr.rollback();
        }
		return SUCCESS;
	}


	public BigDecimal getIdTipEntre() {
		return idTipEntre;
	}


	public void setIdTipEntre(BigDecimal idTipEntre) {
		this.idTipEntre = idTipEntre;
	}


	public String getDesTipEntre() {
		return desTipEntre;
	}


	public void setDesTipEntre(String desTipEntre) {
		this.desTipEntre = desTipEntre;
	}


	public String getDesTipTipoEntre() {
		return desTipTipoEntre;
	}


	public void setDesTipTipoEntre(String desTipTipoEntre) {
		this.desTipTipoEntre = desTipTipoEntre;
	}


	public BigDecimal getIdTipInfogra() {
		return idTipInfogra;
	}


	public void setIdTipInfogra(BigDecimal idTipInfogra) {
		this.idTipInfogra = idTipInfogra;
	}


	public String getDesTipInfogra() {
		return desTipInfogra;
	}


	public void setDesTipInfogra(String desTipInfogra) {
		this.desTipInfogra = desTipInfogra;
	}


	public String getDesTipTipoInfogra() {
		return desTipTipoInfogra;
	}


	public void setDesTipTipoInfogra(String desTipTipoInfogra) {
		this.desTipTipoInfogra = desTipTipoInfogra;
	}


	public LinkedHashMap<String, Object> getJsonDataTT() {
		return jsonDataTT;
	}


	public void setJsonDataTT(LinkedHashMap<String, Object> jsonDataTT) {
		this.jsonDataTT = jsonDataTT;
	}


	public Set<Map<String, Object>> getTipoEntre() {
		return tipoEntre;
	}


	public void setTipoEntre(Set<Map<String, Object>> tipoEntre) {
		this.tipoEntre = tipoEntre;
	}


	public Set<Map<String, Object>> getTipoInfogra() {
		return tipoInfogra;
	}


	public void setTipoInfogra(Set<Map<String, Object>> tipoInfogra) {
		this.tipoInfogra = tipoInfogra;
	}

}
