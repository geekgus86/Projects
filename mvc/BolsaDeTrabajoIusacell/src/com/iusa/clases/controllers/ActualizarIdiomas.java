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

public class ActualizarIdiomas extends ActualizarDatos{
	
	public int idioma;
	public int dominio;
	public String parametro;
	public BigDecimal idIdioma;
	public int numIdioma;
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
	    
	    if(parametro.equals("crear")){
	    
	    	AuxIdioma idiom=new AuxIdioma();
		    idiom.setIdIdioma(idioma);
		    idiom.setDominio(dominio);
		    idiom.setIdUsuario(idUsuario);
		    session.save(idiom);
		   
		    
	    } else if(parametro.equals("modificar")){
	    	
	    	String sql2 = "UPDATE \"idioma_aux\" SET \"idioma_aux\".\"id_idioma\"=:idioma,\"idioma_aux\".\"dominio\"=:dominio WHERE \"idioma_aux\".\"id_idioma_aux\"=:idIdioma AND \"idioma_aux\".\"id_usuario\"=:idUsuario";
            Query query2 = session.createSQLQuery(sql2).setParameter("idioma", idioma).setParameter("dominio", dominio).setParameter("idIdioma", idIdioma).setParameter("idUsuario", idUsuario);
            query2.executeUpdate();
          
	    	
	    	
	    } else if(parametro.equals("eliminar")){
	    
	    	String sql4 = "DELETE FROM \"idioma_aux\" WHERE \"idioma_aux\".\"id_idioma_aux\"=:idIdioma AND \"idioma_aux\".\"id_usuario\"=:idUsuario";
            Query query4 = session.createSQLQuery(sql4).setParameter("idIdioma",idIdioma).setParameter("idUsuario", idUsuario);
            query4.executeUpdate();
            
	    	
	    }
	    
	    String sql3 = "SELECT \"idioma\".\"id_idioma\",\"idioma\".\"idioma\",\"idioma_aux\".\"dominio\",\"idioma_aux\".\"id_idioma_aux\" FROM \"idioma\",\"idioma_aux\" WHERE \"idioma_aux\".\"id_idioma\"=:idioma AND \"idioma_aux\".\"id_idioma\"=\"idioma\".\"id_idioma\" AND \"idioma_aux\".\"id_usuario\"=:idUsuario";
	    Query query3 = session.createSQLQuery(sql3).setParameter("idioma", idioma).setParameter("idUsuario", idUsuario);
	    query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	    List data3 = query3.list();
	    for (Object object : data3) {
	    	Map row3 = (Map) object;
	    	HashMap<String, Object> itemMap = new HashMap<String, Object>();       
         	 itemMap.put("id_idioma_aux", (BigDecimal) row3.get("id_idioma_aux"));
	         itemMap.put("dominio", (BigDecimal) row3.get("dominio"));
	         itemMap.put("idioma", (String) row3.get("idioma"));
	         itemMap.put("numIdioma", (BigDecimal) row3.get("id_idioma"));
	         
	         items.add(itemMap);
          	     
	    	}
	    jsonData.put("items", items);
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
	
	public int getIdioma() {
		return idioma;
	}
	
	public String getParametro() {
		return parametro;
	}
	
	public void setParametro(String parametro){
		
		try{
			this.parametro =validateInputs(parametro); 
	        }catch(CaracterNoValidoException e){
				
			}
	}
	
	public void setIdIdioma(BigDecimal idIdioma){
		try{
			this.idIdioma = validateInts(idIdioma);
			}catch(CaracterNoValidoException e){}
		
	}
	
	
	public BigDecimal getIdIdioma() {
		return idIdioma;
	}
	
	public int getNumIdioma() {
		return numIdioma;
	}
	
	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
		}
	
	public Set<Map<String, Object>> getItems() {
		return items;
		}
	
	
}
