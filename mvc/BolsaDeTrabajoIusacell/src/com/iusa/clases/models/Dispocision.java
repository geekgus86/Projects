package com.iusa.clases.models;

import java.math.*;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;

import javax.persistence.Table;

@Entity
@Table(name="\"disposicion\"",schema="BOLSAIUSACELL")



public class Dispocision {

	@Id
	@Column(name = "\"id_usuario\"")
	private BigDecimal idUsuario;
	@Column(name = "\"viajar\"")
	private String viajar;
	@Column(name = "\"mudarse\"")
	private String mudarse;
	
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getViajar() {
		return viajar;
	}
	public void setViajar(String viajar) {
		this.viajar = viajar;
	}
	public String getMudarse() {
		return mudarse;
	}
	public void setMudarse(String mudarse) {
		this.mudarse = mudarse;
	}
	
}
