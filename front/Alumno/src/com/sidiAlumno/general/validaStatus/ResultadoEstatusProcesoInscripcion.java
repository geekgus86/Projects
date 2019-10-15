package com.sidiAlumno.general.validaStatus;

public class ResultadoEstatusProcesoInscripcion {

	public static final String C_ESTATUS_PROCESO_INSCRIPCION_SELECCION_DE_PERIODO    = "0";
	public static final String C_ESTATUS_PROCESO_INSCRIPCION_CONTESTAR_ENCUESTA      = "1";
	public static final String C_ESTATUS_PROCESO_INSCRIPCION_SELECCION_DE_HORARIO    = "2";
	public static final String C_ESTATUS_PROCESO_INSCRIPCION_CONFIRMACION_DE_HORARIO = "3";
	public static final String C_ESTATUS_PROCESO_INSCRIPCION_INFORMACION_DE_BECAS    = "4";
	public static final String C_ESTATUS_PROCESO_INSCRIPCION_BOLETA_DE_PAGO          = "5";
	public static final String C_ESTATUS_PROCESO_INSCRIPCION_CONFIRMACION_DE_INSCRIPCION = "6";
	
	public static final String C_ESTATUS_PROCESO_INSCRIPCION_NO_TIENE_ESTATUS = "0"; //Caso a plantear "99";
	
	public static final String C_ESTATUS_PROCESO_INSCRIPCION_ERROR = "-1";
	
	public static final String C_ESTATUS_PROCESO_INSCRIPCION_INDEFINIDO = "100";
	
	public static final String C_ESTATUS_PROCESO_INSCRIPCION_MSG_EXITOSO = "Operacion exitosa";
	public static final String C_ESTATUS_PROCESO_INSCRIPCION_MSG_ERROR = "Operacion con error";
	
	private String estatusProcesoInscripcion;
	private String descripcionEstatusProcesoInscripcion;
	
	public ResultadoEstatusProcesoInscripcion() {
		inicializa();
	}
	
	private void inicializa() {
		estatusProcesoInscripcion = C_ESTATUS_PROCESO_INSCRIPCION_INDEFINIDO;
		descripcionEstatusProcesoInscripcion = "";		
	}

	public String getEstatusProcesoInscripcion() {
		return estatusProcesoInscripcion;
	}

	public void setEstatusProcesoInscripcion(String estatusProcesoInscripcion) {
		this.estatusProcesoInscripcion = estatusProcesoInscripcion;
	}

	public String getDescripcionEstatusProcesoInscripcion() {
		return descripcionEstatusProcesoInscripcion;
	}

	public void setDescripcionEstatusProcesoInscripcion(
			String descripcionEstatusProcesoInscripcion) {
		this.descripcionEstatusProcesoInscripcion = descripcionEstatusProcesoInscripcion;
	}
	
}
