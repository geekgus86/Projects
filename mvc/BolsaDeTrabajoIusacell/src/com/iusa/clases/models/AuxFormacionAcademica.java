package com.iusa.clases.models;

import java.math.*;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;



public class AuxFormacionAcademica {

	@Id
	@Column(name = "\"id_aux\"")
    private BigDecimal idAux;
	@Column(name = "\"id_formacion\"")
    private BigDecimal idFormacion;
	@Column(name = "\"nivel_estudios\"")
	private String nivelEstudios;
	public BigDecimal getIdAux() {
		return idAux;
	}
	public void setIdAux(BigDecimal idAux) {
		this.idAux = idAux;
	}
	public BigDecimal getIdFormacion() {
		return idFormacion;
	}
	public void setIdFormacion(BigDecimal idFormacion) {
		this.idFormacion = idFormacion;
	}
	public String getNivelEstudios() {
		return nivelEstudios;
	}
	public void setNivelEstudios(String nivelEstudios) {
		this.nivelEstudios = nivelEstudios;
	}
	
}
