package com.iusa.clases.models;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
@Entity
@Table(name="\"talento_aux\"",schema="BOLSAIUSACELL")
public class TalentoAux {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="seq_talent")
	@SequenceGenerator(name="seq_talent", sequenceName="seq_talent")
	@Column(name = "\"id_aux_talento\"")
	private int idAuxTalento;
	@Column(name = "\"id_usuario\"")
    private BigDecimal idUsuario;
	@Column(name = "\"id_talento\"")
    private int idTalento;
	@Column(name = "\"porcentaje\"")
    private int porcentaje;
	@Column(name = "\"color\"")
    private String color;
	@Column(name = "\"grado\"")
    private int numcolor;
	
	
	public int getIdAuxTalento() {
		return idAuxTalento;
	}
	public void setIdAuxTalento(int idAuxTalento) {
		this.idAuxTalento = idAuxTalento;
	}
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}
	public int getIdTalento() {
		return idTalento;
	}
	public void setIdTalento(int idTalento) {
		this.idTalento = idTalento;
	}
	public int getPorcentaje() {
		return porcentaje;
	}
	public void setPorcentaje(int porcentaje) {
		this.porcentaje = porcentaje;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	
	
	public int getNumcolor() {
		return numcolor;
	}
	public void setNumcolor(int numcolor) {
		this.numcolor = numcolor;
	}
	
}
