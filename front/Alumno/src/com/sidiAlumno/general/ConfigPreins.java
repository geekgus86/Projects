package com.sidiAlumno.general;

public class ConfigPreins {
	
	private String codigoCampus;
	private String periodo;
	private String codigoNivel;
	private Double montoAnticipoColeg;
	//private boolean configMontoAnticipo;
	//private String fechaInicioPreinscripcion;
	//private String fechaVencPreinscripcion;
	//private boolean configFechasPreinscripcion;
	private String fechaInicioCampus;
	private String fechaVencCampus;
	private boolean configHorario;
	private String fechaDeMovimiento;
	
	public String getCodigoCampus() {
		return codigoCampus;
	}
	public void setCodigoCampus(String codigoCampus) {
		this.codigoCampus = codigoCampus;
	}
	public String getPeriodo() {
		return periodo;
	}
	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}
	public String getCodigoNivel() {
		return codigoNivel;
	}
	public void setCodigoNivel(String codigoNivel) {
		this.codigoNivel = codigoNivel;
	}
	public Double getMontoAnticipoColeg() {
		return montoAnticipoColeg;
	}
	public void setMontoAnticipoColeg(Double montoAnticipoColeg) {
		this.montoAnticipoColeg = montoAnticipoColeg;
	}

	/*
	public boolean getConfigMontoAnticipo() {
		return configMontoAnticipo;
	}
	public void setConfigMontoAnticipo(boolean configMontoAnticipo) {
		this.configMontoAnticipo = configMontoAnticipo;
	}
	public String getFechaInicioPreinscripcion() {
		return fechaInicioPreinscripcion;
	}
	public void setFechaInicioPreinscripcion(String fechaInicioPreinscripcion) {
		this.fechaInicioPreinscripcion = fechaInicioPreinscripcion;
	}
	public String getFechaVencPreinscripcion() {
		return fechaVencPreinscripcion;
	}
	public void setFechaVencPreinscripcion(String fechaVencPreinscripcion) {
		this.fechaVencPreinscripcion = fechaVencPreinscripcion;
	}
	public boolean getConfigFechasPreinscripcion() {
		return configFechasPreinscripcion;
	}
	public void setConfigFechasPreinscripcion(boolean configFechasPreinscripcion) {
		this.configFechasPreinscripcion = configFechasPreinscripcion;
	}
*/	
	
	public String getFechaInicioCampus() {
		return fechaInicioCampus;
	}
	public void setFechaInicioCampus(String fechaInicioCampus) {
		this.fechaInicioCampus = fechaInicioCampus;
	}
	public String getFechaVencCampus() {
		return fechaVencCampus;
	}
	public void setFechaVencCampus(String fechaVencCampus) {
		this.fechaVencCampus = fechaVencCampus;
	}
	
	public boolean getConfigHorario() {
		return configHorario;
	}
	public void setConfigHorario(boolean configHorario) {
		this.configHorario = configHorario;
	}

	public String getFechaDeMovimiento() {
		return fechaDeMovimiento;
	}
	public void setFechaDeMovimiento(String fechaDeMovimiento) {
		this.fechaDeMovimiento = fechaDeMovimiento;
	}
	

}
