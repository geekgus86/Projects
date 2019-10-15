package com.iusa.clases.models;


import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.OneToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.ibm.math.BigDecimal;

@Entity
@Table(name="\"usuario\"",schema="BOLSAIUSACELL")

public class Usuario {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="usuario_sec")
	@SequenceGenerator(name="usuario_sec", sequenceName="usuario_sec")
	@Column(name = "\"id_postulante\"")
    private int idPostulante;
	@Column(name="\"apellido_paterno\"")
    private String apellidoPaterno;
	@Column(name="\"apellido_materno\"")
    private String apellidoMaterno;
	@Column(name="\"nombre\"")
    private String nombre;
	@Column(name="\"correo_electronico\"")
    private String correoElectronico;
	@Column(name="\"usuario_nombre\"")
    private String usuarioNombre;
	@Column(name="\"password\"")
    private String password;
	@Column(name="\"como_se_entero\"")
    private String comoSeEntero;
	@Column(name="\"area_de_interes\"")
    private String areaInteres;
	@Column(name="\"telefono\"")
    private String telefono;
	@Column(name="\"nivel_de_estudios\"")
    private int nivelEstudios;
	@Column(name="\"area_formacion\"")
    private String areaFormacion;
	@Column(name="\"fecha_nacimiento\"")
    private Date fechaNacimiento;
	@Column(name="\"progreso\"")
    private int progreso;
    @Column (name="\"area_de_interes_alterna\"")
    private String areaInteresAlterna;
//    @Column(name="\"telefono_extra\"")
//    private String telefono_extra;
	
	/*@OneToMany(mappedBy="usuario")
	private Set <FormacionAcademica> formacionesAcademicas;
	//@OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
	//private DatosPersonales datosPersonales;
	*/

  public Usuario(){
	
  }

  
  public void setIdPostulante(int id_postulante){
	  this.idPostulante=id_postulante;
  }
  
  public void setApellidoPaterno(String apellidoPaterno){
	  this.apellidoPaterno=apellidoPaterno;  
  }
  
  public void setApellidoMaterno(String apellidoMaterno){
	  this.apellidoMaterno=apellidoMaterno;  
  }
  
  public void setNombre(String nombre){
	  this.nombre=nombre;  
  }
  
  public void setCorreoElectronico(String correoElectronico){
	  this.correoElectronico=correoElectronico;  
  }
  
  public void setUsuarioNombre(String usuarioNombre){
	  this.usuarioNombre=usuarioNombre;  
  }
  
  public void setPassword(String password){
	  this.password=password;  
  }
  
  public void setComoSeEntero(String comoSeEntero){
	  this.comoSeEntero=comoSeEntero;  
  }
  
  public int getIdPostulante(){
	  return idPostulante;
  }
  
  public String getApellidoPaterno(){
	  return apellidoPaterno;
  }
  
  public String getApellidoMaterno(){
	  return apellidoMaterno;
  }
  
  public String getNombre(){
	  return nombre;
  }
  
  public String getCorreoElectronico(){
	  return correoElectronico;
  }
  
  public String getUsuarioNombre(){
	  return usuarioNombre;
  }
  
  public String getPassword(){
	  return password;
  }
  
  public String getComoSeEntero(){
	  return comoSeEntero;
  }
  
  public void setAreaInteres(String areaInteres){
	  this.areaInteres=areaInteres; 
  }
  
  public String getAreaInteres(){
	  return areaInteres;
  }
  
  public void setTelefono(String telefono){
	  this.telefono=telefono; 
  }
  
  public String getTelefono(){
	  return telefono;
  }
  
public int getNivelEstudios() {
	return nivelEstudios;
}


public void setNivelEstudios(int nivelEstudios) {
	this.nivelEstudios = nivelEstudios;
}


public String getAreaFormacion() {
	return areaFormacion;
}


public void setAreaFormacion(String areaFormacion) {
	this.areaFormacion = areaFormacion;
}



public Date getFechaNacimiento() {
	return fechaNacimiento;
}


public void setFechaNacimiento(Date fechaNacimiento) {
	this.fechaNacimiento = fechaNacimiento;
}


public int getProgreso() {
	return progreso;
}


public void setProgreso(int progreso) {
	this.progreso = progreso;
}


public String getAreaInteresAlterna() {
	return areaInteresAlterna;
}


public void setAreaInteresAlterna(String areaInteresAlterna) {
	this.areaInteresAlterna = areaInteresAlterna;
}

//public void setTelefono_extra(String telefono_extra){
//	  this.telefono_extra=telefono_extra; 
//}
//
//public String getTelefono_extra(){
//	  return telefono_extra;
//}

/*
public Set <FormacionAcademica> getFormacionesAcademicas() {
	return formacionesAcademicas;
}


public void setFormacionesAcademicas(Set <FormacionAcademica> formacionesAcademicas) {
	this.formacionesAcademicas = formacionesAcademicas;
}
  */
  
  
 /* public DatosPersonales getDatosPersonales(){
	  return datosPersonales;
	  }
  
  public void setDatosPersonales(DatosPersonales datosPersonales){
	  this.datosPersonales=datosPersonales;
	  }
*/
}
