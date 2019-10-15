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
@Table(name="\"habilidad\"",schema="BOLSAIUSACELL")

public class Habilidad {

	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="seq_skill")
	@SequenceGenerator(name="seq_skill", sequenceName="seq_skill")
	@Column(name = "\"id_aux_habilidad\"")
    private BigDecimal idAux;
	@Column(name = "\"id_usuario\"")
    private BigDecimal idUsuario;
	@Column(name = "\"habilidad\"")
    private String habilidad;
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getHabilidad() {
		return habilidad;
	}
	public void setHabilidad(String habilidad) {
		this.habilidad = habilidad;
	}
	public BigDecimal getIdAux() {
		return idAux;
	}
	public void setIdAux(BigDecimal idAux) {
		this.idAux = idAux;
	}
	
}
