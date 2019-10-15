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

public class AgregarRegional extends ActionSupport {

	
	private String idVacante;
	private String region;
	private String nivel;
	private String folio;
	private String nombreVacante;
	
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	Session session;
	
	
	public AgregarRegional(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}


	
	
	public String giveMe() {
		
		
		
			 
			
			  Transaction tr = session.beginTransaction();
			  
			  try{
				  
				  	String secureIvac = escapeChars(idVacante);
				  	
				  	BigDecimal sVac = new BigDecimal(secureIvac);
				  	
				  	String secureReg = escapeChars(region);
				  	String secureRegNiv = escapeChars(nivel);
				  	
				  	if(secureRegNiv.equals("2")){
				  		
				    String sql2="UPDATE \"vacante\" SET  \"vacante\".\"destacado\" = '1'  WHERE \"vacante\".\"id_vacante\" = :idVacante";
			        Query query2 = session.createSQLQuery(sql2);
			        query2.setParameter("idVacante", sVac);
			        query2.executeUpdate();
			        
				  	}else{
				  		
				  		 String sql2="UPDATE \"vacante\" SET  \"vacante\".\"destacado\" = '1'  WHERE \"vacante\".\"id_vacante\" = :idVacante AND \"vacante\".\"ubicacion\" LIKE :region ";
					        Query query2 = session.createSQLQuery(sql2);
					        query2.setParameter("idVacante", sVac).setParameter("region", '%' +secureReg+ '%');
					        query2.executeUpdate();
				        
				  	}			        
			        
			        
			        String sql = "SELECT \"vacante\".\"nombre_vacante\",\"vacante\".\"folio\" FROM \"vacante\" WHERE \"vacante\".\"id_vacante\" = :folio ";
					
					Query q = session.createSQLQuery(sql);
					
					q.setParameter("folio", sVac);
					
					q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List d = q.list();
				
					for (Object object : d) {
				         Map row = (Map) object;
				         
				         HashMap<String, Object> itemMap = new HashMap<String, Object>();
				         
				         
				         itemMap.put("nombre", (String) row.get("nombre_vacante"));
				         itemMap.put("folio", (String) row.get("folio"));
				         
				         
				         
				         items.add(itemMap);
				         
				        
				     	
				         }
					
					jsonData.put("items", items);
				
			        
			        
			        
			       tr.commit();
			  }catch(Exception e){
				  
				  tr.rollback();
			  }
		        
		       
		       
	           
		
		
		
		return SUCCESS;
	}
	
	
	public String getNivel() {
		return nivel;
	}




	public void setNivel(String nivel) {
		this.nivel = nivel;
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


	public String getFolio() {
		return folio;
	}


	public void setFolio(String folio) {
		this.folio = folio;
	}


	public String getNombreVacante() {
		return nombreVacante;
	}


	public void setNombreVacante(String nombreVacante) {
		this.nombreVacante = nombreVacante;
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




	public String getRegion() {
		return region;
	}




	public void setRegion(String region) {
		this.region = region;
	}

	
	
}
