/**
 * 
 */
package com.sidiAlumno.general;

/**
 * Nombres de las columnas de la tabla 'DATOS_CONF_SIDI' en la base de datos de
 * SIDI. Cuando se modifica el nombre de una columna, simplemente se debe
 * modificar los mapeos de las constantes que hacen referencia a los nombres de
 * las columnas en lugar de realizar la actualización en todos los queries. El
 * primer string representa el nombre de la columna tal y como aparece en la
 * base de datos. El segundo string representa el mapeo a las propiedades del
 * bean DatosConfSiDiBean (alias).
 * 
 * @author Aram
 * 
 */
public class ColumnNamesDatosConfSiDI {

	/**
	 * Alias de todas las columnas
	 */
	public static final String ALIAS_COLUMNAS;

	public static final String CLAVE_CODIGOS_ADMISION_EXCEPCION = "codigo_admision_no_nds";

	public static final String CLAVE_CODIGOS_ADMISION_EXCEPCION_ALIAS = "claveCodigosAdmisionExcepcion";

	public static final String CODIGO_CAMPUS = "codigo_campus";

	public static final String CODIGO_CAMPUS_ALIAS = "codigoCampus";

	public static final String PERIODO = "periodo";

	public static final String PERIODO_ALIAS = "periodo";

	static {
		ALIAS_COLUMNAS = CLAVE_CODIGOS_ADMISION_EXCEPCION + " "
				+ CLAVE_CODIGOS_ADMISION_EXCEPCION_ALIAS + ", " + CODIGO_CAMPUS
				+ " " + CODIGO_CAMPUS_ALIAS + ", " + PERIODO + " "
				+ PERIODO_ALIAS;
	}

}
