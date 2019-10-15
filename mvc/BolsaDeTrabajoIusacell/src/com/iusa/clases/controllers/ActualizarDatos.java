package com.iusa.clases.controllers;

import java.math.*;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.interceptor.ServletRequestAware;

import org.hibernate.Session;

import java.io.File;


import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.opensymphony.xwork2.ActionSupport;

public class ActualizarDatos extends ActionSupport implements ServletRequestAware{


	protected String user;
    protected BigDecimal idUsuario;
    protected String apellidoPaterno;
    protected String apellidoMaterno;
    protected String nombre;
    protected String rfc;
    protected String homoclave;
    protected String curp;
    protected String sexo;
    protected String estadoCivil;
    protected String nacionalidad;
    protected int dia;
    protected String mes;
    protected String anio;
    protected String fechaNacimiento;
    protected String calleYNumero;
    protected String colonia;
    protected String ciudadPoblado;
    protected String municipioODelegacion;
    protected String estadoPais;
    protected String cp;
    protected String telefono;
    protected String telefono_extra;
    protected String celular;
 
    
	protected int nivelAcademico;
	protected String institucion;
	protected String pais;
	protected String estado;
	protected Date lapsoInicio;
	protected Date lapsoFin;
	protected String status;
	protected String estudioActual;
	protected String areaEspecialidad;
	

    protected String nombreEmpresa;
    protected String puesto;

	protected String mesInicioE;
	protected String anioInicioE;

	protected String mesFinE;
	protected String anioFinE;
    protected Date periodoInicio;
    protected Date periodoFin;
    protected float sueldoEmpresa;
    protected String motivosSalida;	
    protected String funcionesEmpresa;
    protected String trabajoActual;
    



    protected HttpServletRequest servletRequest;
    private File foto;
    private String fotoContentType;
    private String fotoFileName;
    

    SimpleDateFormat df=new SimpleDateFormat("d/m/y");
    
    Session session;
  
    
    public ActualizarDatos(){
    	session=HibernateUtil.getSessionFactory().getCurrentSession();
    }
    

  	public String execute(){
  		
  		
  		
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


  	public String validateInputs(String cadena)throws CaracterNoValidoException{

  	   	String escapedString="";
  	  
  	   	//if(cadena.matches("[0-9a-zA-Z·ÈÌÛ˙¡…Õ”⁄Ò—!°ø?/\\s\\$\\\\%\"#.:,()=_@-]*")){
  	   		
  	   		String reg = "[=;*|\\()$%#!&?/]";
  	   		   
  	       	escapedString= cadena.replaceAll(reg,"");
  	   		
  	   	//}else{
  	   		
  	   		//throw new CaracterNoValidoException();
  	   		
  	   //	}
  	   	
  	   	
  	   	return escapedString;
  	   }
  	
  	
  	public BigDecimal validateInts(BigDecimal numero) throws CaracterNoValidoException{
  		
  		
  		String validation=numero.toString();
  		
       if(validation.matches("[0-9]*")){
  	   		
    	   BigDecimal validatedInt=numero;
    	   return validatedInt;
  	   	}else{
  	   		throw new CaracterNoValidoException();
  	   	}
  		
  		
  	}

  	
  	
	public BigDecimal getIdUsuario(){
		  return idUsuario;
	  }
	
	public void setRfc(String rfc){
		try{
		  this.rfc=validateInputs(rfc);
		}catch(CaracterNoValidoException e){
			
		}
	  }
	
	public String getRfc(){
		  return rfc;
	  }
	
	public void setCurp(String curp){
		try{
		  this.curp=validateInputs(curp); 
          }catch(CaracterNoValidoException e){
			
		}
	  }
	
	public String getCurp(){
		  return curp;
	  }
	
	public void setSexo(String sexo){
		try{
		  this.sexo=validateInputs(sexo);  
		}catch(CaracterNoValidoException e){
				
			}
	  }
	
	public String getSexo(){
		  return sexo;
	  }
	
	public void setEstadoCivil(String estadoCivil){
		try{
		  this.estadoCivil=validateInputs(estadoCivil);
		  }  catch(CaracterNoValidoException e){
				
			}
	  }
	
	public String getEstadoCivil(){
		  return estadoCivil;
	  }
	
	public void setNacionalidad(String nacionalidad){
		try{
		  this.nacionalidad=validateInputs(nacionalidad);
		  }  catch(CaracterNoValidoException e){
				
			}
	  }
	
	public String getNacionalidad(){
		  return nacionalidad;
	  }
	
	
	public String getfechaNacimiento(){
		  return fechaNacimiento;
	  }
	
	public void setCalleYNumero(String calleYNumero){
		try{
		  this.calleYNumero=validateInputs(calleYNumero);
		} catch(CaracterNoValidoException e){
			
		}
	  }
	
	public String getCalleYNumero(){
		  return calleYNumero;
	  }
	
	public void setColonia(String colonia){
		try{
		  this.colonia=validateInputs(colonia);
		}catch(CaracterNoValidoException e){
			
		}
	  }
	
	public String getColonia(){
		  return colonia;
	  }
	
	public void setCiudadPoblado(String ciudadPoblado){
		try{
		  this.ciudadPoblado=validateInputs(ciudadPoblado);
		}catch(CaracterNoValidoException e){
			
		}
	  }
	
	public String ciudadPoblado(){
		  return ciudadPoblado;
	  }
	
	public void setMunicipioODelegacion(String municipioODelegacion){
		try{
		  this.municipioODelegacion=validateInputs(municipioODelegacion);
		}catch(CaracterNoValidoException e){
			
		}
	  }
	
	public String getMunicipioODelegacion(){
		  return municipioODelegacion;
	  }
	
	public void setCp(String cp){
		try{
		  this.cp=validateInputs(cp);
		}catch(CaracterNoValidoException e){
			
		}
	  }
	
	public String getCp(){
		  return cp;
	  }

	public void setTelefono(String telefono){
		try{
		  this.telefono=validateInputs(telefono);
		}catch(CaracterNoValidoException e){
			
		}
	  }
	
	public String getTelefono(){
		  return telefono;
	  }
	
	public void setTelefono_extra(String telefono_extra){
		try{
		  this.telefono_extra=validateInputs(telefono_extra);
		}catch(CaracterNoValidoException e){
			
		}
	  }
	
	public String getTelefono_extra(){
		  return telefono_extra;
	  }
	
	
	public void setCelular(String celular){
		  this.celular=celular;  
	  }
	
	public String getCelular(){
		  return celular;
	  }
	public String getApellidoPaterno(){
		return apellidoPaterno;
	}
	
	public void setApellidoPaterno(String apellidoPaterno){
		try{
		this.apellidoPaterno=validateInputs(apellidoPaterno);
		}catch(CaracterNoValidoException e){
			
		}
	}
	public String getApellidoMaterno(){
		return apellidoMaterno;
	}
	
	public void setApellidoMaterno(String apellidoMaterno){
		try{
			this.apellidoMaterno=validateInputs(apellidoMaterno);
			}catch(CaracterNoValidoException e){
				
			}
	}

		
	public String getNombreEmpresa() {
		return nombreEmpresa;
	}

	public void setNombreEmpresa(String nombreEmpresa) {
		try{
			this.nombreEmpresa = validateInputs(nombreEmpresa);
			}catch(CaracterNoValidoException e){
				
			}
		
		
	}

	public String getPuesto() {
		return puesto;
	}

	public void setPuesto(String puesto) {
		try{
		this.puesto = validateInputs(puesto);
		}catch(CaracterNoValidoException e){
			
		}
	}

	public Date getPeriodoInicio() {
		return periodoInicio;
	}

	public void setPeriodoInicio(Date periodoInicio) {
		this.periodoInicio = periodoInicio;
	}

	public Date getPeriodoFin() {
		return periodoFin;
	}

	public void setPeriodoFin(Date periodoFin) {
		this.periodoFin = periodoFin;
	}

	public float getSueldoEmpresa() {
		return sueldoEmpresa;
	}

	public void setSueldoEmpresa(float sueldoEmpresa) {
		this.sueldoEmpresa = sueldoEmpresa;
	}

	public String getMotivosSalida() {
		return motivosSalida;
	}

	public void setMotivosSalida(String motivosSalida) {
		this.motivosSalida = motivosSalida;
	}

	public String getFuncionesEmpresa() {
		return funcionesEmpresa;
	}

	public void setFuncionesEmpresa(String funcionesEmpresa) {
		
		try{
			this.funcionesEmpresa = validateInputs(funcionesEmpresa);
		}catch(CaracterNoValidoException e){
			
		}
		
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		
		try{
			this.nombre = validateInputs(nombre);
		}catch(CaracterNoValidoException e){
			
		}
		
		
	}

	

	
	
	
	public int getNivelAcademico() {
		return nivelAcademico;
	}

	public void setNivelAcademico(int nivelAcademico) {
		
		this.nivelAcademico = nivelAcademico;
	}

	public String getInstitucion() {
		return institucion;
	}

	public void setInstitucion(String institucion) {
		
		try{
			this.institucion = validateInputs(institucion);
		}catch(CaracterNoValidoException e){
			
		}
		
		 
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		
		try{
			this.estado = validateInputs(estado);
		}catch(CaracterNoValidoException e){
			
		}
		
	}

	public Date getLapsoInicio() {
		return lapsoInicio;
	}

	public void setLapsoInicio(Date lapsoInicio) {
		this.lapsoInicio = lapsoInicio;
	}

	public Date getLapsoFin() {
		return lapsoFin;
	}

	public void setLapsoFin(Date lapsoFin) {
		this.lapsoFin = lapsoFin;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		
		try{
			this.status = validateInputs(status);
		}catch(CaracterNoValidoException e){
			
		}
	}
	
	public void setPais(String pais){
		try{
			this.pais = validateInputs(pais);
		}catch(CaracterNoValidoException e){
			
		}
	}
	
	public String getPais(){
		return pais;
	}
	

	
	public String getHomoclave() {
		return homoclave;
	}

	public void setHomoclave(String homoclave) {
		
		try{
			this.homoclave= validateInputs(homoclave);
		}catch(CaracterNoValidoException e){
			
		}

	}

	public int getDia() {
		return dia;
	}

	public void setDia(int dia) {
		this.dia = dia;
	}

	public String getMes() {
		return mes;
	}

	public void setMes(String mes) {
		try{
			this.mes= validateInputs(mes);
		}catch(CaracterNoValidoException e){
			
		}
	}

	public String getAnio() {
		return anio;
	}

	public void setAnio(String anio) {
		try{
			this.anio =validateInputs(anio);
		}catch(CaracterNoValidoException e){
			
		}
	}


	


	public String getMesInicioE() {
		return mesInicioE;
	}


	public void setMesInicioE(String mesInicioE) {
		
		try{
			this.mesInicioE =validateInputs(mesInicioE);
		}catch(CaracterNoValidoException e){
			
		}
		
	}


	public String getAnioInicioE() {
		return anioInicioE;
	}


	public void setAnioInicioE(String anioInicioE) {
		
		try{
			this.anioInicioE =validateInputs(anioInicioE);
		}catch(CaracterNoValidoException e){
			
		}
		
	}


	public String getMesFinE() {
		return mesFinE;
	}


	public void setMesFinE(String mesFinE) {
		
		try{
			this.mesFinE  =validateInputs( mesFinE);
		}catch(CaracterNoValidoException e){
			
		}
		
	}


	public String getAnioFinE() {
		return anioFinE;
	}


	public void setAnioFinE(String anioFinE) {
		
		try{
			this.anioFinE =validateInputs(anioFinE);
		}catch(CaracterNoValidoException e){
			
		}
		
	}
	
	public void setTrabajoActual(String trabajoActual){
		
		try{
			this.trabajoActual =validateInputs(trabajoActual);
		}catch(CaracterNoValidoException e){
			
		}
		
	
	}

	
	public String getTrabajoActual(){
		
		return trabajoActual;
	}
	
	public void setEstudioActual(String estudioActual){
		
		try{
			this.estudioActual =validateInputs(estudioActual);
		}catch(CaracterNoValidoException e){
			
		}
		

	}

	
	public String getEstudioActual(){
		
		return estudioActual;
	}
	
	@Override
    public void setServletRequest(HttpServletRequest servletRequest) {
        this.servletRequest = servletRequest;
 
    }


	public String getEstadoPais() {
		return estadoPais;
	}
	
	public void setEstadoPais(String estadoPais) {
		try{
			this.estadoPais=validateInputs(estadoPais);
		}catch(CaracterNoValidoException e){
			
		}
	}
	
	public String getAreaEspecialidad() {
		return areaEspecialidad;
	}
	
	public void setAreaEspecialidad(String areaEspecialidad) {
		
		try{
			this.areaEspecialidad=validateInputs(areaEspecialidad);
		}catch(CaracterNoValidoException e){
			
		}
		
	}


	
	
}
