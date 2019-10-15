package com.iusa.clases.models;

import java.math.*;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="\"aux_hob\"",schema="BOLSAIUSACELL")



public class AuxHobbie {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="seq_hob")
	@SequenceGenerator(name="seq_hob", sequenceName="seq_hob")
	@Column(name = "\"id_aux\"")
    private int idAux;
	@Column(name = "\"id_usuario\"")
    private BigDecimal idUsuario;
	@Column(name = "\"id_hobbie\"")
    private BigDecimal idHobbie;
	@Column(name = "\"casilla\"")
    private BigDecimal casilla;
	
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
	public BigDecimal getIdHobbie() {
		return idHobbie;
	}
	public void setIdHobbie(BigDecimal idHobbie) {
		this.idHobbie = idHobbie;
	}
	public BigDecimal getCasilla() {
		return casilla;
	}
	public void setCasilla(BigDecimal casilla) {
		this.casilla = casilla;
	}
}
