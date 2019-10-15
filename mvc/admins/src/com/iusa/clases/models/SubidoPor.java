package com.iusa.clases.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import java.math.*;

@Entity
@Table(name="\"subido_por\"", schema="CU_CONSULTAE")
public class SubidoPor {
	
	 @Id
	 @GeneratedValue(strategy=GenerationType.AUTO, generator="seq_subido_por")
	 @SequenceGenerator(name="seq_subido_por", sequenceName="seq_subido_por")
	 @Column(name = "\"id_subido\"")
	 	private BigDecimal idSubido;
	 @Column(name="\"id_vacante\"")
	 	private BigDecimal idVacante;
	 @Column(name="\"id_admin\"")
	 	private BigDecimal idAdmin;
	 
	 

	public BigDecimal getIdSubido() {
		return idSubido;
	}

	public void setIdSubido(BigDecimal idSubido) {
		this.idSubido = idSubido;
	}

	public BigDecimal getIdVacante() {
		return idVacante;
	}

	public void setIdVacante(BigDecimal idVacante) {
		this.idVacante = idVacante;
	}

	public BigDecimal getIdAdmin() {
		return idAdmin;
	}

	public void setIdAdmin(BigDecimal idAdmin) {
		this.idAdmin = idAdmin;
	}

}
