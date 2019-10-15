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
import org.hibernate.Transaction;
import org.hibernate.TransactionException;

import com.iusa.clases.interceptor.CaracterNoValidoException;

public class PorcentajeCuenta  extends perfilUsuario{
	
	private int porcentaje;
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
   public String execute(){
	   
	   HttpServletRequest request = ServletActionContext.getRequest();
       HttpSession sesion = request.getSession();
   	
   	this.porcentaje=0;
   	Transaction tr = session.beginTransaction();
   	try{
   	this.usuario=escapeChars((String) sesion.getAttribute("usuario"));
   	 String sql = "SELECT \"usuario\".\"id_postulante\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:usuario";
        Query query = session.createSQLQuery(sql).setParameter("usuario", usuario);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data = query.list();
        for (Object object : data) {
        	Map row = (Map) object;
        	  this.idUsuario=(BigDecimal)row.get("id_postulante");
        	}
	        porcentaje+=5;
	    
        String sqlDat = "SELECT \"datos_personales\".\"id_usuario\" FROM \"datos_personales\" WHERE \"datos_personales\".\"id_usuario\"=:idUsuario ";
	     Query queryDat = session.createSQLQuery(sqlDat).setParameter("idUsuario", idUsuario);
	     queryDat.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     if(queryDat.list().size()>0){
	    	 porcentaje+=8;
	     }
        
	     String sqlUbi = "SELECT \"Ubicacion\".\"id_usuario\" FROM \"Ubicacion\" WHERE \"Ubicacion\".\"id_usuario\"=:idUsuario ";
	     Query queryUbi = session.createSQLQuery(sqlUbi).setParameter("idUsuario", idUsuario);
	     queryUbi.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     if(queryUbi.list().size()>0){
	    	 porcentaje+=8;
	     }
        
	     
	     String sqlIdiom = "SELECT \"idioma_aux\".\"id_usuario\" FROM \"idioma_aux\" WHERE \"idioma_aux\".\"id_usuario\"=:idUsuario ";
	     Query queryIdiom = session.createSQLQuery(sqlIdiom).setParameter("idUsuario", idUsuario);
	     queryIdiom.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     if(queryIdiom.list().size()>0){
	    	 porcentaje+=8;
	     }
	     
	     String sqlExp = "SELECT \"experiencia\".\"id_exp\" FROM \"experiencia\" WHERE \"experiencia\".\"id_usuario\"=:idUsuario ";
	     Query queryExp = session.createSQLQuery(sqlExp).setParameter("idUsuario", idUsuario);
	     queryExp.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     if(queryExp.list().size()>0){
	    	 porcentaje+=10;
	     }
	    
	     String sqlEdu = "SELECT \"formacion_academica\".\"id_formacion\" FROM \"formacion_academica\" WHERE \"formacion_academica\".\"id_usuario\"=:idUsuario ";
	     Query queryEdu = session.createSQLQuery(sqlEdu).setParameter("idUsuario", idUsuario);
	     queryEdu.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     if(queryEdu.list().size()>0){
	    	 porcentaje+=10;
	     }
        
	     String sqlTal = "SELECT \"talento_aux\".\"id_usuario\" FROM \"talento_aux\" WHERE \"talento_aux\".\"id_usuario\"=:idUsuario ";
	     Query queryTal = session.createSQLQuery(sqlTal).setParameter("idUsuario", idUsuario);
	     queryTal.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     if(queryTal.list().size()>0){
	    	 porcentaje+=12;
	     }
	     
	     String sqlId = "SELECT \"identidad_aux\".\"id_usuario\" FROM \"identidad_aux\" WHERE \"identidad_aux\".\"id_usuario\"=:idUsuario ";
	     Query queryId = session.createSQLQuery(sqlId).setParameter("idUsuario", idUsuario);
	     queryId.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     if(queryId.list().size()>0){
	    	 porcentaje+=10;
	     }
	    
	     
	     String sqlHob = "SELECT \"aux_hob\".\"id_usuario\" FROM \"aux_hob\" WHERE \"aux_hob\".\"id_usuario\"=:idUsuario";
	     Query queryHob = session.createSQLQuery(sqlHob).setParameter("idUsuario", idUsuario);
	     queryHob.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     if(queryHob.list().size()>0){
	    	 porcentaje+=12;
	     }
	     
	     String sqlSw = "SELECT \"aux_hob\".\"id_usuario\" FROM \"aux_hob\" WHERE \"aux_hob\".\"id_usuario\"=:idUsuario ";
	     Query querySw = session.createSQLQuery(sqlSw).setParameter("idUsuario", idUsuario);
	     querySw.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     if(querySw.list().size()>0){
	    	 porcentaje+=8;
	     }
	     
	     
	     String sqlHab = "SELECT \"habilidad\".\"id_usuario\" FROM \"habilidad\" WHERE \"habilidad\".\"id_usuario\"=:idUsuario";
	     Query queryHab = session.createSQLQuery(sqlHab).setParameter("idUsuario", idUsuario);
	     queryHab.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     if(queryHab.list().size()>0){
	    	 porcentaje+=4;
	     }
	     
	     String sqlPref = "SELECT \"salario_deseado\".\"salario_deseado\",\"horario_preferido\".\"horario_preferido\",\"disposicion\".\"mudarse\",\"disposicion\".\"viajar\" FROM \"salario_deseado\",\"horario_preferido\",\"disposicion\" WHERE \"horario_preferido\".\"id_usuario\"=:idUsuario AND \"salario_deseado\".\"id_usuario\"=:idUsuario AND \"disposicion\".\"id_usuario\"=:idUsuario";
	     Query queryPref = session.createSQLQuery(sqlHab).setParameter("idUsuario", idUsuario);
	     queryPref.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     if(queryPref.list().size()>0){
	    	 porcentaje+=5;
	     }
	     
	     HashMap<String, Object> itemMap = new HashMap<String, Object>();   
	     itemMap.put("porcentaje", porcentaje);
	     items.add(itemMap);
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
   
public int getPorcentaje() {
	return porcentaje;
}

public void setPorcentaje(int porcentaje) {
	this.porcentaje = porcentaje;
}


public LinkedHashMap<String, Object> getJsonData() {
	return jsonData;
	}

public Set<Map<String, Object>> getItems() {
	return items;
	}
}
