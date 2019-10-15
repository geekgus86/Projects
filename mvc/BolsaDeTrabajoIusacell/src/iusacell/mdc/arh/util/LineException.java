package iusacell.mdc.arh.util;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.SQLException;

/**
 * @author Gustavo Gonzalez Esquivel 
 * 
 */
public class LineException {

	/**
	 * @param e Exception para construir mensaje
	 * @param o	Objeto que llama la Exception
	 * @return	Mensaje para Log4j
	 */
	public static String getMensaje(Exception e, Object o) {

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		PrintStream ps = new PrintStream(baos);
		e.printStackTrace(ps);
		String strExcepcion = baos.toString();
		String strClase = o.toString();
		strClase = strClase.substring(strClase.lastIndexOf('.') + 1) + ".java";
		if (strClase.indexOf(' ') != -1)
			strClase = strClase.substring(strClase.lastIndexOf(' ') + 1);
		strExcepcion = strExcepcion.substring(strExcepcion.indexOf(strClase) + strClase.length() + 1);
		strExcepcion = strExcepcion.substring(0, strExcepcion.indexOf(')'));
		if (e instanceof SQLException) {
			SQLException dbe = (SQLException)e;
			return "Mensaje SQL: "
				+ dbe.getMessage()
				+ "  SQLState: "
				+ dbe.getSQLState()
				+ "  Error Code:"
				+ dbe.getErrorCode()
				+ " Linea: "
				+ strExcepcion;
		} else
			return e.getMessage() + " Linea: " + strExcepcion;
	}
	
	public static final String getException(Exception exception) {
        StringWriter writer = new StringWriter();
        PrintWriter printer = new PrintWriter(writer);
        exception.printStackTrace(printer);
        return writer.getBuffer().toString();
    }

}
