package com.sidiAlumno.general;

/**
 * Clase que contiene los componentes del Catálogo de las claves de servicio 
 * ocupadas para el pago en las preinscripciones
 * @author Yestrada
 * @since June 1, 2015
 */
public class PagoCveServicio {
	
	private String codigoCampus;
	private String codigoNivel;
	private String cveServicio;
	private String fechaDeMovimiento;
	
	public String getCodigoCampus() {
		return codigoCampus;
	}
	public void setCodigoCampus(String codigoCampus) {
		this.codigoCampus = codigoCampus;
	}
	public String getCodigoNivel() {
		return codigoNivel;
	}
	public void setCodigoNivel(String codigoNivel) {
		this.codigoNivel = codigoNivel;
	}
	public String getCveServicio() {
		return cveServicio;
	}
	public void setCveServicio(String cveServicio) {
		this.cveServicio = cveServicio;
	}
	public String getFechaDeMovimiento() {
		return fechaDeMovimiento;
	}
	public void setFechaDeMovimiento(String fechaDeMovimiento) {
		this.fechaDeMovimiento = fechaDeMovimiento;
	}
	

}
