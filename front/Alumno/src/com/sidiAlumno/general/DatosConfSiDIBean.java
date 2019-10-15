/**
 * 
 */
package com.sidiAlumno.general;

import java.sql.Connection;

import com.sidiAlumno.sesion.ManagerConections;

/**
 * 
 * Representa un registro de la tabla DATOS_CONF_SIDI. Se pueden aumentar
 * variables de instancia compatibles con el estándar JavaBean cuando se
 * requiera
 * 
 * @author Aram
 * 
 */
public class DatosConfSiDIBean {
	/**
	 * Indica que no existen códigos de admisión de excepción que autenticarán
	 * con el método SiDI
	 */
	public static final int SIN_EXCEPCIONES = 0;

	/**
	 * Número que indica cuáles códigos de admisión autenticarán con el método
	 * SiDI. <br>
	 * 0 – ‘Sin excepción’ <br>
	 * 1 - ‘PIS autenticarán por el método SiDI’ <br>
	 * 2 - ‘PI autenticarán por el método SiDI’ <br>
	 * 3 - ‘RCR autenticarán por el método SiDI’ <br>
	 * 4 - ‘PIS y PI autenticarán por el método SiDI’ <br>
	 * 5 - ‘PIS y RCR autenticarán por el método SiDI’ <br>
	 * 6 - ‘PI y RCR autenticarán por el método SiDI’ <br>
	 * 7 - ‘PIS, PI y RCR autenticarán por el método SiDI’ <br>
	 */
	private int claveCodigosAdmisionExcepcion;

	/**
	 * Código del campus representado en la configuración
	 */
	private String codigoCampus;

	/**
	 * Periodo representado en la configuración
	 */
	private String periodo;

	/**
	 * Obtiene los datos de configuración para el campus y periodo indicados
	 * 
	 * @param codigoCampus
	 *            Código del campus del cuál se desea obtener los datos de
	 *            configuración
	 * @param periodo
	 *            Periodo del cuál se desea obtener los datos de configuración
	 * @return Los datos de configuración encontrados o null si no existe un
	 *         registro para el campus y periodo indicados.
	 */
	public static DatosConfSiDIBean obtenDatosConfiguracion(
			String codigoCampus, String periodo) {
		DatosConfSiDIDAO datosConfDAO = new DatosConfSiDIDAO();
		
		Connection connection = ManagerConections.getSidiConection();
		
		return datosConfDAO.obtenDatosConfiguracion(codigoCampus, periodo, connection);
	}

	/**
	 * @return the claveCodigosAdmisionExcepcion
	 */
	public int getClaveCodigosAdmisionExcepcion() {
		return claveCodigosAdmisionExcepcion;
	}

	/**
	 * @return the codigoCampus
	 */
	public String getCodigoCampus() {
		return codigoCampus;
	}

	/**
	 * Genera un String describiendo cuáles códigos de admisión autenticarán con
	 * el método SiDI de acuerdo el código de excepción
	 * (excepcionesCodigoAdmision). <br>
	 * 0 – ‘Sin excepción’ <br>
	 * 1 - ‘PIS autenticarán por el método SiDI’ <br>
	 * 2 - ‘PI autenticarán por el método SiDI’ <br>
	 * 3 - ‘RCR autenticarán por el método SiDI’ <br>
	 * 4 - ‘PIS y PI autenticarán por el método SiDI’ <br>
	 * 5 - ‘PIS y RCR autenticarán por el método SiDI’ <br>
	 * 6 - ‘PI y RCR autenticarán por el método SiDI’ <br>
	 * 7 - ‘PIS, PI y RCR autenticarán por el método SiDI’ <br>
	 * 
	 * @return La descripción de los códigos de admisión de excepción de acuerdo
	 *         a la clave
	 * 
	 */
	public String getDescripcionExcepcionesCodigoAdmision() {
		String descripcion = "";
		switch (getClaveCodigosAdmisionExcepcion()) {
		case 0:
			/* Sin excepción */
			descripcion = "Sin excepciones";
			break;
		case 1:
			/* PIS */
			descripcion = "PIS";
			break;
		case 2:
			/* PI */
			descripcion = "PI";
			break;
		case 3:
			/* PCR */
			descripcion = "RCR";
			break;
		case 4:
			/* PIS Y PI */
			descripcion = "PIS y PI";
			break;
		case 5:
			/* PIS Y RCR */
			descripcion = "PIS y RCR";
			break;
		case 6:
			/* PI Y RCR */
			descripcion = "PI y RCR";
			break;
		case 7:
			/* PIS, PI y RCR */
			descripcion = "PIS, PI y RCR";
			break;
		}
		return descripcion;
	}

	/**
	 * @return the periodo
	 */
	public String getPeriodo() {
		return periodo;
	}

	/**
	 * @param claveCodigosAdmisionExcepcion
	 *            the claveCodigosAdmisionExcepcion to set
	 */
	public void setClaveCodigosAdmisionExcepcion(
			int claveCodigosAdmisionExcepcion) {
		this.claveCodigosAdmisionExcepcion = claveCodigosAdmisionExcepcion;
	}

	/**
	 * @param codigoCampus
	 *            the codigoCampus to set
	 */
	public void setCodigoCampus(String codigoCampus) {
		this.codigoCampus = codigoCampus;
	}

	/**
	 * @param periodo
	 *            the periodo to set
	 */
	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	/**
	 * Actualiza la clave de los códigos de admisión de excepción en la base de
	 * datos
	 */
	public void actualizaCodigosAdmisionExcepcion() {
		DatosConfSiDIDAO datosConfDAO = new DatosConfSiDIDAO();
		
		Connection connection = ManagerConections.getSidiConection();
		
		datosConfDAO.actualizaCodigosAdmisionExcepcion(this, connection);
		
	}
}
