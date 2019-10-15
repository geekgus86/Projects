package flujo.beans;


public class TurnoInscripcion {
	
//	public TurnoInscripcion() {
//
//		Connection conexion = null;
//		PreparedStatement prepEnunciado = null;
//		ResultSet resultado = null;
//		String strSQL = "";
//		String strHorario = "Sin horario de selección de servicios \n";
//		// Perfil perfil = (Perfil)sesion.getAttribute(valSesPERFIL);
//
//		if (unaConfRegAdm == null) {
//			return "<h3>" + numAplSeleccionGrupos + "-104" + ConstantesSiDI.ERR
//					+ "|Error al obtener configuraci&oacute;n</H3>";
//		}
//
//		String strCampus = (String) sesion.getAttribute(valSesCODIGOCAMPUS);
//		String strPeriodo = (String) sesion.getAttribute(valSesPERIODO);
//
//		// AlumnoPassword alPwd = (AlumnoPassword)
//		// sesion.getAttribute(valSesALUMNOPASSWORD);
//		AlumnoPassword alPwd = (AlumnoPassword) sesion
//				.getAttribute(valSesServALUMNOPASS);
//
//		strSQL = "select TO_CHAR(F_TURNO_SERVICIO, 'DD\"/\"MM\"/\"YYYY \"a las\" HH24:MI \"horas\"') AS turnoServicios from TURNOS_ALUMNO "
//				+ " where MATRICULA=? "
//				+ " and CODIGO_CAMPUS=? "
//				+ " and PERIODO=? ";
//
//		try {
//			conexion = pool.obtainConnection(this);
//			prepEnunciado = conexion.prepareStatement(strSQL);
//			prepEnunciado.setString(1, alPwd.matricula);
//			prepEnunciado.setString(2, strCampus);
//			prepEnunciado.setString(3, strPeriodo);
//
//			resultado = prepEnunciado.executeQuery();
//			String esteMomento = (new SimpleDateFormat(
//					"'Actualmente son las' HH:mm 'horas del' dd'/'M'/' yyyy"))
//					.format(Calendar.getInstance().getTime());
//
//			if (resultado.next()) {
//				strHorario = "<H3>Turno asignado</H3><BR> \n"
//						+ "<MENU> \n"
//						+ "<LI><B>"
//						+ (resultado.getString("turnoServicios") == null ? "Sin turno"
//								: resultado.getString("turnoServicios"))
//						+ "</B> \n" + "</MENU> \n" + "<BR> \n" + "<B>"
//						+ esteMomento + "</B> \n";
//				resultado.close();
//			}
//		} catch (SQLException sqle) {
//			System.err.println("-|101" + ConstantesSiDI.ERR
//					+ "| Error al obtener horario de servicios");
//
//			return numAplSeleccionServicio + "-|101" + ConstantesSiDI.ERR
//					+ "| Error al obtener horarios";
//		} finally {
//			try {
//				if (resultado != null) {
//					resultado.close();
//				}
//			} catch (Exception e) {
//				System.out
//						.println(Fecha.obtenFecha()
//								+ " Error al cerrar resultset al obtener obtener horario de servicios, campus: "
//								+ strCampus + ", periodo: " + strPeriodo
//								+ ", matricula: " + alPwd.matricula + "  " + e);
//			}
//
//			try {
//				if (prepEnunciado != null) {
//					prepEnunciado.close();
//				}
//			} catch (Exception e) {
//				System.out
//						.println(Fecha.obtenFecha()
//								+ " Error al cerrar prepStatement al obtener obtener horario de servicios, campus: "
//								+ strCampus + ", periodo: " + strPeriodo
//								+ ", matricula: " + alPwd.matricula + "  " + e);
//			}
//
//			LlamadasBDComunes.pool.dropConnection(this, conexion);
//		}
//
//		return strHorario;
//	
//	}

}
