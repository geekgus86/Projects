package com.iusa.clases.controllers;

import java.math.BigDecimal;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
import org.hibernate.Transaction;

import com.iusa.clases.models.Identidad_aux;
import com.iusa.clases.models.Usuario;
import com.iusa.clases.interceptor.CaracterNoValidoException;

public class GuardarIdentidad extends ActualizarDatos {
    private BigDecimal identidad;
    private String categoria;
    private BigDecimal idAux;
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
    	
        String sql1 = "SELECT \"identidad_aux\".\"id_aux\" FROM \"identidad_aux\",\"identidad\" WHERE \"identidad_aux\".\"id_usuario\"=:idUsuario AND \"identidad\".\"categoria_identidad\"=:categoria AND \"identidad_aux\".\"id_identidad\"=\"identidad\".\"id_identidad\"";
        Query query1 = session.createSQLQuery(sql1).setParameter("idUsuario", idUsuario).setParameter("categoria", categoria);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
       
        if(query1.list().size()<1){
        	
        	Identidad_aux iden=new Identidad_aux();
        	iden.setIdUsuario(idUsuario);
        	iden.setId_identidad(identidad);
        	session.save(iden);
       
        	
        }else if(query1.list().size()==1){
        	 List data1 = query1.list();
             for (Object object : data1) {
             	Map row1 = (Map) object;
             	  this.idAux=(BigDecimal)row1.get("id_aux");
             	}
             
         	String sql2 = "UPDATE \"identidad_aux\" SET \"identidad_aux\".\"id_identidad\"=:identidad WHERE \"identidad_aux\".\"id_aux\"=:idAux";
            Query query2 = session.createSQLQuery(sql2).setParameter("identidad", identidad).setParameter("idAux", idAux);
            query2.executeUpdate();
          
        }
        tr.commit(); 
    	 }catch(Exception e){
    		 tr.rollback();
    	 }
    	return "success";
    }
	public BigDecimal getIdentidad() {
		return identidad;
	}

	public void setIdentidad(BigDecimal identidad) {
		this.identidad = identidad;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	public BigDecimal getIdAux() {
		return idAux;
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
