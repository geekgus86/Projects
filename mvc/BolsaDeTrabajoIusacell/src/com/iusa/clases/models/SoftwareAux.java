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
@Table(name="\"software_aux\"",schema="BOLSAIUSACELL")
public class SoftwareAux {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="seq_software")
	@SequenceGenerator(name="seq_software", sequenceName="seq_software")
	@Column(name = "\"id_aux\"")
	private BigDecimal idAux;
	@Column(name = "\"id_usuario\"")
	private BigDecimal idUsuario;
	@Column(name = "\"id_software\"")
    private BigDecimal idSoftware;
	@Column(name = "\"dominio\"")
    private BigDecimal dominio;
	
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}
	public BigDecimal getIdSoftware() {
		return idSoftware;
	}
	public void setIdSoftware(BigDecimal idSoftware) {
		this.idSoftware = idSoftware;
	}
	public BigDecimal getDominio() {
		return dominio;
	}
	public void setDominio(BigDecimal dominio) {
		this.dominio = dominio;
	}


}
