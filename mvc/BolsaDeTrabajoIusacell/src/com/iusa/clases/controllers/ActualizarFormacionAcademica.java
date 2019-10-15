package com.iusa.clases.controllers;

import java.math.BigDecimal;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.iusa.clases.models.FormacionAcademica;
import com.iusa.clases.interceptor.CaracterNoValidoException;

public class ActualizarFormacionAcademica extends ActualizarDatos {
	
	private String parametro;
	private BigDecimal idFormacion;
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
           
			 
			 SimpleDateFormat df=new SimpleDateFormat("dd/MM/yyyy");
			 
			    if(parametro.equals("guardar")){
			    	 FormacionAcademica f=new FormacionAcademica();
					 f.setNivelEstudios(nivelAcademico);
					 f.setInstituto(institucion);
					 f.setPaisInstituto(pais);
					 f.setEstado("Mexico");
					 f.setFechaInicio(lapsoInicio);
					 f.setFechaFin(lapsoFin);
					 f.setStatus(status);
					 f.setEstudioActual(estudioActual);
					 f.setAreaEspecialidad(areaEspecialidad);
					 f.setIdUsuario(idUsuario);
					 session.saveOrUpdate(f);	 
					 tr.commit();
			    	    
			    }else if(parametro.equals("modificar")){
			    	
			    	String fechaI=df.format(lapsoInicio);
			    	 String fechaF=df.format(lapsoFin);
			    	
					//String sql2 = "UPDATE \"formacion_academica\" SET \"formacion_academica\".\"nivel_estudios\"='"+nivelAcademico+"',\"formacion_academica\".\"instituto\"='"+institucion+"',\"formacion_academica\".\"status\"='"+status+"',\"formacion_academica\".\"estudio_actual\"='"+estudioActual+"',\"formacion_academica\".\"fecha_inicio\"=\"TO_DATE\"('"+fechaI+"','dd/MM/YYYY'),\"formacion_academica\".\"fecha_fin\"=\"TO_DATE\"('"+fechaF+"','dd/MM/YYYY') WHERE \"formacion_academica\".\"id_usuario\"='"+idUsuario+"' AND \"formacion_academica\".\"id_formacion\"='"+idFormacion+"'";
					String sql2 = "UPDATE \"formacion_academica\" SET \"formacion_academica\".\"nivel_estudios\"=:nivelAcademico,\"formacion_academica\".\"instituto\"=:institucion,\"formacion_academica\".\"status\"=:status,\"formacion_academica\".\"estudio_actual\"=:estudioActual,\"formacion_academica\".\"fecha_inicio\"=\"TO_DATE\"(:fechaI,'dd/MM/YYYY'),\"formacion_academica\".\"fecha_fin\"=\"TO_DATE\"(:fechaF,'dd/MM/YYYY') ,\"formacion_academica\".\"area_especialidad\"=:areaEspecialidad WHERE \"formacion_academica\".\"id_usuario\"=:idUsuario AND \"formacion_academica\".\"id_formacion\"=:idFormacion";
			        Query query2 = session.createSQLQuery(sql2).setParameter("nivelAcademico", nivelAcademico).setParameter("institucion", institucion).setParameter("status", status).setParameter("estudioActual", estudioActual).setParameter("fechaI", fechaI).setParameter("fechaF", fechaF).setParameter("areaEspecialidad", areaEspecialidad).setParameter("idUsuario", idUsuario).setParameter("idFormacion", idFormacion);
			        query2.executeUpdate();
			        tr.commit();
			    	
			    }else if(parametro.equals("eliminar")){
			    	
			    	String sql3 = "DELETE FROM \"formacion_academica\" WHERE \"formacion_academica\".\"id_usuario\"=:idUsuario AND \"formacion_academica\".\"id_formacion\"=:idFormacion";
			        Query query3 = session.createSQLQuery(sql3).setParameter("idUsuario", idUsuario).setParameter("idFormacion", idFormacion);
			        query3.executeUpdate();
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
	
	public BigDecimal getIdFormacion() {
		return idFormacion;
	}
	public void setIdFormacion(BigDecimal idFormacion) {
		try{
			this.idFormacion = validateInts(idFormacion);
			}catch(CaracterNoValidoException e){}
		
	}
	
	public String getParametro() {
		return parametro;
	}
	public void setParametro(String parametro) {
		try{
			this.parametro =validateInputs(parametro); 
	        }catch(CaracterNoValidoException e){
				
			}
	}
	
	
}
