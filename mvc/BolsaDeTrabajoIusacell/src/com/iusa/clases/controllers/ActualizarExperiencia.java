package com.iusa.clases.controllers;

import java.math.BigDecimal;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.iusa.clases.models.Experiencia;
import com.iusa.clases.interceptor.CaracterNoValidoException;

public class ActualizarExperiencia extends ActualizarDatos{
	private Date fechaInicio;
	private Date fechaFin;
	private String parametro;
	private BigDecimal id_exp;
	
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
    	if(nombreEmpresa!=null||puesto!=null||funcionesEmpresa!=null){
    	    Experiencia ex= new Experiencia();
    	    ex.setEmpresa(nombreEmpresa);
    	    ex.setPuesto(puesto);
    	    System.out.println(nombreEmpresa+" "+puesto);
    	    ex.setFunciones(funcionesEmpresa);
    	    ex.setFechaInicio(fechaInicio);
    	    ex.setFechaFin(fechaFin);
    	    ex.setSueldo(sueldoEmpresa);
    	    ex.setActual(trabajoActual);
    	    ex.setIdUsuario(idUsuario);
    	    session.save(ex);
    	}
    	    tr.commit();
    	
    }else if(parametro.equals("modificar")){
    	if(nombreEmpresa!=null||puesto!=null||funcionesEmpresa!=null){
    	 String fechaI=df.format(fechaInicio);
    	 String fechaF=df.format(fechaFin);
    	
		Query query2 = session.createSQLQuery("UPDATE \"experiencia\" SET \"experiencia\".\"empresa\"=:nombreEmpresa,\"experiencia\".\"puesto\"=:puesto ,\"experiencia\".\"sueldo\"=:sueldoEmpresa,\"experiencia\".\"funciones\"=:funcionesEmpresa,\"experiencia\".\"trabajo_actual\"=:trabajoActual,\"experiencia\".\"fecha_inicio\"=\"TO_DATE\"(:fechaI,'dd/MM/YYYY'),\"experiencia\".\"fecha_fin\"=\"TO_DATE\"(:fechaF,'dd/MM/YYYY') WHERE \"experiencia\".\"id_usuario\"=:idUsuario AND \"experiencia\".\"id_exp\"=:id_exp");
		query2.setParameter("nombreEmpresa", nombreEmpresa);
		query2.setParameter("puesto", puesto);
		query2.setParameter("sueldoEmpresa", sueldoEmpresa );
		query2.setParameter("funcionesEmpresa", funcionesEmpresa);
		query2.setParameter("trabajoActual", trabajoActual);
		query2.setParameter("fechaI", fechaI);
		query2.setParameter("fechaF", fechaF);
		query2.setParameter("idUsuario", idUsuario);
		query2.setParameter("id_exp", id_exp);
        query2.executeUpdate();
    	}
        tr.commit();
    	
    }else if(parametro.equals("eliminar")){
    	
        Query query3 = session.createSQLQuery("DELETE FROM \"experiencia\" WHERE \"experiencia\".\"id_usuario\"=:idUsuario AND \"experiencia\".\"id_exp\"=:id_exp");
        query3.setParameter("idUsuario", idUsuario);
        query3.setParameter("id_exp", id_exp);
        query3.executeUpdate();
        tr.commit();
    	
    }
   
    
    
	}catch(Exception e){
        e.printStackTrace();
		tr.rollback();
	}
	return "success";
}


private BigDecimal escapeChars(BigDecimal attribute) {
	// TODO Auto-generated method stub
	return null;
}


public String escapeChars(String cadena)throws CaracterNoValidoException{

	   	String escapedString="";
	  
	   	if(cadena.matches("[0-9a-zA-Z._@-]*")){
	   		
	   		String reg = "[\\=;*|()%#!&?/$¿]";
	   		   
	       	escapedString= cadena.replaceAll(reg,"");
	   		
	   	}else{
	   		
	   		throw new CaracterNoValidoException();
	   		
	   	}
	   	
	   	
	   	return escapedString;
	  }

public void setFechaInicio(Date fechaInicio){
	this.fechaInicio=fechaInicio;
}

public void setFechaFin(Date fechaFin){
	this.fechaFin=fechaFin;
}

public Date getFechaInicio(){
	return fechaInicio;
}

public Date getFechaFin(){
	return fechaFin;
}

public BigDecimal getId_exp() {
	return id_exp;
}

public void setId_exp(BigDecimal id_exp) {
	try{
	this.id_exp = validateInts(id_exp);
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
