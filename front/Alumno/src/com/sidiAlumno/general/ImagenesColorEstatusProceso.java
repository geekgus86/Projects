package com.sidiAlumno.general;


public enum ImagenesColorEstatusProceso {
	
	PASOS_PREVIOS_INACTIVO("statusActPrev_inac.png", "#A9A9A9", true),
	PASOS_PREVIOS_ACTIVO("statusActPrev_inac.png", "#428BCA", false),
	PASOS_PREVIOS_LISTO("statusActPrev_ok.png", "#428BCA", false),
	PASOS_PREVIOS_ERROR("statusActPrev_err.png", "#A9A9A9", true),
	HORARIO_INACTIVO("statusSelHorario_inac.png", "#A9A9A9", true),
	HORARIO_ACTIVO("statusSelHorario_inac.png", "#428BCA", false),
	HORARIO_LISTO("statusSelHorario_ok.png", "#428BCA", false),
	HORARIO_ERROR("statusSelHorario_err.png", "#A9A9A9", true),
	BOLETA_PAGO_INACTIVO("statusBolPago_inac.png", "#A9A9A9", true),
	BOLETA_PAGO_ACTIVO("statusBolPago_inac.png", "#428BCA", false),
	BOLETA_PAGO_LISTO("statusBolPago_ok.png", "#428BCA", false),
	BOLETA_PAGO_ERROR("statusBolPago_err.png", "#A9A9A9", true),
	CONSULTA_INSCRIPCION_INACTIVO("statusConfInsc_inac.png", "#A9A9A9", true),
	CONSULTA_INSCRIPCION_ACTIVO("statusConfInsc_inac.png", "#428BCA", false),
	CONSULTA_INSCRIPCION_LISTO("statusConfInsc_ok.png", "##428BCA", false),
	CONSULTA_INSCRIPCION_ERROR("statusConfInsc_err.png", "#A9A9A9", true);

	private String imagen;
	private String color;
	private boolean disabled;
	
	private ImagenesColorEstatusProceso(String imagen, String color, boolean activo) {
		this.imagen = imagen;
		this.setDisabled(activo);
		this.color = color;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public boolean isDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

	public static ImagenesColorEstatusProceso getConfigActPrevias(Alumno alumno) {
		
		if(alumno.getEstatusPasosPrevios() == ConstantesSiDI.ESTATUS_INACTIVO) {
			return PASOS_PREVIOS_INACTIVO;
		}
		
		if(alumno.getEstatusPasosPrevios() == ConstantesSiDI.ESTATUS_ACTIVO) {
			return PASOS_PREVIOS_ACTIVO;
		}
		
		if(alumno.getEstatusPasosPrevios() == ConstantesSiDI.ESTATUS_LISTO) {
			return PASOS_PREVIOS_LISTO;
		}
		
		return PASOS_PREVIOS_ERROR;
	}

	public static ImagenesColorEstatusProceso getConfigHorario(Alumno alumno) {
		
		if(alumno.getEstatusHorario() == ConstantesSiDI.ESTATUS_INACTIVO) {
			return HORARIO_INACTIVO;
		}
		
		if(alumno.getEstatusHorario() == ConstantesSiDI.ESTATUS_ACTIVO) {
			return HORARIO_ACTIVO;
		}
		
		if(alumno.getEstatusHorario() == ConstantesSiDI.ESTATUS_LISTO) {
			return HORARIO_LISTO;
		}
		
		return HORARIO_ERROR;
	}

	public static ImagenesColorEstatusProceso getConfigBoletaPago(Alumno alumno) {
		
		if(alumno.getEstatusBoletaPago() == ConstantesSiDI.ESTATUS_INACTIVO) {
			return BOLETA_PAGO_INACTIVO;
		}
		
		if(alumno.getEstatusBoletaPago() == ConstantesSiDI.ESTATUS_ACTIVO) {
			return BOLETA_PAGO_ACTIVO;
		}
		
		if(alumno.getEstatusBoletaPago() == ConstantesSiDI.ESTATUS_LISTO) {
			return BOLETA_PAGO_LISTO;
		}
		
		return BOLETA_PAGO_ERROR;
	}

	public static ImagenesColorEstatusProceso getConfigConsultaInsc(Alumno alumno) {
		
		if(alumno.getEstatusConfirmaInscr() == ConstantesSiDI.ESTATUS_INACTIVO) {
			return CONSULTA_INSCRIPCION_INACTIVO;
		}
		
		if(alumno.getEstatusConfirmaInscr() == ConstantesSiDI.ESTATUS_ACTIVO) {
			return CONSULTA_INSCRIPCION_ACTIVO;
		}
		
		if(alumno.getEstatusConfirmaInscr() == ConstantesSiDI.ESTATUS_LISTO) {
			return CONSULTA_INSCRIPCION_LISTO;
		}
		
		return CONSULTA_INSCRIPCION_ERROR;
	}
}
