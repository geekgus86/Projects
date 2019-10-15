package com.sidiAlumno.general;

public class Archivo {
	
	private String codigoCampus;
	private String codigoNivel;
	private String periodo;
	private String matricula;
	private String nombre;
	private int numRegistro = 0;
	
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
	public String getMatricula() {
		return matricula;
	}
	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public int getNumRegistro() {
		return numRegistro;
	}
	public void setNumRegistro(int numRegistro) {
		this.numRegistro = numRegistro;
	}
	public String getCodigoNivel() {
		return codigoNivel;
	}
	public void setCodigoNivel(String codigoNivel) {
		this.codigoNivel = codigoNivel;
	}
	

}
