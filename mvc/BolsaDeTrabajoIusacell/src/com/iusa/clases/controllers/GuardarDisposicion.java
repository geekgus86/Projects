package com.iusa.clases.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.math.BigDecimal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import com.iusa.clases.models.Dispocision;
import com.iusa.clases.models.Horario;

//import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;
import com.iusa.clases.interceptor.CaracterNoValidoException;


public class GuardarDisposicion extends ActualizarDatos {
	
	private String viajar;
	private String mudanza;
	
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
		
	  
	    
	   
	    
	    
	    String sql1 = "SELECT \"disposicion\".\"id_usuario\" FROM \"disposicion\" WHERE \"disposicion\".\"id_usuario\"=:idUsuario";
        Query query1 = session.createSQLQuery(sql1).setParameter("idUsuario", idUsuario);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        if(query1.list().size()<1){
        	
        	 Dispocision d=new Dispocision();
     	    d.setIdUsuario(idUsuario);
     	    d.setMudarse(mudanza);
     	    d.setViajar(viajar);
     	    session.save(d);
     	    
     	   
     		
        	
        }else if(query1.list().size()==1){
        	
    		String sql2 = "UPDATE \"disposicion\" SET \"viajar\"=:viajar, \"mudarse\"=:mudanza WHERE \"disposicion\".\"id_usuario\"=:idUsuario";
            Query query2 = session.createSQLQuery(sql2).setParameter("viajar", viajar).setParameter("mudanza", mudanza).setParameter("idUsuario", idUsuario);
            query2.executeUpdate();
           
        	
        }
	    
	    
	
    	    
	    
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
	
	
	public String getViajar() {
		return viajar;
	}



	public void setViajar(String viajar) {
		this.viajar = viajar;
	}



	public String getMudanza() {
		return mudanza;
	}



	public void setMudanza(String mudanza) {
		this.mudanza = mudanza;
	}
	
	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
		}
	
	public Set<Map<String, Object>> getItems() {
		return items;
		}
	

}
