package com.iusa.clases.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import java.sql.Date;
import java.sql.Timestamp;


@Entity
@Table(name="BOLSAIUSACELL.vacante")

public class Vacante {
	@Id
	 @GeneratedValue(strategy=GenerationType.AUTO, generator="vacante_sec")
	 @SequenceGenerator(name="vacante_sec", sequenceName="vacante_sec")
	 @Column(name = "\"id_vacante\"")
	    private int idVacante;
	
	 @Column(name="\"nombre_vacante\"")
	 	private String nomVacante;
	 
	 @Column(name = "\"folio\"")
	 	private String numFolio;
	 
	 @Column(name = "\"fecha_publicacion\"")
	 	private Timestamp fechaPublicacion;
	 
	 @Column(name = "\"fecha_vigencia\"")
	 	private Timestamp fechaVigencia;
	 
	 @Column(name = "\"texto_introductorio\"")
	 	private String textoIntroductorio;
	 
	 @Column(name = "\"escolaridad\"")
	 	private String escolaridad;
	 
	 @Column(name = "\"sueldo_vacante\"")
	 	private float sueldoVacante;
	 
	 @Column(name = "\"anios_experiencia\"")
	 	private int aniosExperiencia;
	 
	 @Column(name = "\"conocimientos\"")
	 	private String conocimientos;
	 
	 @Column(name = "\"talentos\"")
	 	private String talentos;
	 
	 @Column(name = "\"ubicacion\"")
	 	private String ubicacion;
	 
	 @Column(name = "\"estado_vacante\"")
	 	private String estadoVacante;
	 
	 @Column(name = "\"destacado\"")
	 	private int destacado;
	 
	 @Column(name = "\"area_experiencia\"")
	 	private String areaExperiencia;
	 
	 @Column(name = "\"principales_funciones\"")
	 	private String principalesFunciones;
	 
	 @Column(name = "\"tipo_vacante\"")
	 	private String tipoVacante;
	 
	public Vacante(){
		
	}
	public int getIdVacante() {
		return idVacante;
	}
	public void setIdVacante(int idVacante) {
		this.idVacante = idVacante;
	}
	public String getNomVacante() {
		return nomVacante;
	}
	public void setNomVacante(String nomVacante) {
		this.nomVacante = nomVacante;
	}
	public String getNumFolio() {
		return numFolio;
	}
	public void setNumFolio(String numFolio) {
		this.numFolio = numFolio;
	}
	public Timestamp getFechaPublicacion() {
		return fechaPublicacion;
	}
	public void setFechaPublicacion(Timestamp fechaPublicacion) {
		this.fechaPublicacion = fechaPublicacion;
	}

	public Timestamp getfechaVigencia() {
		return fechaVigencia;
	}
	public void setfechaVigencia(Timestamp fechaVigencia) {
		this.fechaVigencia = fechaVigencia;
	}
	
	public String gettextoIntroductorio() {
		return textoIntroductorio;
	}
	public void settextoIntroductorio(String textoIntroductorio) {
		this.textoIntroductorio = textoIntroductorio;
	}
	
	public String getescolaridad() {
		return escolaridad;
	}
	public void setescolaridad(String escolaridad) {
		this.escolaridad = escolaridad;
	}
	
	public Float getsueldoVacante() {
		return sueldoVacante;
	}
	public void setsueldoVacante(Float sueldoVacante) {
		this.sueldoVacante = sueldoVacante;
	}
	
	public int getaniosExperiencia() {
		return aniosExperiencia;
	}
	public void setaniosExperiencia(int aniosExperiencia) {
		this.aniosExperiencia = aniosExperiencia;
	}
	
	public String getconocimientos() {
		return conocimientos;
	}
	public void setconocimientos(String conocimientos) {
		this.conocimientos = conocimientos;
	}
	
	public String gettalentos() {
		return talentos;
	}
	public void settalentos(String talentos) {
		this.talentos = talentos;
	}
	
	public String getubicacion() {
		return ubicacion;
	}
	public void setubicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}
	
	public String getestadoVacante() {
		return estadoVacante;
	}
	public void setestadoVacante(String estadoVacante) {
		this.estadoVacante = estadoVacante;
	}
	
	public int getdestacado() {
		return destacado;
	}
	public void setdestacado(int destacado) {
		this.destacado = destacado;
	}
	
	public String getareaExperiencia() {
		return areaExperiencia;
	}
	public void setareaExperiencia(String areaExperiencia) {
		this.areaExperiencia = areaExperiencia;
	}
	
	public String getprincipalesFunciones() {
		return principalesFunciones;
	}
	public void setprincipalesFunciones(String principalesFunciones) {
		this.principalesFunciones = principalesFunciones;
	}
	
	public String gettipoVacante() {
		return tipoVacante;
	}
	public void settipoVacante(String tipoVacante) {
		this.tipoVacante = tipoVacante;
	}
	

}
