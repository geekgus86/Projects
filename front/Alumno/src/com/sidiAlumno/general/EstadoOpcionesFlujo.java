package com.sidiAlumno.general;

public enum EstadoOpcionesFlujo {
	ESTADO_DEFAULT(true,true,true,true, true),
	ESTADO_PAGO_ANTICIPO(false,true,true,true, true),
	ESTADO_PAGO_ANTICIPO_PAGAR(false,true,true,true, true),
	ESTADO_HORARIO(true,true,true,true, true),
	ESTADO_MENU_BOLETA(true,true,true,true, true),
	ESTADO_CONSULTA_INSCRIPCION(true,true,true,true, true);
	
	private boolean activoMenu;
	private boolean activoPrevios;
	private boolean activoHorario;
	private boolean activoBoleta;
	private boolean activoConsulta;
	private boolean activoRegreso;
	
	public boolean isActivoMenu() {
		return activoMenu;
	}

	public void setActivoMenu(boolean activoMenu) {
		this.activoMenu = activoMenu;
	}

	public boolean isActivoPrevios() {
		return activoPrevios;
	}

	public void setActivoPrevios(boolean activoPrevios) {
		this.activoPrevios = activoPrevios;
	}

	public boolean isActivoHorario() {
		return activoHorario;
	}

	public void setActivoHorario(boolean activoHorario) {
		this.activoHorario = activoHorario;
	}

	public boolean isActivoBoleta() {
		return activoBoleta;
	}

	public void setActivoBoleta(boolean activoBoleta) {
		this.activoBoleta = activoBoleta;
	}

	public boolean isActivoConsulta() {
		return activoConsulta;
	}

	public void setActivoConsulta(boolean activoConsulta) {
		this.activoConsulta = activoConsulta;
	}

	
	
	public static String PAGO_ANTICIPO = "pago_anticipado";
	public static String PAGO_ANTICIPO_PAGAR = "pago_anticipado_pagar";
	public static String HORARIO = "horario";
	public static String MENU_BOLETA = "menu_boleta";
	public static String CONSULTA_INSCRIPCION = "consulta_inscripcion";
	public static String DEFAULT = "default";
	
	private EstadoOpcionesFlujo(boolean activoMenu,boolean activoPrevios,boolean activoHorario,boolean activoBoleta,boolean activoConsulta) {
		this.activoMenu = activoMenu;
		this.activoPrevios = activoPrevios;
		this.activoHorario = activoHorario;
		this.activoBoleta = activoBoleta;
		this.activoConsulta = activoConsulta;
	}
	
	public static EstadoOpcionesFlujo getEstadoOpcionesFlujo(String pagina) {
		if(pagina.equals(PAGO_ANTICIPO)){
			return ESTADO_PAGO_ANTICIPO;
		}
		if(pagina.equals(PAGO_ANTICIPO_PAGAR)){
			return ESTADO_PAGO_ANTICIPO_PAGAR;
		}
		if(pagina.equals(HORARIO)){
			return ESTADO_HORARIO;
		}
		if(pagina.equals(MENU_BOLETA)){
			return ESTADO_MENU_BOLETA;
		}
		if(pagina.equals(CONSULTA_INSCRIPCION)){
			return ESTADO_CONSULTA_INSCRIPCION;
		}
		if(pagina.equals(DEFAULT)){
			return ESTADO_DEFAULT;
		}
		return ESTADO_DEFAULT;
	}

	public boolean isActivoRegreso() {
		return activoRegreso;
	}

	public void setActivoRegreso(boolean activoRegreso) {
		this.activoRegreso = activoRegreso;
	}
	
}
