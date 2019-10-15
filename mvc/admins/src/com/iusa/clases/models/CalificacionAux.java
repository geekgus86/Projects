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
@Table(name="\"calificacion_aux\"", schema="CU_CONSULTAE")
public class CalificacionAux {
	
	@Id
	 @GeneratedValue(strategy=GenerationType.AUTO, generator="sec_calificacion")
	 @SequenceGenerator(name="sec_calificacion", sequenceName="sec_calificacion")
	 @Column(name = "\"id_aux_calif\"")
	   private int id_aux_calif;
	
	@Column(name = "\"id_calificacion\"")
    private BigDecimal id_calificacion;
	
	@Column(name = "\"id_usuario\"")
    private BigDecimal id_usuario;
	
	@Column(name = "\"id_vacante\"")
    private BigDecimal id_vacante;
	
	@Column(name = "\"id_admin_acalifico\"")
    private BigDecimal id_admin_acalifico;
	
	@Column(name = "\"comentarios_calif\"")
    private String comentarios_calif;
	
	
	
	
	

	public int getId_aux_calif() {
		return id_aux_calif;
	}

	public void setId_aux_calif(int id_aux_calif) {
		this.id_aux_calif = id_aux_calif;
	}

	public BigDecimal getId_calificacion() {
		return id_calificacion;
	}

	public void setId_calificacion(BigDecimal id_calificacion) {
		this.id_calificacion = id_calificacion;
	}

	public BigDecimal getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(BigDecimal id_usuario) {
		this.id_usuario = id_usuario;
	}

	public BigDecimal getId_vacante() {
		return id_vacante;
	}

	public void setId_vacante(BigDecimal id_vacante) {
		this.id_vacante = id_vacante;
	}

	public BigDecimal getId_admin_acalifico() {
		return id_admin_acalifico;
	}

	public void setId_admin_acalifico(BigDecimal id_admin_acalifico) {
		this.id_admin_acalifico = id_admin_acalifico;
	}

	public String getComentarios_calif() {
		return comentarios_calif;
	}

	public void setComentarios_calif(String comentarios_calif) {
		this.comentarios_calif = comentarios_calif;
	}
	
	

}
