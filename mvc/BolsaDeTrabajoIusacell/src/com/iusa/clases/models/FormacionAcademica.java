package com.iusa.clases.models;

import java.math.*;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity

@Table(name="\"formacion_academica\"",schema="BOLSAIUSACELL")
public class FormacionAcademica {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="seq_for")
	@SequenceGenerator(name="seq_for", sequenceName="seq_for")
	@Column(name = "\"id_formacion\"")
    private BigDecimal idFormacion;
	@Column(name = "\"nivel_estudios\"")
	private int nivelEstudios;
	@Column(name = "\"instituto\"")
	private String instituto;
	@Column(name="\"pais_instituto\"")
	private String paisInstituto;
	@Column(name = "\"estado_instituto\"")
	private String estado;
	@Column(name = "\"fecha_inicio\"")
	private Date fechaInicio;
	@Column(name = "\"fecha_fin\"")
	private Date fechaFin;
	@Column(name = "\"status\"")
	private String status;
	@Column(name="\"estudio_actual\"")
	private String estudioActual;
	@Column(name="\"id_usuario\"")
	 private BigDecimal idUsuario;
	@Column(name="\"area_especialidad\"")
	private String areaEspecialidad;
	//@ManyToOne
	//@JoinColumn(name="id_postulante")
	//private Usuario usuario;
	
	//public Usuario getUsuario() {
		//return usuario;
	//}
	//public void setUsuario(Usuario usuario) {
		//this.usuario = usuario;
	//}
	public BigDecimal getIdFormacion() {
		return idFormacion;
	}
	public void setIdFormacion(BigDecimal idFormacion) {
		this.idFormacion = idFormacion;
	}
	public int getNivelEstudios() {
		return nivelEstudios;
	}
	public void setNivelEstudios(int nivelEstudios) {
		this.nivelEstudios = nivelEstudios;
	}
	public String getInstituto() {
		return instituto;
	}
	public void setInstituto(String instituto) {
		this.instituto = instituto;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public Date getFechaInicio() {
		return fechaInicio;
	}
	public void setFechaInicio(Date fechaInicio) {
		this.fechaInicio = fechaInicio;
	}
	public Date getFechaFin() {
		return fechaFin;
	}
	public void setFechaFin(Date fechaFin) {
		this.fechaFin = fechaFin;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPaisInstituto() {
		return paisInstituto;
	}
	public void setPaisInstituto(String paisInstituto) {
		this.paisInstituto = paisInstituto;
	}
	public void setIdUsuario(BigDecimal idUsuario){
		this.idUsuario=idUsuario;
	}
	public BigDecimal getIdUsuario(){
		return idUsuario;
	}
	public String getEstudioActual() {
		return estudioActual;
	}
	public void setEstudioActual(String estudioActual) {
		this.estudioActual = estudioActual;
	}
	public String getAreaEspecialidad() {
		return areaEspecialidad;
	}
	public void setAreaEspecialidad(String areaEspecialidad) {
		this.areaEspecialidad = areaEspecialidad;
	}
}
