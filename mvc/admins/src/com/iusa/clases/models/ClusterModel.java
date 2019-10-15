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
@Table(name="\"clusters\"", schema="CU_CONSULTAE")
public class ClusterModel {
	
	
	 @Id
	 @GeneratedValue(strategy=GenerationType.AUTO, generator="sec_cluster")
	 @SequenceGenerator(name="sec_cluster", sequenceName="sec_cluster")
	 @Column(name = "\"id_cluster\"")
	 private BigDecimal id_cluster;
	 
	 
	 @Column(name="\"id_admin\"")
	 private BigDecimal id_admin;
	 
	 @Column(name="\"id_admin_calificador\"")
	 private BigDecimal id_admin_calificador;

	public BigDecimal getId_cluster() {
		return id_cluster;
	}

	public void setId_cluster(BigDecimal id_cluster) {
		this.id_cluster = id_cluster;
	}

	public BigDecimal getId_admin() {
		return id_admin;
	}

	public void setId_admin(BigDecimal id_admin) {
		this.id_admin = id_admin;
	}

	public BigDecimal getId_admin_calificador() {
		return id_admin_calificador;
	}

	public void setId_admin_calificador(BigDecimal id_admin_calificador) {
		this.id_admin_calificador = id_admin_calificador;
	}
	 
	 
	 

}
