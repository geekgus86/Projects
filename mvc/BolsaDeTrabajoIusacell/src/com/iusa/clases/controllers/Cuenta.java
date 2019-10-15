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

public class Cuenta extends ActionSupport{
	

	private String apellidoP;
	private String apellidoM ;
	private String nom;
	private String imail;
	private String contra;
	private String comoSeEntero;
	private String areaInteres;
	private String areaInteres2;
	private String telefono;
	//private String telefono_extra;
	private String areaFormacion;
	private String diaNacimiento;
    private String mesNacimiento;
    private int nivelDeEstudios;
    private String anioNacimiento;
    private Date fechaNacimiento;
    
	
	Session session=HibernateUtil.getSessionFactory().getCurrentSession();
	SimpleDateFormat df=new SimpleDateFormat("d/MM/y");
	
	 public String execute() {
		   
		    HttpServletRequest request = ServletActionContext.getRequest();
		    HttpSession sesion = request.getSession();
		    
		    
			sesion.setAttribute("usuario", imail);
			
			
		 Transaction tr = session.beginTransaction();
		 try{
		 Usuario usuario=new Usuario();

		 usuario.setApellidoMaterno(apellidoM);
		 usuario.setApellidoPaterno(apellidoP);
		 usuario.setNombre(nom);
		 usuario.setCorreoElectronico(imail);
		 usuario.setUsuarioNombre(imail);
		 usuario.setPassword(contra);
		 usuario.setComoSeEntero("Iusacell");
		 usuario.setAreaInteres(areaInteres);
		 usuario.setAreaFormacion(areaFormacion);
		 usuario.setTelefono(telefono);
		 //usuario.setTelefono_extra(telefono_extra);
		 usuario.setNivelEstudios(nivelDeEstudios);
		 usuario.setAreaInteresAlterna(areaInteres2);
		 usuario.setProgreso(5);
		 this.fechaNacimiento=df.parse(diaNacimiento+"/"+mesNacimiento+"/"+anioNacimiento);

		 
		 usuario.setFechaNacimiento(fechaNacimiento);
		 
		 
		 session.save(usuario);
		 tr.commit();
		
		 }catch(Exception e){
			
			 tr.rollback();
		 }
   
		
		 
		
		 return SUCCESS;
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
	 
	 public String getNom() {
		  return nom;
		  }
	 public String getImail() {
		  return imail;
		  }
	
	 
	 
	 public void setApellidoP(String value) {
		  apellidoP = value;
		  }
	 public void setApellidoM(String value) {
		  apellidoM = value;
		  }
	 public void setNom(String value) {
		  nom = value;
		  }
	 public void setImail(String value) {
		 try{
		  imail = escapeChars(value);
		 }catch(CaracterNoValidoException e){}
		  }
	 
	 public void setContra(String value) {
		 try{
		  contra = escapeChars(value);
		 }catch(CaracterNoValidoException e){}
		  }
	 
	 public void setEntero(String value) {
		  comoSeEntero = value;
		  }
	 
	 public String getApellidoP(){
		 return apellidoP;
	 }
	 
	 public String getApellidoM(){
		 return apellidoM;
	 }
	 

	public String getAreaInteres() {
		return areaInteres;
	}
	public void setAreaInteres(String areaInteres) {
		this.areaInteres = areaInteres;
	}

	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	
//	public String getTelefono_extra() {
//		return telefono_extra;
//	}
//	public void setTelefono_extra(String telefono_extra) {
//		this.telefono_extra = telefono_extra;
//	}

	public String getAreaFormacion() {
		return areaFormacion;
	}
	public void setAreaFormacion(String areaFormacion) {
		this.areaFormacion = areaFormacion;
	}


	public String getDiaNacimiento() {
		return diaNacimiento;
	}


	public void setDiaNacimiento(String diaNacimiento) {
		this.diaNacimiento = diaNacimiento;
	}


	public String getMesNacimiento() {
		return mesNacimiento;
	}


	public void setMesNacimiento(String mesNacimiento) {
		this.mesNacimiento = mesNacimiento;
	}


	public String getAnioNacimiento() {
		return anioNacimiento;
	}


	public void setAnioNacimiento(String anioNacimiento) {
		this.anioNacimiento = anioNacimiento;
	}


	public int getNivelDeEstudios() {
		return nivelDeEstudios;
	}


	public void setNivelDeEstudios(int nivelDeEstudios) {
		this.nivelDeEstudios = nivelDeEstudios;
	}


	public String getAreaInteres2() {
		return areaInteres2;
	}


	public void setAreaInteres2(String areaInteres2) {
		this.areaInteres2 = areaInteres2;
	}



	
	
}
