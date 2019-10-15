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
@Table(name="\"idioma_aux\"",schema="BOLSAIUSACELL")

public class AuxIdioma {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="seq_aux")
	@SequenceGenerator(name="seq_aux", sequenceName="seq_aux")
	@Column(name = "\"id_idioma_aux\"")
    private int idAux;
	@Column(name = "\"id_idioma\"")
    private int idIdioma;
	@Column(name = "\"id_usuario\"")
    private BigDecimal idUsuario;
	@Column(name = "\"dominio\"")
    private int dominio;
	
	public int getIdAux() {
		return idAux;
	}
	public void setIdAux(int idAux) {
		this.idAux = idAux;
	}
	public int getIdIdioma() {
		return idIdioma;
	}
	public void setIdIdioma(int idIdioma) {
		this.idIdioma = idIdioma;
	}
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}
	public int getDominio() {
		return dominio;
	}
	public void setDominio(int dominio) {
		this.dominio = dominio;
	}
	
}
