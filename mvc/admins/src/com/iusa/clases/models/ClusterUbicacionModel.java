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
@Table(name="\"clusters_ubicacion\"", schema="CU_CONSULTAE")

public class ClusterUbicacionModel {
	
	
	 @Id
	 @GeneratedValue(strategy=GenerationType.AUTO, generator="sec_cluster_ubica")
	 @SequenceGenerator(name="sec_cluster_ubica", sequenceName="sec_cluster_ubica")
	 @Column(name = "\"id_ubicacion_cluster\"")
	 private BigDecimal id_ubicacion_cluster;
	
	 @Column(name="\"id_admin\"")
	 private BigDecimal id_admin;
	 
	 @Column(name="\"id_estado\"")
	 private BigDecimal id_estado;

	public BigDecimal getId_ubicacion_cluster() {
		return id_ubicacion_cluster;
	}

	public void setId_ubicacion_cluster(BigDecimal id_ubicacion_cluster) {
		this.id_ubicacion_cluster = id_ubicacion_cluster;
	}

	public BigDecimal getId_admin() {
		return id_admin;
	}

	public void setId_admin(BigDecimal id_admin) {
		this.id_admin = id_admin;
	}

	public BigDecimal getId_estado() {
		return id_estado;
	}

	public void setId_estado(BigDecimal id_estado) {
		this.id_estado = id_estado;
	}

}
