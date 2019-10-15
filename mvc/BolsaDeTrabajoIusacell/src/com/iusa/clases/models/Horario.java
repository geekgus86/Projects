package com.iusa.clases.models;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="\"horario_preferido\"",schema="BOLSAIUSACELL")
public class Horario {
	@Id
	@Column(name = "\"id_usuario\"")
    private BigDecimal idUsuario;
	@Column(name = "\"horario_preferido\"")
    private String horarioPreferido;
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getHorarioPreferido() {
		return horarioPreferido;
	}
	public void setHorarioPreferido(String horarioPreferido) {
		this.horarioPreferido = horarioPreferido;
	}

}
