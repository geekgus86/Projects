package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.opensymphony.xwork2.ActionSupport;

public class DestacadosUbicacion extends ActionSupport {
	
	
	private String user;
	private String estado;
	
	private String estadoUsu;
	private String municipioUsu;
	private String concatenadoEstaMuni;
	
	
	private LinkedHashMap<String, Object> jsonDataUbi = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	Session session=HibernateUtil.getSessionFactory().getCurrentSession();

	public String giveMe(){
		

		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();

        
        
        
        Transaction tr = session.beginTransaction();
        try{
       this.user=escapeChars((String) sesion.getAttribute("usuario"));
        String sql_estado = " SELECT \"Ubicacion\".\"municipio_delegacion\", \"usuario\".\"usuario_nombre\", \"Ubicacion\".\"estado\" FROM \"usuario\" , \"Ubicacion\" WHERE \"Ubicacion\".\"id_usuario\" = \"usuario\".\"id_postulante\" AND \"usuario\".\"usuario_nombre\" = :usu";
        
        Query UB = session.createSQLQuery(sql_estado).setParameter("usu", user);
		
        UB.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dUB = UB.list();
		
		
		for (Object object : dUB) {
	         Map rowdUB = (Map) object;
	         estadoUsu = (String) rowdUB.get("estado");
	         municipioUsu = (String) rowdUB.get("municipio_delegacion");  	
	         }
        	
		
		concatenadoEstaMuni = estadoUsu;
		

    		String sqlG ="  SELECT  \"vacante\".\"area_experiencia\",  \"vacante\".\"ubicacion\",  \"vacante\".\"folio\", \"vacante\".\"nombre_vacante\"  FROM \"vacante\"  WHERE  \"vacante\".\"destacado\" = 1 AND \"vacante\".\"ubicacion\" LIKE :concatenadoEstadoMuni  ";
    		
    		Query G = session.createSQLQuery(sqlG).setParameter("concatenadoEstadoMuni", '%'+concatenadoEstaMuni+'%');
    		
    		G.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
    		List dG = G.list();
    		

    		
    		for (Object object : dG) {
    	         Map row = (Map) object;
    	         
    	         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         itemMap.put("folioG",(String) row.get("folio"));
		         itemMap.put("nombreG",(String) row.get("nombre_vacante"));
		         itemMap.put("ubicacionG",(String) row.get("ubicacion"));
		         itemMap.put("areaG",(String) row.get("area_experiencia"));
		         
		         items.add(itemMap);
    	         
    	  
    	         	
    	         }
    		
    		
        	
    		jsonDataUbi.put("items", items);
        
        tr.commit();
        }catch(Exception e){
        	tr.rollback();
        }
        
        return SUCCESS;
        
	}

	 public String escapeChars(String cadena)throws CaracterNoValidoException{

		   	String escapedString="";
		  if(cadena!=null){
		   	if(cadena.matches("[0-9a-zA-Z._@-]*")){
		   		
		   		String reg = "[=;*|()%#!&?]";
		   		   
		       	escapedString= cadena.replaceAll(reg,"");
		   		
		   	}else{
		   		
		   		throw new CaracterNoValidoException();
		   		
		   	}
		  }
		   	
		   	return escapedString;
		   }
	
	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}
	
	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}


	public String getEstadoUsu() {
		return estadoUsu;
	}


	public void setEstadoUsu(String estadoUsu) {
		this.estadoUsu = estadoUsu;
	}


	public String getMunicipioUsu() {
		return municipioUsu;
	}


	public void setMunicipioUsu(String municipioUsu) {
		this.municipioUsu = municipioUsu;
	}


	public String getConcatenadoEstaMuni() {
		return concatenadoEstaMuni;
	}


	public void setConcatenadoEstaMuni(String concatenadoEstaMuni) {
		this.concatenadoEstaMuni = concatenadoEstaMuni;
	}


	public LinkedHashMap<String, Object> getJsonDataUbi() {
		return jsonDataUbi;
	}


	public void setJsonDataUbi(LinkedHashMap<String, Object> jsonDataUbi) {
		this.jsonDataUbi = jsonDataUbi;
	}


	public Set<Map<String, Object>> getItems() {
		return items;
	}


	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}
	

}
