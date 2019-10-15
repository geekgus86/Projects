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
@Table(name="\"tipo_vacante_medio\"", schema="CU_CONSULTAE")
public class TipoVacanteMedio {
	
	 @Id
	 @GeneratedValue(strategy=GenerationType.AUTO, generator="seq_tipo_vac_medio")
	 @SequenceGenerator(name="seq_tipo_vac_medio", sequenceName="seq_tipo_vac_medio")
	 @Column(name = "\"id_geo\"")
	 	private BigDecimal idGeo;
	 @Column(name="\"id_vacante\"")
	 	private BigDecimal idVacante;
	 @Column(name="\"id_tipo_vacante\"")
	 	private BigDecimal idTipoVac;

	public BigDecimal getIdGeo() {
		return idGeo;
	}

	public void setIdGeo(BigDecimal idGeo) {
		this.idGeo = idGeo;
	}

	public BigDecimal getIdVacante() {
		return idVacante;
	}

	public void setIdVacante(BigDecimal idVacante) {
		this.idVacante = idVacante;
	}

	public BigDecimal getIdTipoVac() {
		return idTipoVac;
	}

	public void setIdTipoVac(BigDecimal idTipoVac) {
		this.idTipoVac = idTipoVac;
	}

}
