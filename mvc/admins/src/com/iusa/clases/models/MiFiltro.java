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
@Table(name="\"filtro\"", schema="CU_CONSULTAE")
public class MiFiltro {
	
	@Id
	 @GeneratedValue(strategy=GenerationType.AUTO, generator="sec_mi_filtro")
	 @SequenceGenerator(name="sec_mi_filtro", sequenceName="sec_mi_filtro")
	 @Column(name = "\"id_aux\"")
	    private int id_aux;
	@Column(name = "\"id_usuario\"")
    private BigDecimal id_usuario;
	
	@Column(name = "\"id_admin\"")
    private BigDecimal id_admin;
	
	@Column(name = "\"id_vacante\"")
    private BigDecimal id_vacante;
	

	public int getId_aux() {
		return id_aux;
	}

	public void setId_aux(int id_aux) {
		this.id_aux = id_aux;
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
	

}
