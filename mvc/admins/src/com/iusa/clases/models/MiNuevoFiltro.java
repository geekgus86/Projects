package com.iusa.clases.models;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity
@Table(name="\"mi_nuevo_filtro\"", schema="CU_CONSULTAE")
public class MiNuevoFiltro {
	
	 @Id
	 @GeneratedValue(strategy=GenerationType.AUTO, generator="sec_mi_nuevo_filtro")
	 @SequenceGenerator(name="sec_mi_nuevo_filtro", sequenceName="sec_mi_nuevo_filtro")
	 
	 @Column(name = "\"id_mi_nuevo_filtro\"")
	 private int id_mi_nuevo_filtro;
	
	 @Column(name="\"id_usuario\"")
	 private BigDecimal id_usuario;
	 
	 @Column(name="\"id_admin\"")
	 private BigDecimal id_admin;
	 
	 @Column(name="\"id_vacante\"")
	 private BigDecimal id_vacante;
	 
	 @Column(name="\"observaciones\"")
	 private String observaciones;
	 
	 @Column(name="\"valor_calificacion\"")
	 private String valor_calificacion;
	 
	 @Column(name="\"quien_califico\"")
	 private BigDecimal quien_califico;
	 
	 

	public int getId_mi_nuevo_filtro() {
		return id_mi_nuevo_filtro;
	}

	public void setId_mi_nuevo_filtro(int id_mi_nuevo_filtro) {
		this.id_mi_nuevo_filtro = id_mi_nuevo_filtro;
	}

	public BigDecimal getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(BigDecimal id_usuario) {
		this.id_usuario = id_usuario;
	}

	public BigDecimal getId_admin() {
		return id_admin;
	}

	public void setId_admin(BigDecimal id_admin) {
		this.id_admin = id_admin;
	}

	public BigDecimal getId_vacante() {
		return id_vacante;
	}

	public void setId_vacante(BigDecimal id_vacante) {
		this.id_vacante = id_vacante;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public String getValor_calificacion() {
		return valor_calificacion;
	}

	public void setValor_calificacion(String valor_calificacion) {
		this.valor_calificacion = valor_calificacion;
	}

	public BigDecimal getQuien_califico() {
		return quien_califico;
	}

	public void setQuien_califico(BigDecimal quien_califico) {
		this.quien_califico = quien_califico;
	}
	 
	 

}
