package com.iusa.clases.models;

import java.math.*;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="\"Ubicacion\"",schema="BOLSAIUSACELL")
public class Ubicacion {
	
	@Id
	@Column(name = "\"id_usuario\"")
    private BigDecimal idUsuario;
	@Column(name = "\"nacionalidad\"")
    private String nacionalidad;
	@Column(name = "\"calle_numero\"")
    private String calleYNumero;
	@Column(name = "\"colonia\"")
    private String colonia;
	@Column(name = "\"ciudad_poblado\"")
    private String ciudadPoblado;
	@Column(name = "\"municipio_delegacion\"")
    private String municipioODelegacion;
	@Column(name = "\"estado\"")
    private String estadoPais;
	@Column(name = "\"cp\"")
    private String cp;
	
	
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getNacionalidad() {
		return nacionalidad;
	}
	public void setNacionalidad(String nacionalidad) {
		this.nacionalidad = nacionalidad;
	}
	public String getCalleYNumero() {
		return calleYNumero;
	}
	public void setCalleYNumero(String calleYNumero) {
		this.calleYNumero = calleYNumero;
	}
	public String getColonia() {
		return colonia;
	}
	public void setColonia(String colonia) {
		this.colonia = colonia;
	}
	public String getCiudadPoblado() {
		return ciudadPoblado;
	}
	public void setCiudadPoblado(String ciudadPoblado) {
		this.ciudadPoblado = ciudadPoblado;
	}
	public String getMunicipioODelegacion() {
		return municipioODelegacion;
	}
	public void setMunicipioODelegacion(String municipioODelegacion) {
		this.municipioODelegacion = municipioODelegacion;
	}
	public String getEstadoPais() {
		return estadoPais;
	}
	public void setEstadoPais(String estadoPais) {
		this.estadoPais = estadoPais;
	}
	public String getCp() {
		return cp;
	}
	public void setCp(String cp) {
		this.cp = cp;
	}
	
}
