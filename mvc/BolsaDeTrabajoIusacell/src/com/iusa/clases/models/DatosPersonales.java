package com.iusa.clases.models;


import java.math.*;
import java.util.*;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="\"datos_personales\"",schema="BOLSAIUSACELL")

public class DatosPersonales {

	@Id
	@Column(name = "\"id_usuario\"")
    private BigDecimal idUsuario;
	@Column(name = "\"rfc\"")
    private String rfc;
	@Column(name = "\"homoclave\"")
    private String homoclave;
	@Column(name = "\"curp\"")
    private String curp;
	@Column(name = "\"sexo\"")
    private String sexo;
	@Column(name = "\"estado_civil\"")
    private String estadoCivil;
	
	
	public void setIdUsuario(BigDecimal idUsuario){
		  this.idUsuario=idUsuario;  
	  }
	
	public BigDecimal getIdUsuario(){
		  return idUsuario;
	  }
	
	public void setRFC(String rfc){
		  this.rfc=rfc;  
	  }
	
	public String getRFC(){
		  return rfc;
	  }
	
	public void setCurp(String curp){
		  this.curp=curp;  
	  }
	
	public String getCurp(){
		  return curp;
	  }
	
	public void setSexo(String sexo){
		  this.sexo=sexo;  
	  }
	
	public String getSexo(){
		  return sexo;
	  }
	
	public void setEstadoCivil(String estadoCivil){
		  this.estadoCivil=estadoCivil;  
	  }
	
	public String getEstadoCivil(){
		  return estadoCivil;
	  }

	public String getHomoclave() {
		return homoclave;
	}

	public void setHomoclave(String homoclave) {
		this.homoclave = homoclave;
	}
	
	
	
}
