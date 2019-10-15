package com.iusa.clases.models;

import java.math.*;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="\"experiencia\"",schema="BOLSAIUSACELL")

public class Experiencia {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="exp_sec")
	@SequenceGenerator(name="exp_sec", sequenceName="exp_sec")
	@Column(name = "\"id_exp\"")
    private int idExperiencia;
	@Column(name="\"empresa\"")
    private String empresa;
	@Column(name="\"puesto\"")
    private String puesto;
	@Column(name="\"fecha_inicio\"")
    private Date fechaInicio;
	@Column(name="\"fecha_fin\"")
    private Date fechaFin;
	@Column(name="\"sueldo\"")
    private float sueldo;
	@Column(name="\"funciones\"")
    private String funciones;
	@Column(name="\"id_usuario\"")
	private BigDecimal idUsuario;
	@Column(name="\"trabajo_actual\"")
	private String actual;
	
	public void setIdExperiencia(int idExperiencia){
		  this.idExperiencia=idExperiencia;  
	  }
	  
	  public int getIdExperiencia(){
		  return idExperiencia;  
	  }
	  
	  public void setEmpresa(String empresa){
		  this.empresa=empresa;  
	  }
	  
	  public String getEmpresa(){
		  return empresa; 
	  }
	  
	  public void setPuesto(String puesto){
		  this.puesto=puesto;  
	  }
	  
	  public String getpuesto(){
		  return puesto; 
	  }
	  
	  public void setFechaInicio(Date fechaInicio){
		  this.fechaInicio=fechaInicio;  
	  }
	  
	  public Date getfechaInicio(){
		  return fechaInicio; 
	  }
	  
	  public void setFechaFin(Date fechaFin){
		  this.fechaFin=fechaFin;  
	  }
	  
	  public Date getfechaFin(){
		  return fechaFin; 
	  }
	  
	  public void setSueldo(float sueldo){
		  this.sueldo=sueldo;  
	  }
	  
	  public float getSueldo(){
		  return sueldo; 
	  }
	  

	public String getFunciones() {
		return funciones;
	}

	public void setFunciones(String funciones) {
		this.funciones = funciones;
	}

	public BigDecimal getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getActual() {
		return actual;
	}

	public void setActual(String actual) {
		this.actual = actual;
	}
	  

}
