package com.sidiAlumno.general.validaStatus;

public class ResultadoValidaHold {
	
	public static final String C_IND_BLOQUEADO = "Y";
	public static final String C_IND_NO_BLOQUEADO = "N";
	
	public static final String C_RESULTADO_VALIDA_HOLD_MSG_EXITOSO = "Operacion exitosa";
	public static final String C_RESULTADO_VALIDA_HOLD_MSG_ERROR   = "Operacion con error";
	
	private String codigoHold;
	private String DescripcionHold;
	
	private String fechaInicioValidezHold;
	private String fechaFinValidezHold;
	private String indicadorHoldRegistrado;
	
	public static final int C_RESULTADO_OPERACION_VALIDA_HOLD_EXITOSA = 1;
	public static final int C_RESULTADO_OPERACION_VALIDA_HOLD_ERROR = 0;
	public static final int C_RESULTADO_OPERACION_VALIDA_HOLD_INDEFINIDO = 2;
	
	private String descripcionResultadoValidarHold;
	private int estatusValidaHOld;
	
	public ResultadoValidaHold() {
		inicializa();
	}
	
	public int getEstatusValidaHOld() {
		return estatusValidaHOld;
	}



	public void setEstatusValidaHOld(int estatusValidaHOld) {
		this.estatusValidaHOld = estatusValidaHOld;
	}



	public String getDescripcionResultadoValidarHold() {
		return descripcionResultadoValidarHold;
	}

	public void setDescripcionResultadoValidarHold(
			String descripcionResultadoValidarHold) {
		this.descripcionResultadoValidarHold = descripcionResultadoValidarHold;
	}



	private void inicializa() {
		codigoHold = "";
		DescripcionHold = "";
		fechaInicioValidezHold = null;
		fechaFinValidezHold = null;
		indicadorHoldRegistrado = C_IND_NO_BLOQUEADO;
		estatusValidaHOld = C_RESULTADO_OPERACION_VALIDA_HOLD_INDEFINIDO;
	}

	public String getCodigoHold() {
		return codigoHold;
	}

	public void setCodigoHold(String codigoHold) {
		this.codigoHold = codigoHold;
	}

	public String getDescripcionHold() {
		return DescripcionHold;
	}

	public void setDescripcionHold(String descripcionHold) {
		DescripcionHold = descripcionHold;
	}

	public String getFechaInicioValidezHold() {
		return fechaInicioValidezHold;
	}

	public void setFechaInicioValidezHold(String fechaInicioValidezHold) {
		this.fechaInicioValidezHold = fechaInicioValidezHold;
	}

	public String getFechaFinValidezHold() {
		return fechaFinValidezHold;
	}

	public void setFechaFinValidezHold(String fechaFinValidezHold) {
		this.fechaFinValidezHold = fechaFinValidezHold;
	}

	public String getIndicadorHoldRegistrado() {
		return indicadorHoldRegistrado;
	}

	public void setIndicadorHoldRegistrado(String indicadorHoldRegistrado) {
		this.indicadorHoldRegistrado = indicadorHoldRegistrado;
	}
}
