/**
 * 
 */
package com.sidiAlumno.general;

import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;

/**
 * @author Aram
 * 
 */
public class DatosConfSiDIDAO {

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
	public DatosConfSiDIBean obtenDatosConfiguracion(String codigoCampus,
			String periodo, Connection conexion) {
		DatosConfSiDIBean datosConf = null;
		String query = "SELECT " + ColumnNamesDatosConfSiDI.ALIAS_COLUMNAS
				+ " FROM " + TableNamesSiDI.DATOS_CONF_SIDI + " WHERE "
				+ ColumnNamesDatosConfSiDI.CODIGO_CAMPUS + "=? AND "
				+ ColumnNamesDatosConfSiDI.PERIODO + "=?";
		Object[] parametros = new Object[] { codigoCampus, periodo };
		QueryRunner run = new QueryRunner();
		try {
			datosConf = (DatosConfSiDIBean) run.query(conexion, query,
					parametros, new BeanHandler(DatosConfSiDIBean.class));
		} catch (SQLException e) {
			String mensajeError = "Ocurrió un error al obtener los datos de "
					+ "configuración del campus '" + codigoCampus
					+ "' en el periodo " + periodo + ", conexion: " + conexion
					+ ", " + e.getMessage();
			System.err.println(mensajeError);
		} finally {
		}
		return datosConf;
	}

	/**
	 * Actualiza la clave de los códigos de admisión de excepción en la base de
	 * datos
	 * 
	 * @param datosConfSiDIBean
	 *            Instancia de los datos de configuración que contiene la clave
	 *            de códigos de admisión de excepción que se actualizará en la
	 *            base de datos
	 */
	public void actualizaCodigosAdmisionExcepcion(
			DatosConfSiDIBean datosConfSiDIBean, Connection conexion) {
		int claveCodigosAdmisionExcepcion = datosConfSiDIBean
				.getClaveCodigosAdmisionExcepcion();
		String codigoCampus = datosConfSiDIBean.getCodigoCampus();
		String periodo = datosConfSiDIBean.getPeriodo();
		String query = "UPDATE " + TableNamesSiDI.DATOS_CONF_SIDI + " SET "
				+ ColumnNamesDatosConfSiDI.CLAVE_CODIGOS_ADMISION_EXCEPCION
				+ "=? WHERE " + ColumnNamesDatosConfSiDI.CODIGO_CAMPUS
				+ "=? AND " + ColumnNamesDatosConfSiDI.PERIODO + "=?";
		Object[] parametros = new Object[] { claveCodigosAdmisionExcepcion,
				codigoCampus, periodo };
		QueryRunner run = new QueryRunner();
		try {
			run.update(conexion, query, parametros);
			conexion.commit();
		} catch (SQLException e) {
			String mensajeError = "Ocurrió un error al actualizar la clave de "
					+ "los códigos de admisión de excepción en los datos de "
					+ "configuración del campus '" + codigoCampus
					+ "' en el periodo " + periodo + ", conexion: " + conexion
					+ ", " + e.getMessage();
			System.err.println(mensajeError);
		} finally {
		}
	}

}
