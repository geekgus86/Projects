package com.iusa.clases.controllers;

import java.math.BigDecimal;
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

public class Despostularme extends ActionSupport {
	
	private BigDecimal idVacante;
	private BigDecimal idUsuario;
	private String folio;
	
	
	
	
	
	private LinkedHashMap<String, Object> jsonDataDPS = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	Session session=HibernateUtil.getSessionFactory().getCurrentSession();
	
	public String giveMe(){
		
		
		Transaction tr = session.beginTransaction();
		try{
		String sql_vac_id = " SELECT \"vacante\".\"id_vacante\" FROM \"vacante\" WHERE \"vacante\".\"folio\" = :folio ";
		
		Query q = session.createSQLQuery(sql_vac_id).setParameter("folio", folio);
		
		q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List d = q.list();
		
		for (Object object : d) {
	         Map row = (Map) object;
	         	idVacante = (BigDecimal) row.get("id_vacante");
		}
		

		
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        user=escapeChars((String) sesion.getAttribute("usuario"));
        
        String sqlUsu = "SELECT \"usuario\".\"id_postulante\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:user";
        Query query = session.createSQLQuery(sqlUsu).setParameter("user", user);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data = query.list();
        for (Object object : data) {
         Map row = (Map) object;
           this.idUsuario=(BigDecimal)row.get("id_postulante");
         }
        
        
        
        if(query.list().size()==1 && q.list().size()==1 ){
        	
        	
        
            
    		
    		
            
    	        String sql2="DELETE FROM \"postulaciones\" WHERE \"postulaciones\".\"id_vacante\"=:idVacante AND  \"postulaciones\".\"id_usuario\"= :idUsuario ";
    	        Query query2 = session.createSQLQuery(sql2).setParameter("idVacante", idVacante).setParameter("idUsuario", idUsuario);
    	        query2.executeUpdate();
            tr.commit();
            
            HashMap<String, Object> itemMap = new HashMap<String, Object>();
        	
        	String mensaje1 = "SE HA ELIMINADO CORRECTAMENTE";
        	itemMap.put("error1", mensaje1);
        	items.add(itemMap);
        	jsonDataDPS.put("Mensajes", items);
        	
        	
        }else{
        	
        	 HashMap<String, Object> itemMap = new HashMap<String, Object>();
	        	
	        	String mensaje1 = "NO SE HA ELIMINADO PONERSE EN CONTACTO CON UN ADMINISTRADOR";
	        	itemMap.put("error1", mensaje1);
	        	items.add(itemMap);
	        	jsonDataDPS.put("Mensajes", items);
        	    tr.commit();
        	
        }
        
        
        
        
		
		}catch(Exception e){
		
			tr.rollback();
		}
		return SUCCESS;
	}

	 public String escapeChars(String cadena)throws CaracterNoValidoException{

		   	String escapedString="";
		  
		   	if(cadena.matches("[0-9a-zA-Z._@-]*")){
		   		
		   		String reg = "[=;*|()%#!&?]";
		   		   
		       	escapedString= cadena.replaceAll(reg,"");
		   		
		   	}else{
		   		
		   		throw new CaracterNoValidoException();
		   		
		   	}
		   	
		   	
		   	return escapedString;
		   }
	
	public BigDecimal getIdVacante() {
		return idVacante;
	}

	public void setIdVacante(BigDecimal idVacante) {
		this.idVacante = idVacante;
	}

	public BigDecimal getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(BigDecimal idUsuario) {
		try{
		escapeChars(idUsuario.toString());
		this.idUsuario = idUsuario;
		}catch(CaracterNoValidoException e){
			
		
		}
	}

	public String getFolio() {
		return folio;
	}

	public void setFolio(String folio) {
		try{
		this.folio = escapeChars(folio);}
		catch(CaracterNoValidoException e){
			
		}
	}

	public LinkedHashMap<String, Object> getJsonDataDPS() {
		return jsonDataDPS;
	}

	public void setJsonDataDPS(LinkedHashMap<String, Object> jsonDataDPS) {
		this.jsonDataDPS = jsonDataDPS;
	}

	public Set<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}

}
