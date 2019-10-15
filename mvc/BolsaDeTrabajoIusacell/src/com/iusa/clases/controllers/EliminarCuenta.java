package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.opensymphony.xwork2.ActionSupport; //PERMITIENDO LA INTERACCION DE ACTION

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;
import org.hibernate.Session;

import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.iusa.clases.models.*;


public class EliminarCuenta extends ActualizarDatos{
	
    Session session=HibernateUtil.getSessionFactory().getCurrentSession();
    
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
		
         
         String sql3 = "DELETE FROM \"aux_hob\" WHERE \"aux_hob\".\"id_usuario\"=:idUsuario";
	        Query query3 = session.createSQLQuery(sql3).setParameter("idUsuario", idUsuario);
	        query3.executeUpdate();
	        
	        String sql4 = "DELETE FROM \"calificacion_aux\" WHERE \"calificacion_aux\".\"id_usuario\"=:idUsuario";
	        Query query4 = session.createSQLQuery(sql4).setParameter("idUsuario", idUsuario);
	        query4.executeUpdate();  
	       
	        String sql5 = "DELETE FROM \"identidad_aux\" WHERE \"identidad_aux\".\"id_usuario\"=:idUsuario";
	        Query query5 = session.createSQLQuery(sql5).setParameter("idUsuario", idUsuario);
	        query5.executeUpdate();
	        
	        String sql6 = "DELETE FROM \"idioma_aux\" WHERE \"idioma_aux\".\"id_usuario\"=:idUsuario";
	        Query query6 = session.createSQLQuery(sql6).setParameter("idUsuario", idUsuario);
	        query6.executeUpdate();
	        

	        String sql7 = "DELETE FROM \"software_aux\" WHERE \"software_aux\".\"id_usuario\"=:idUsuario";
	        Query query7 = session.createSQLQuery(sql7).setParameter("idUsuario", idUsuario);
	        query7.executeUpdate();
	       
	        String sql8 = "DELETE FROM \"talento_aux\" WHERE \"talento_aux\".\"id_usuario\"=:idUsuario";
	        Query query8 = session.createSQLQuery(sql8).setParameter("idUsuario", idUsuario);
	        query8.executeUpdate();
	     
	        String sql9 = "DELETE FROM \"talento_aux\" WHERE \"talento_aux\".\"id_usuario\"=:idUsuario";
	        Query query9 = session.createSQLQuery(sql9).setParameter("idUsuario", idUsuario);
	        query9.executeUpdate();
	        
	        String sql10 = "DELETE FROM \"calificacion_aux\" WHERE \"calificacion_aux\".\"id_usuario\"=:idUsuario";
	        Query query10 = session.createSQLQuery(sql10).setParameter("idUsuario", idUsuario);
	        query10.executeUpdate();

	        String sql11 = "DELETE FROM \"datos_personales\" WHERE \"datos_personales\".\"id_usuario\"=:idUsuario";
	        Query query11 = session.createSQLQuery(sql11).setParameter("idUsuario", idUsuario);
	        query11.executeUpdate();
	        

	        String sql12 = "DELETE FROM \"disposicion\" WHERE \"disposicion\".\"id_usuario\"=:idUsuario";
	        Query query12 = session.createSQLQuery(sql12).setParameter("idUsuario", idUsuario);
	        query12.executeUpdate();

	        String sql13 = "DELETE FROM \"experiencia\" WHERE \"experiencia\".\"id_usuario\"=:idUsuario";
	        Query query13 = session.createSQLQuery(sql13).setParameter("idUsuario", idUsuario);
	        query13.executeUpdate();

	        String sql14 = "DELETE FROM \"formacion_academica\" WHERE \"formacion_academica\".\"id_usuario\"=:idUsuario";
	        Query query14 = session.createSQLQuery(sql14).setParameter("idUsuario", idUsuario);
	        query14.executeUpdate();
		

	        String sql15 = "DELETE FROM \"filtro\" WHERE \"filtro\".\"id_usuario\"=:idUsuario";
	        Query query15 = session.createSQLQuery(sql15).setParameter("idUsuario", idUsuario);
	        query15.executeUpdate();
	        
	        String sql16 = "DELETE FROM \"experiencia\" WHERE \"experiencia\".\"id_usuario\"=:idUsuario";
	        Query query16 = session.createSQLQuery(sql16).setParameter("idUsuario", idUsuario);
	        query16.executeUpdate();
	        
	        String sql17 = "DELETE FROM \"foto\" WHERE \"foto\".\"id_usuario\"=:idUsuario";
	        Query query17 = session.createSQLQuery(sql17).setParameter("idUsuario", idUsuario);
	        query17.executeUpdate();

	        String sql18 = "DELETE FROM \"habilidad\" WHERE \"habilidad\".\"id_usuario\"=:idUsuario";
	        Query query18 = session.createSQLQuery(sql18).setParameter("idUsuario", idUsuario);
	        query18.executeUpdate();

	        String sql19 = "DELETE FROM \"horario_preferido\" WHERE \"horario_preferido\".\"id_usuario\"=:idUsuario";
	        Query query19 = session.createSQLQuery(sql19).setParameter("idUsuario", idUsuario);
	        query19.executeUpdate();

	        String sql20 = "DELETE FROM \"postulaciones\" WHERE \"postulaciones\".\"id_usuario\"=:idUsuario";
	        Query query20 = session.createSQLQuery(sql20).setParameter("idUsuario", idUsuario);
	        query20.executeUpdate();
	        
	        String sql21 = "DELETE FROM \"primer_filltro\" WHERE \"primer_filltro\".\"id_usuario\"=:idUsuario";
	        Query query21 = session.createSQLQuery(sql21).setParameter("idUsuario", idUsuario);
	        query21.executeUpdate();
	        
	        String sql22 = "DELETE FROM \"salario_deseado\" WHERE \"salario_deseado\".\"id_usuario\"=:idUsuario";
	        Query query22 = session.createSQLQuery(sql22).setParameter("idUsuario", idUsuario);
	        query22.executeUpdate();



	        String sql24 = "DELETE FROM \"Ubicacion\" WHERE \"Ubicacion\".\"id_usuario\"=:idUsuario";
	        Query query24 = session.createSQLQuery(sql24).setParameter("idUsuario", idUsuario);
	        query24.executeUpdate();

	        String sql25 = "DELETE FROM \"usuario\" WHERE \"usuario\".\"id_postulante\"=:idUsuario";
	        Query query25 = session.createSQLQuery(sql25).setParameter("idUsuario", idUsuario);
	        query25.executeUpdate();
            tr.commit();
             
            if(sesion!=null){
    	    	sesion.setAttribute("usuario", null);
    	    	user=(String) sesion.getAttribute("usuario");
    	    	sesion.invalidate();
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
	
	
	

}
