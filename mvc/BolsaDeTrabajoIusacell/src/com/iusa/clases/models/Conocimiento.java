package com.iusa.clases.models;

import java.util.*;
import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.OneToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="\"conocimiento\"",schema="CHIVOPERRO")

public class Conocimiento {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="seq_con")
	@SequenceGenerator(name="seq_con", sequenceName="seq_con")
	@Column(name = "\"id_conocimiento\"")
    private int idConocimiento;
	@Column(name = "\"conocimiento\"")
    private String conocimiento;
	@Column(name = "\"especificar\"")
    private String especificar;
	@Column(name = "\"nivel\"")
    private int nivel;
	@Column(name = "\"ultimo_uso\"")
    private String ultimoUso;
	@Column(name = "\"id_usuario\"")
    private BigDecimal idUsuario;
	public int getIdConocimiento() {
		return idConocimiento;
	}
	public void setIdConocimiento(int idConocimiento) {
		this.idConocimiento = idConocimiento;
	}
	public String getConocimiento() {
		return conocimiento;
	}
	public void setConocimiento(String conocimiento) {
		this.conocimiento = conocimiento;
	}
	public String getEspecificar() {
		return especificar;
	}
	public void setEspecificar(String especificar) {
		this.especificar = especificar;
	}
	public int getNivel() {
		return nivel;
	}
	public void setNivel(int nivel) {
		this.nivel = nivel;
	}
	public String getUltimoUso() {
		return ultimoUso;
	}
	public void setUltimaFecha(String ultimoUso) {
		this.ultimoUso = ultimoUso;
	}
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}
	
}
