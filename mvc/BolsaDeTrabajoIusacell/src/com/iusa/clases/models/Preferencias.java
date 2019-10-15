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
@Table(name="\"preferencias\"",schema="BOLSAIUSACELL")
public class Preferencias {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="seq_pref")
	@SequenceGenerator(name="seq_pref", sequenceName="seq_pref")
	@Column(name = "\"id_preferencia\"")
	private int idPreferencia;
	@Column(name = "\"id_usuario\"")
	private BigDecimal idUsuario;
	@Column(name = "\"salario_deseado\"")
	private BigDecimal salarioDeseado;
	@Column(name = "\"horario\"")
	private BigDecimal horario;
	public int getIdPreferencia() {
		return idPreferencia;
	}
	public void setIdPreferencia(int idPreferencia) {
		this.idPreferencia = idPreferencia;
	}
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}
	public BigDecimal getSalarioDeseado() {
		return salarioDeseado;
	}
	public void setSalarioDeseado(BigDecimal salarioDeseado) {
		this.salarioDeseado = salarioDeseado;
	}
	public BigDecimal getHorario() {
		return horario;
	}
	public void setHorario(BigDecimal horario) {
		this.horario = horario;
	}

}
