package resources;

import java.sql.Connection;
import java.sql.SQLException;
import java.text.DateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;

import com.sidiAlumno.sesion.ManagerConections;
/**
 * Utilerías varias.
 * Creation date: (12/09/2000 12:27:30 p.m.)
 * @author: Francisco Cervantes Parra
 */
public class Utilerias {

	/**
	 * Crea un java.util.Date a partir de un java.sql.Date y un java.sql.Time .
	 * Creation date: (10/09/2001 03:18:34 p.m.)
	 * @param date java.sql.Date
	 * @param time java.sql.Time
	 */
	public static Calendar obtenCalendarDesdeBDDateTime(
		java.sql.Date date,
		java.sql.Time time) {
		Calendar cal = new GregorianCalendar(),
			calTime = new GregorianCalendar();
		calTime.setTime(time);
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, calTime.get(calTime.HOUR_OF_DAY));
		cal.set(Calendar.MINUTE, calTime.get(calTime.MINUTE));
		cal.set(Calendar.SECOND, calTime.get(calTime.SECOND));
		return cal;
	}
	/**
	 * Crea un java.util.Date a partir de un java.sql.Date y un java.sql.Time .
	 * Creation date: (10/09/2001 03:18:34 p.m.)
	 * @param date java.sql.Date
	 * @param time java.sql.Time
	 */
	public static java.util.Date obtenDateDesdeBDDateTime(
		java.sql.Date date,
		java.sql.Time time) {
		return obtenCalendarDesdeBDDateTime(date, time).getTime();
	}
	
	/**
	 * Busca la versión del sistema operativo que se está usando y la regresa
	 * Creation date: (08/05/2003 15:35:56)
	 */
	public static String obtenerVersionSO() {
		String texto = "";
		try {
			texto =
				"SO version: "
					+ System.getProperties().get("os.name").toString();
			texto += " "+System.getProperties().get("os.version").toString();
		} catch (Exception e) {
			if (texto.equals(""))
				texto = "Se desconoce la version de SO";
		}
		return texto;
	}

	/**
	 * Busca la versión de jdk que se está usando y la regresa
	 * Creation date: (10/8/2001 9:59:56 AM)
	 */
	public static String obtenerVersionJDK() {
		String texto = "";
		try {
			texto =
				"JDK version: "
					+ System.getProperties().get("java.version").toString();		
		} catch (Exception e) {
			if (texto.equals(""))
				texto = "Se desconoce la version de java";
		}
		return texto;
	}
	
	/**
	 * Busca la versión del driver de JDBC que se está utilizando y la regresa
	 * Creation date: (05/07/2007)
	 * @return Versión del driver de JDBC que se está utilizando.
	 */
	   	
	public static String obtenerVersionDriverBD() {
		String texto = "";
		Connection conexion = null;
		
		try {
			conexion = ManagerConections.getSidiConection();
			java.sql.DatabaseMetaData metadata = conexion.getMetaData();
			texto = "Driver BD: " + metadata.getDriverName()+" version "+metadata.getDriverVersion();
		} catch(Exception e) {
			System.err.println("Ocurrio un error al consultar version del driver de BD: "
					+e);
		} finally {
		}
		
		return texto;
	}

	/**
	 * Regresa la fecha que se le envía en un formato imprimible.
	 * Creation date: (12/09/2000 12:32:10 p.m.)
	 * @return java.lang.String
	 */
	public static String obtenFecha(
		java.util.Date fecha,
		boolean formatoLargo) {
		return (
			DateFormat.getDateTimeInstance(
				(formatoLargo ? DateFormat.FULL : DateFormat.MEDIUM),
				DateFormat.MEDIUM)).format(
			fecha == null ? Calendar.getInstance().getTime() : fecha);
		//	return (new SimpleDateFormat("HH:mm:ss yyyy/MM/dd")).format(Calendar.getInstance().getTime());
	}
	/**
	 * Regresa la fecha del sistema.
	 * Creation date: (12/09/2000 12:32:10 p.m.)
	 * @return java.lang.String
	 */
	public static String obtenFecha(boolean formatoLargo) {
		return obtenFecha(Calendar.getInstance().getTime(), formatoLargo);
	}

	/**
	 * Se toma una expresión regular del tipo \\d{longitud} donde longitud es el tamaño
	 * de la cadena a validar.
	 * Longitud debe estar marcada entre llaves {}. 
	 */
	public static boolean validaCadenaPeriodo(String cadena, String longitud) 
	{
		boolean esValido = false;
		
        if (cadena != null && !cadena.equals("")) 
        {
              if (cadena.matches(longitud)) 
              {                            
            	  esValido= true;
              } 
              else
              {
            	  esValido= false;
              }
        } 
        
        return esValido;
	}
}
