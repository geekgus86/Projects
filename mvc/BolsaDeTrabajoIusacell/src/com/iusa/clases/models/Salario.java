package com.iusa.clases.models;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="\"salario_deseado\"",schema="BOLSAIUSACELL")
public class Salario {
	@Id
	@Column(name = "\"id_usuario\"")
    private BigDecimal idUsuario;
	@Column(name = "\"salario_deseado\"")
    private BigDecimal salarioDeseado;
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

}
