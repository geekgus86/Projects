package com.sidiAlumno.general;

public class Alumno {
		
	private String aPaterno;
	private String aMaterno;
	private String nombre;
	private String campus;
	private String matricula;
	private String cod_campus;
	private String carrera;
	private String pidem;
	private String periodo;
	private String periodoDesc;
	private String cod_adminision;
	private String cod_carrera;
	private String fechaNacimiento;
	private String password;
	private String concentracion;
	private String modalidad;
	private String cod_nivel;
	private String tipoAlumno;
	private String inmendiato;
	private String lejano;
	private String correo;
	private boolean etapa_inscripcion;
	private boolean inscrito_en_Banner;
	
	/*
	 * Indicadores del avance en el proceso de inscripción
	 */
	private int estatusPasosPrevios = 1;
	private int estatusHorario = 1;
	private int estatusBoletaPago = 0;
	private int estatusConfirmaInscr = 0;
	
	public String getCod_campus() {
		return cod_campus;
	}
	public void setCod_campus(String cod_campus) {
		this.cod_campus = cod_campus;
	}
	public String getaPaterno() {
		return aPaterno;
	}
	public void setaPaterno(String aPaterno) {
		this.aPaterno = aPaterno;
	}
	public String getaMaterno() {
		return aMaterno;
	}
	public void setaMaterno(String aMaterno) {
		this.aMaterno = aMaterno;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getCampus() {
		return campus;
	}
	public void setCampus(String campus) {
		this.campus = campus;
	}
	public String getMatricula() {
		return matricula;
	}
	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}
	public String getCarrera() {
		return carrera;
	}
	public void setCarrera(String carrera) {
		this.carrera = carrera;
	}
	public String getPidem() {
		return pidem;
	}
	public void setPidem(String pidem) {
		this.pidem = pidem;
	}
	public String getPeriodo() {
		return periodo;
	}
	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}
	public String getCod_adminision() {
		return cod_adminision;
	}
	public void setCod_adminision(String cod_adminision) {
		this.cod_adminision = cod_adminision;
	}
	public String getCod_carrera() {
		return cod_carrera;
	}
	public void setCod_carrera(String cod_carrera) {
		this.cod_carrera = cod_carrera;
	}
	public String getFechaNacimiento() {
		return fechaNacimiento;
	}
	public void setFechaNacimiento(String fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getConcentracion() {
		return concentracion;
	}
	public void setConcentracion(String concentracion) {
		this.concentracion = concentracion;
	}
	public String getModalidad() {
		return modalidad;
	}
	public void setModalidad(String modalidad) {
		this.modalidad = modalidad;
	}
	public int getEstatusHorario() {
		return estatusHorario;
	}
	public void setEstatusHorario(int estatusHorario) {
		this.estatusHorario = estatusHorario;
	}
	public int getEstatusBoletaPago() {
		return estatusBoletaPago;
	}
	public void setEstatusBoletaPago(int estatusBoletaPago) {
		this.estatusBoletaPago = estatusBoletaPago;
	}
	public int getEstatusConfirmaInscr() {
		return estatusConfirmaInscr;
	}
	public void setEstatusConfirmaInscr(int estatusconfirmaInscr) {
		this.estatusConfirmaInscr = estatusconfirmaInscr;
	}
	public int getEstatusPasosPrevios() {
		return estatusPasosPrevios;
	}
	public void setEstatusPasosPrevios(int estatusPasosPrevios) {
		this.estatusPasosPrevios = estatusPasosPrevios;
	}
	public String getCod_nivel() {
		return cod_nivel;
	}
	public void setCod_nivel(String cod_nivel) {
		this.cod_nivel = cod_nivel;
	}
	public String getTipoAlumno() {
		return tipoAlumno;
	}
	public void setTipoAlumno(String tipoAlumno) {
		this.tipoAlumno = tipoAlumno;
	}
	public String getInmendiato() {
		return inmendiato;
	}
	public void setInmendiato(String inmendiato) {
		this.inmendiato = inmendiato;
	}
	public String getLejano() {
		return lejano;
	}
	public void setLejano(String lejano) {
		this.lejano = lejano;
	}
	public String getCorreo() {
		return correo;
	}
	public void setCorreo(String correo) {
		this.correo = correo;
	}
	public String getPeriodoDesc() {
		return periodoDesc;
	}
	public void setPeriodoDesc(String periodoDesc) {
		this.periodoDesc = periodoDesc;
	}
	public boolean getEtapa_inscripcion() {
		return etapa_inscripcion;
	}
	public void setEtapa_inscripcion(boolean etapa_inscripcion) {
		this.etapa_inscripcion = etapa_inscripcion;
	}
	public boolean getInscrito_en_Banner() {
		return inscrito_en_Banner;
	}
	public void setInscrito_en_Banner(boolean inscrito_en_Banner) {
		this.inscrito_en_Banner = inscrito_en_Banner;
	}

}
