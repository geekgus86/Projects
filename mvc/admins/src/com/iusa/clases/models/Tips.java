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
@Table(name="\"tips\"", schema="CU_CONSULTAE")
public class Tips {
	
	 @Id
	 @GeneratedValue(strategy=GenerationType.AUTO, generator="sec_tips")
	 @SequenceGenerator(name="sec_tips", sequenceName="sec_tips")
	 @Column(name = "\"id_tip\"")
	 	private BigDecimal idTip;
	 @Column(name="\"tip_descripcion\"")
	 	private String tipDescripcion;
	 @Column(name="\"tipo_tip\"")
	 	private String tipoTip;
	 
	 
	 
	public BigDecimal getIdTip() {
		return idTip;
	}
	public void setIdTip(BigDecimal idTip) {
		this.idTip = idTip;
	}
	public String getTipDescripcion() {
		return tipDescripcion;
	}
	public void setTipDescripcion(String tipDescripcion) {
		this.tipDescripcion = tipDescripcion;
	}
	public String getTipoTip() {
		return tipoTip;
	}
	public void setTipoTip(String tipoTip) {
		this.tipoTip = tipoTip;
	}
	 
}
