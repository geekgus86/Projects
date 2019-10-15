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
@Table(name="\"identidad_aux\"",schema="BOLSAIUSACELL")

public class Identidad_aux {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="identidad_sec")
	@SequenceGenerator(name="identidad_sec", sequenceName="identidad_sec")
	@Column(name = "\"id_aux\"")
    private int idAux;
	@Column(name="\"id_usuario\"")
    private BigDecimal idUsuario;
	@Column(name="\"id_identidad\"")
    private BigDecimal id_identidad;
	public int getIdAux() {
		return idAux;
	}
	public void setIdAux(int idAux) {
		this.idAux = idAux;
	}
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}
	public BigDecimal getId_identidad() {
		return id_identidad;
	}
	public void setId_identidad(BigDecimal id_identidad) {
		this.id_identidad = id_identidad;
	}
	
}
