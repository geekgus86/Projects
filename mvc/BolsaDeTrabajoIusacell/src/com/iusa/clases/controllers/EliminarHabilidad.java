package com.iusa.clases.controllers;

import java.math.BigDecimal;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;
import com.iusa.clases.interceptor.CaracterNoValidoException;

public class EliminarHabilidad extends ActualizarDatos{

	private BigDecimal id_habilidad;
	
	
	public String execute(){
		 HttpServletRequest request = ServletActionContext.getRequest();
		    HttpSession sesion = request.getSession();
			
			Transaction tr = session.beginTransaction();
			try{
		    this.user=escapeChars((String) sesion.getAttribute("usuario"));
			String sql = "SELECT \"usuario\".\"id_postulante\" FROM \"usuario\" WHERE \"usuario\".\"usuario_nombre\"=:user";
		    Query query = session.createSQLQuery(sql).setParameter("user", user);
		    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		    List data = query.list();
		    for (Object object : data) {
		    	Map row = (Map) object;
		    	  this.idUsuario=(BigDecimal)row.get("id_postulante");
		    	}
		    
	        Query query3 = session.createSQLQuery("DELETE FROM \"habilidad\" WHERE \"habilidad\".\"id_aux_habilidad\"=:id_habilidad AND \"habilidad\".\"id_usuario\"=:idUsuario");
	        query3.setParameter("id_habilidad", id_habilidad);
	        query3.setParameter("idUsuario", idUsuario);
	        query3.executeUpdate();
	        
	        tr.commit();
	        
			}catch(Exception e){
				tr.rollback();
			}
		return "success";
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
	
	public BigDecimal getId_habilidad() {
		return id_habilidad;
	}


	public void setId_habilidad(BigDecimal id_habilidad) {
		this.id_habilidad = id_habilidad;
	}
	
}
