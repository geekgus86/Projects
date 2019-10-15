package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.iusa.clases.models.DatosPersonales;
import com.iusa.clases.models.Usuario;

import com.iusa.clases.interceptor.CaracterNoValidoException;

public class ActualizarDatosPersonales extends ActualizarDatos {
	
	public String execute(){
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        
        try{
    	this.user=escapeChars((String) sesion.getAttribute("usuario"));
        }catch(CaracterNoValidoException e){
   
        }
    	Transaction tr = session.beginTransaction();
        Query query = session.createSQLQuery("SELECT \"usuario\".\"id_postulante\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:user");
        		query.setParameter("user", user);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data = query.list();
        for (Object object : data) {
        	Map row = (Map) object;
        	  this.idUsuario=(BigDecimal)row.get("id_postulante");
        	}
        SimpleDateFormat df=new SimpleDateFormat("dd/MMM/y");
        
        Query query1 = session.createSQLQuery("SELECT \"datos_personales\".\"id_usuario\" FROM \"datos_personales\" WHERE \"datos_personales\".\"id_usuario\"=:idUsuario");
        query1.setParameter("idUsuario", idUsuario);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        if(query1.list().size()<1){
        	
             try{
      		 Usuario us=new Usuario();
      		
      		 us.setApellidoMaterno(apellidoMaterno);
      		 us.setApellidoPaterno(apellidoPaterno);
      		 us.setNombre(nombre);
      		
      		
   
      		 DatosPersonales dato=new DatosPersonales();
      		 dato.setIdUsuario(idUsuario);
      		 dato.setCurp(curp);
      		 dato.setEstadoCivil(estadoCivil);
      		  this.fechaNacimiento=dia+"/"+mes+"/"+anio;
      		
      		 
      	
      		 String rfcCompleto=rfc;
      		 dato.setRFC(rfcCompleto);
      		 dato.setSexo(sexo);
      		 dato.setHomoclave(homoclave);
      		 session.saveOrUpdate(dato);
            
      		Query query2 = session.createSQLQuery("UPDATE \"usuario\" SET \"usuario\".\"apellido_paterno\"=:apellidoPaterno,\"usuario\".\"apellido_materno\"=:apellidoMaterno,\"usuario\".\"nombre\"=:nombre,\"usuario\".\"fecha_nacimiento\"=\"TO_DATE\"(:fecha_nacimiento,'dd/mm/yy') WHERE \"usuario\".\"id_postulante\"=:idUsuario");
      				query2.setParameter("apellidoPaterno", apellidoPaterno);
      				query2.setParameter("apellidoMaterno", apellidoMaterno);
      				query2.setParameter("nombre", nombre);
      				query2.setParameter("fecha_nacimiento", fechaNacimiento);
      				query2.setParameter("idUsuario", idUsuario);
            query2.executeUpdate();
      		 tr.commit();
             }catch(Exception e){
            	
            	 tr.rollback();
             }
        	
        }else if(query1.list().size()==1){
        	
        	
        	try{
        	 //String rfcCompleto=rfc+homoclave;
    		
        	 this.fechaNacimiento=dia+"/"+mes+"/"+anio;
    		
        	 Query query2 = session.createSQLQuery("UPDATE \"usuario\" SET \"usuario\".\"apellido_paterno\"=:apellidoPaterno,\"usuario\".\"apellido_materno\"=:apellidoMaterno,\"usuario\".\"nombre\"=:nombre,\"usuario\".\"fecha_nacimiento\"=\"TO_DATE\"(:fecha_nacimiento,'dd/mm/yy') WHERE \"usuario\".\"id_postulante\"=:idUsuario");
 			query2.setParameter("apellidoPaterno", apellidoPaterno);
 			query2.setParameter("apellidoMaterno", apellidoMaterno);
 			query2.setParameter("nombre", nombre);
 			query2.setParameter("fecha_nacimiento", fechaNacimiento);
 			query2.setParameter("idUsuario", idUsuario);
             query2.executeUpdate();
 			
            
             Query query3 = session.createSQLQuery("UPDATE \"datos_personales\" SET \"datos_personales\".\"rfc\"=:rfcCompleto,\"datos_personales\".\"homoclave\"=:homoclave,\"datos_personales\".\"curp\"=:curp,\"datos_personales\".\"sexo\"=:sexo,\"datos_personales\".\"estado_civil\"=:estadoCivil WHERE \"datos_personales\".\"id_usuario\"=:idUsuario");
 			query3.setParameter("rfcCompleto", rfc);
 			query3.setParameter("homoclave", homoclave);
 			query3.setParameter("curp", curp);
 			query3.setParameter("sexo", sexo);
 			query3.setParameter("estadoCivil", estadoCivil);
 			query3.setParameter("idUsuario", idUsuario);
             query3.executeUpdate();
           
            tr.commit();
        	}catch(Exception e){
           
        	
           	 tr.rollback();
            }
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
	
	public String verificarFaltante(String parametro){
		 if(parametro.equals("")||parametro.equals(null))
	  			parametro="No especificado";
		return parametro;
	}
	
}
