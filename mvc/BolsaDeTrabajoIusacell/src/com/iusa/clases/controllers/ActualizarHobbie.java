package com.iusa.clases.controllers;

import java.math.*;

import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import com.iusa.clases.models.*;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;
import com.iusa.clases.interceptor.CaracterNoValidoException;

public class ActualizarHobbie extends ActualizarDatos{
   private BigDecimal casilla;
   private BigDecimal hobbie;
   
   
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
	    
	    
	    
	   
	    
	    
	    
	    String sql1 = "SELECT \"aux_hob\".\"id_hobbie\" FROM \"aux_hob\" WHERE \"aux_hob\".\"id_usuario\"=:idUsuario AND \"aux_hob\".\"casilla\"=:casilla";
        Query query1 = session.createSQLQuery(sql1).setParameter("idUsuario", idUsuario).setParameter("casilla", casilla);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        if(query1.list().size()<1){
        	AuxHobbie hob=new AuxHobbie();
    	    hob.setIdHobbie(hobbie);
    	    hob.setIdUsuario(idUsuario);
    	    hob.setCasilla(casilla);
    	    session.save(hob);
    	    tr.commit();
        	
        }else if(query1.list().size()==1){
        	
    		
    		String sql2 = "UPDATE \"aux_hob\" SET  \"aux_hob\".\"id_hobbie\"=:hobbie WHERE \"aux_hob\".\"id_usuario\"='"+idUsuario+"' AND \"aux_hob\".\"casilla\"=:casilla";
            Query query2 = session.createSQLQuery(sql2).setParameter("hobbie", hobbie).setParameter("casilla", casilla);
            query2.executeUpdate();
            
            tr.commit();
        	
        }
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
   
public BigDecimal getCasilla() {
	return casilla;
}

public BigDecimal getHobbie() {
	return hobbie;
}

public void setHobbie(BigDecimal hobbie){
	try{
		this.hobbie = validateInts(hobbie);
		}catch(CaracterNoValidoException e){}
}

public void setCasilla(BigDecimal casilla){
	try{
		this.casilla = validateInts(casilla);
		}catch(CaracterNoValidoException e){}
	
}

public LinkedHashMap<String, Object> getJsonData() {
	return jsonData;
	}

public Set<Map<String, Object>> getItems() {
	return items;
	}

}
