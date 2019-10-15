package com.iusa.clases.controllers;

import java.math.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.iusa.clases.models.*;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.hibernate.Criteria;
import org.apache.commons.io.FileUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import java.io.File;
import java.io.IOException;
import com.iusa.clases.interceptor.CaracterNoValidoException;


public class GuardarHorario extends ActualizarDatos{
	
	private String horario;
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	public String execute(){
		
		HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
	
		Transaction tr = session.beginTransaction();
		try{
		this.user=escapeChars((String) sesion.getAttribute("usuario"));
		String sql = "SELECT \"usuario\".\"id_postulante\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:user";
	    Query query = session.createSQLQuery(sql).setParameter("user", user);
	    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	    List data = query.list();
	    for (Object object : data) {
	    	Map row = (Map) object;
	    	  this.idUsuario=(BigDecimal)row.get("id_postulante");
	    	}
	    
	   
		String sql1 = "SELECT \"horario_preferido\".\"id_usuario\" FROM \"horario_preferido\" WHERE \"horario_preferido\".\"id_usuario\"=:idUsuario";
        Query query1 = session.createSQLQuery(sql1).setParameter("idUsuario", idUsuario);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        if(query1.list().size()<1){
        	
        	 Horario h=new Horario();
     	    
     	    h.setIdUsuario(idUsuario);
     	    h.setHorarioPreferido(horario);
     	    
     		session.save(h);
     		
     		
        	
        }else if(query1.list().size()==1){
        	
    		String sql2 = "UPDATE \"horario_preferido\" SET \"horario_preferido\"=:horario WHERE \"horario_preferido\".\"id_usuario\"=:idUsuario";
            Query query2 = session.createSQLQuery(sql2).setParameter("horario", horario).setParameter("idUsuario", idUsuario);
            query2.executeUpdate();
           
        	
        }
	
		
	     tr.commit();
	
		}catch(Exception e){
			tr.rollback();
		}
	   
	    
		return "success";
	}

	public String getHorario() {
		return horario;
	}

	public void setHorario(String horario) {
		this.horario = horario;
	}
	
	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
		}
	
	public Set<Map<String, Object>> getItems() {
		return items;
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
}
