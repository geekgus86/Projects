package com.sidiAlumno.general;

public class PeriodoServicio {
	
	private String periodo;
	private String codigo_campus;
	private int clave_periodo_servicio;
	private String estatus;
	private String f_fecha_de_movimiento;
	public String getPeriodo() {
		return periodo;
	}
	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}
	public String getCodigo_campus() {
		return codigo_campus;
	}
	public void setCodigo_campus(String codigo_campus) {
		this.codigo_campus = codigo_campus;
	}
	public int getClave_periodo_servicio() {
		return clave_periodo_servicio;
	}
	public void setClave_periodo_servicio(int clave_periodo_servicio) {
		this.clave_periodo_servicio = clave_periodo_servicio;
	}
	public String getEstatus() {
		return estatus;
	}
	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}
	public String getF_fecha_de_movimiento() {
		return f_fecha_de_movimiento;
	}
	public void setF_fecha_de_movimiento(String f_fecha_de_movimiento) {
		this.f_fecha_de_movimiento = f_fecha_de_movimiento;
	}
	

}
