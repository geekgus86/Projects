package com.iusa.clases.models;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="\"admins\"",schema="CU_CONSULTAE")
public class Admin {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="admin_sec")
	@SequenceGenerator(name="admin_sec", sequenceName="admin_sec")
	@Column(name = "\"id_admin\"")
    private int idAdmin;
	@Column(name="\"cec\"")
    private String cec;
	@Column(name="\"email\"")
    private String email;
	@Column(name="\"nombre\"")
    private String nombre;
	@Column(name="\"nivel\"")
    private int nivelAdmin;
	@Column(name="\"ubicacion\"")
    private String ubicacion;
	@Column(name="\"region\"")
    private BigDecimal region;
	@Column(name = "\"ultima_fecha\"")
	private Date ultimaFecha;
	@Column(name="\"estatus_admin\"")
    private String estatus;
	
	
	public int getIdAdmin() {
		return idAdmin;
	}
	public void setIdAdmin(int idAdmin) {
		this.idAdmin = idAdmin;
	}
	public String getCec() {
		return cec;
	}
	public void setCec(String cec) {
		this.cec = cec;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public int getNivelAdmin() {
		return nivelAdmin;
	}
	public void setNivel(int nivelAdmin) {
		this.nivelAdmin = nivelAdmin;
	}
	public String getUbicacion() {
		return ubicacion;
	}
	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}
	public BigDecimal getRegion() {
		return region;
	}
	public void setRegion(BigDecimal region) {
		this.region = region;
	}
	public Date getUltimaFecha() {
		return ultimaFecha;
	}
	public void setUltimaFecha(Date ultimaFecha) {
		this.ultimaFecha = ultimaFecha;
	}
	
	public String getEstatus() {
		return estatus;
	}
	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}

}
