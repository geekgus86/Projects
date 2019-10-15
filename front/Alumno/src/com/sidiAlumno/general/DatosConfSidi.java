package com.sidiAlumno.general;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;
import java.util.Vector;

import resources.Utilerias;
import mx.itesm.fecha.Fecha;
import mx.itesm.fecha.FechaSimple;

import com.sidiAlumno.sesion.ManagerConections;

/* 11-0209a Proyecto 711. MAY11.
 * Llamada a función del paquete_sidi.EXISTE_PERIODO. Se sustituye llamada en checarExiste (ahora en el pkt).
 */

/**
 * Información de periodo <br>
 * datos de configuración de un periodo
 * Creation date: (01/09/2000 11:21:41 a.m.)
 * @author Raúl Luna
 * @author ablack
 * @author Isela Zainos
 * @version AGO13
 * @since 13-0308
 */

public class DatosConfSidi implements java.io.Serializable {

	/**
	 * Requerido para serialización
	 */
	private static final long serialVersionUID = -7799360702106511346L;

	public int resultado;

	public String unPeriodo;

	public String codigoCampus;

	public boolean esUnPeriodoActivo;

	/**
	 * Bandera que no se usa para nada 
	 * */
	public boolean inscribirDiferentesPeriodos; 

	public boolean checarSedes;

	public long tiempoLimiteSesion;

	public boolean esPagoPorUnidades;

	//Se quita, por eliminacion del relay: public String servidorDeCorreo;

	public String emisorCorreoHorario;

	public boolean checarPrioridades12;

	public boolean cupoRebasaCapacidad;

	public boolean enviaCorreoFinSeleccion;

	public boolean permitirActualizarCorreo;
	
	public String descripcionPeriodoBanner;

	/** 
	 * Sólo lectura 
	 * */
	public boolean activaParaRE; 

	public boolean actualizaDatosFijosAlumno;

	public String correoContactoCampus;

	public int cupoLimiteInferior;

	public Date fechaLimInscripcionNueva;

	public Date fechaAuditoriaPago;

	public int movimientoInscripcion;

	public int controlTipoMateria;

	public boolean habilitarAcad;

	public boolean habilitarExtraacad;

	public static char campoMovimientoInscripcion = 'M';

	public static char campoControlTipoMateria = 'C';

	public Date fechaInicioPeriodoServicio;

	public Date fechaFinPeriodoServicio;

	/**
	 * Registro administrativo Inscripción o preinscripción
	 * Se elimina en proyecto 946 AGO13
	 */ 
	/*public String proceso;
	public final static String procesoInscripcion = "I";

	public final static String procesoPreinscripcion = "P";*/

	/**
	 * Registro administrativo
	 * */
	public Date fechaInicioTardias; 
	
	/**
	 * DESCRIPCION_PERIODO en la BD (RRRR)
	 */
	public String descripcionPeriodo;

	/**
	 * Constructor inicializa los valores Creation date: (3/21/2001 9:22:25 PM)
	 */
	public DatosConfSidi() {
		unPeriodo = "";
		codigoCampus = "";
		esUnPeriodoActivo = false;
		inscribirDiferentesPeriodos = false;
		checarSedes = false;
		tiempoLimiteSesion = 1;
		esPagoPorUnidades = false;
		//Se quita, por eliminacion del relay:
		//servidorDeCorreo = "";
		emisorCorreoHorario = "";
		checarPrioridades12 = false;
		cupoRebasaCapacidad = false;
		enviaCorreoFinSeleccion = false;
		permitirActualizarCorreo = false;
		activaParaRE = false;
		actualizaDatosFijosAlumno = true;
		correoContactoCampus = "";
		cupoLimiteInferior = 0;
		fechaLimInscripcionNueva = null;
		fechaAuditoriaPago = null;
		movimientoInscripcion = 0;
		controlTipoMateria = 0;
		habilitarAcad = true;
		habilitarExtraacad = false;
		fechaInicioPeriodoServicio = null;
		fechaFinPeriodoServicio = null;
		//proceso = procesoInscripcion; Se elimina en proyecto 946 AGO13
		fechaInicioTardias = null;
		descripcionPeriodo = "DESCRIPCION";
		descripcionPeriodoBanner="";
	}

	/**
	 * Tiene el orden del borrado de las tablas Creation date: (3/6/2002 1:48:07
	 * PM)
	 * @return No documentado
	 */
	public Vector<String> listarBorrado() {

		Vector<String> vBorra = new Vector<String>();

		/*
		 * Se agregan tablas de proyecto 776 Tienda Virtual TDC
		 * Sergio Arciga 10/Nov/11 
		 */
		vBorra.addElement("TIENDA_OFRECE_CAMPUS");
		vBorra.addElement("TRANSACCION_MOTOR_PAGOS");
		vBorra.addElement("TIENDA_TDC_VALIDACION");
		/*776 Tienda Virtual TDC*/
		
		vBorra.addElement("LOG_PROCESO");	
		vBorra.addElement("LOG_ARCHIVO");	
		vBorra.addElement("CONFIGURACION_SERVICIO_TIPO_AL");
		vBorra.addElement("CONFIGURACION_SERVICIO_NIVEL");
		vBorra.addElement("USUARIO_MODIFICA_TIPO_SERVICIO");
		vBorra.addElement("CUOTA_SERVICIO");
		vBorra.addElement("CONFIGURACION_SERVICIO");
		vBorra.addElement("CONFIGURACION_REGISTRO_ADM");	
		vBorra.addElement("CUOTA_ADELANTO_COLEGIATURA");
		vBorra.addElement("CUOTA_COLEGIATURA");
		vBorra.addElement("FORMA_PAGO_SERVICIO");
		vBorra.addElement("PLAN_ESPECIALIDAD");
		vBorra.addElement("PLAN_PAGO_CAMPUS");
//
		vBorra.addElement("DATOS_INI");
		vBorra.addElement("ARCHIVO");
		vBorra.addElement("ATRIBUTO_COMENTARIO");
		vBorra.addElement("CARTA_RESPONSIVA");
		vBorra.addElement("MOVIMIENTO_REGISTRO_ADM");
		vBorra.addElement("CONGELADO_FORMA_PAGO_ALUMNO");
		vBorra.addElement("CONGELADO_SERVICIO_ALUMNO");
		vBorra.addElement("PLAN_PAGO_ALUMNO");
		vBorra.addElement("SERVICIO_ALUMNO");
		vBorra.addElement("MOVIMIENTO_SERVICIO_ALUMNO");
		vBorra.addElement("FORMA_PAGO_ALUMNO");
		vBorra.addElement("INTERFAZ_TESORERIA");
		vBorra.addElement("TURNOS_ALUMNO");
		vBorra.addElement("ACTIVIDAD_FORMATIVA_ALUMNO");
		vBorra.addElement("REUBICACION");
		vBorra.addElement("LOG_ALUMNO");
		vBorra.addElement("INSCRIPCION_ANTERIOR");
		vBorra.addElement("HISTORIA_ALUMNO");
		vBorra.addElement("PAQUETE_ALUMNO");
		vBorra.addElement("MATERIA_ALUMNO");
		vBorra.addElement("CORREOS_ALUMNO");
		vBorra.addElement("MOVIMIENTO_ASESORIA_ALUMNO");
		vBorra.addElement("CONDICIONES_ASES_AUTOMATICA");
		vBorra.addElement("EXCEPCION_ALUMNO");
		vBorra.addElement("MOTIVO_BAJA_ALUMNO");
		vBorra.addElement("CORTE_REGISTRO_ADM"); // borrado periodos
		vBorra.addElement("FORMA_PAGO_ALUMNO_SAFE"); //borrado periodos
		vBorra.addElement("TUTOR"); // Proy 711 Mejoras y Correcciones
		vBorra.addElement("EXCEPT_ALUMNO"); // Proy cambio de secuencia
		vBorra.addElement("CONGELADO_SECUENCIA_ALUMNO"); // Proy cambio de secuencia
		vBorra.addElement("CONFIGURACION_SECUENCIA"); // Proy cambio de secuencia
		vBorra.addElement("ALUMNO");
		//
		vBorra.addElement("LOG_GRUPO");
		vBorra.addElement("PROFESOR_GRUPO");
		vBorra.addElement("MODALIDAD_GRUPO");
		vBorra.addElement("HORARIO_GRUPO");
		vBorra.addElement("MATERIA_PAQUETE");
		vBorra.addElement("EXCEPT_GRUPOS_POR_MAJOR");
		vBorra.addElement("EXCEPT_GRUPOS_POR_MINOR");
		vBorra.addElement("SESSCODE_GRUPO");
		vBorra.addElement("GRUPO");
		//
		vBorra.addElement("USUARIO_ATRIBUTO");
		vBorra.addElement("USUARIO_MODIFICA_CUPO");
		vBorra.addElement("USUARIO_MODIFICA_ALUMNO");
		vBorra.addElement("USUARIO_ROL");
		vBorra.addElement("USUARIO_SEDE");
		vBorra.addElement("USUARIO");
		//
		vBorra.addElement("ATRIBUTO_ROL");
		vBorra.addElement("ROL");
		vBorra.addElement("PLAN");
		vBorra.addElement("PLAN_ESPECIALIDAD");
		vBorra.addElement("PROFESOR");
		vBorra.addElement("MATERIA_IMPARTE");
		vBorra.addElement("EXCEPT_HORAS");
		vBorra.addElement("EXCEPT_DIF_ENTRE_SEMESTRES");
		// vBorra.addElement("MATERIA_ESPECIALIDAD_CARRERA"); //Ref: carrera,
		// especialidad y materia. Se quitó en ABR06.
		vBorra.addElement("MATERIA_ATRIBUTO");
		vBorra.addElement("REQUISITO_MATERIA_GRUPO");
		
		vBorra.addElement("MATERIA");
		//
		vBorra.addElement("MOTIVO_BAJA");
		vBorra.addElement("LOG_VARIOS");
		
		vBorra.addElement("CONFIGURACION_AREA_E");
		vBorra.addElement("CONFIGURACION");
		vBorra.addElement("DEPARTAMENTO");
		vBorra.addElement("ADMISION");
		vBorra.addElement("EXCEPCION_CARRERA");
		vBorra.addElement("CARRERA");
		vBorra.addElement("DIVISION");
		vBorra.addElement("ESTATUS_ACADEMICO");
		vBorra.addElement("ESPECIALIDAD"); // Ref: datos_generales
		vBorra.addElement("MODALIDAD");
		vBorra.addElement("PAQUETE");
		vBorra.addElement("CONFIGURACION_PREF_E_AREA_E");
		vBorra.addElement("CONFIGURACION_PREFERENCIAS_E");
		vBorra.addElement("NIVEL");
		vBorra.addElement("SEDE");
		vBorra.addElement("TIPO_ESTUDIANTE");
		vBorra.addElement("CORREOS_DIRECTORIO");
		vBorra.addElement("SESION_ALUMNO");
		vBorra.addElement("PLAN_EXTRAACADEMICO");
		vBorra.addElement("CLASIFICACION_EXTRAACADEMICA");
		vBorra.addElement("AREA_EXTRAACADEMICA");
		vBorra.addElement("ADMISION_INSCRITOS");
		vBorra.addElement("LOG_ACCESO_REPORTE_CONDENSADO");
		vBorra.addElement("SESION"); // borrado periodos
		vBorra.addElement("FECHAS_CLASES_CENTRALES"); // borrado periodos
		vBorra.addElement("DATOS_GENERALES");
		vBorra.addElement("DATOS_CONF_SIDI");
		vBorra.addElement("BORRADO_PERIODO"); // borrado periodos
		
		return vBorra;
	}
	
	public static DatosConfSidi obtenDatosConfSidi(
			String codigoCampus,
			String periodo) {

			Connection cnn = null;
			PreparedStatement enunciado = null;
			ResultSet resultado = null;
			
		    java.sql.Date fecha= null;
		    Time tiempo= null;

			String qry =
				"select * from DATOS_CONF_SIDI \n"
					+ "where CODIGO_CAMPUS= ?  and \n"
					+ "      PERIODO =     ?";

			try {
				cnn = ManagerConections.getSidiConection();
				enunciado = cnn.prepareStatement(qry);
				enunciado.setString(1,codigoCampus);
				enunciado.setString(2,periodo);
				resultado = enunciado.executeQuery();

				DatosConfSidi datosConfSidi = new DatosConfSidi();
				if (resultado.next()) {
					datosConfSidi.unPeriodo = resultado.getString("PERIODO");
					datosConfSidi.codigoCampus =
						resultado.getString("CODIGO_CAMPUS");
					datosConfSidi.esUnPeriodoActivo =
						(resultado.getInt("B_PERIODO_ACTIVO") == 1);
					datosConfSidi.checarSedes =
						(resultado.getInt("B_CHECAR_SEDES") == 1);
					datosConfSidi.tiempoLimiteSesion =
						resultado.getLong("TIEMPO_LIMITE_SESION");
					datosConfSidi.esPagoPorUnidades =
						((resultado.getString("tipo_pago")).charAt(0)
							== ConstantesSiDI.PAGO_X_UNIDADES);
					// Se quita, por eliminacion del relay:
					/*datosConfSidi.servidorDeCorreo =
						resultado.getString("SERVIDOR_CORREO");*/
					datosConfSidi.emisorCorreoHorario =
						resultado.getString("EMISOR_CORREO_HORARIO");
					datosConfSidi.checarPrioridades12 =
						(resultado.getInt("B_CHECAR_PRIORIDADES12") == 1);
					datosConfSidi.cupoRebasaCapacidad =
						(resultado.getInt("B_CUPO_REBASA_CAPACIDAD") == 1);
					datosConfSidi.enviaCorreoFinSeleccion =
						(resultado.getInt("B_ENVIA_CORREO_FIN_SELECCION") == 1);
//					datosConfSidi.tipoAutenticacion =
//						(resultado.getString("TIPO_AUTENTICACION"));
					datosConfSidi.permitirActualizarCorreo =
						(resultado.getInt("B_PERMITIR_ACTUALIZAR_CORREO") == 1);
					datosConfSidi.activaParaRE =
						(resultado.getInt("B_ACTIVA_PARA_RE") == 1);
					datosConfSidi.actualizaDatosFijosAlumno =
						(resultado.getInt("B_ACTUALIZA_DATOS_FIJOS_ALUMNO") == 1);
					datosConfSidi.correoContactoCampus=resultado.getString("CORREO_CONTACTO_CAMPUS");
					datosConfSidi.cupoLimiteInferior=resultado.getInt("N_CUPO_LIMITE_INFERIOR");
					datosConfSidi.movimientoInscripcion=resultado.getInt("MOVIMIENTO_INSCRIPCION");
					datosConfSidi.controlTipoMateria=resultado.getInt("CONTROL_TIPO_MATERIA");
					datosConfSidi.habilitarAcad =resultado.getInt("B_HABILITAR_ACAD") == 1;
					datosConfSidi.habilitarExtraacad =resultado.getInt("B_HABILITAR_EXTRAACAD") == 1;
					// 5-0131a amr
				    fecha= resultado.getDate("F_FECHA_LIM_INSCRIPCION_NUEVA");
		            tiempo= (Time) resultado.getTime("F_FECHA_LIM_INSCRIPCION_NUEVA");
		
		            if (fecha != null && tiempo != null) {
		                datosConfSidi.fechaLimInscripcionNueva = (Utilerias.obtenCalendarDesdeBDDateTime(fecha, tiempo)).getTime();
		            }
		            else {
		                datosConfSidi.fechaLimInscripcionNueva = null;
		            }
		            //-----
		            fecha= resultado.getDate("F_FECHA_AUDITORIA_PAGO");
		            tiempo= (Time) resultado.getTime("F_FECHA_AUDITORIA_PAGO");
		
		            if (fecha != null && tiempo != null) {
		                datosConfSidi.fechaAuditoriaPago = (Utilerias.obtenCalendarDesdeBDDateTime(fecha, tiempo)).getTime();
		            }
		            else {
		                datosConfSidi.fechaAuditoriaPago = null;
		            }
					//-----
		            fecha = resultado.getDate("F_FECHA_INICIO_PERIODO_SERV");
		            tiempo = (Time)resultado.getTime("F_FECHA_INICIO_PERIODO_SERV");
		            
		            if (fecha != null && tiempo != null) {
		            	datosConfSidi.fechaInicioPeriodoServicio = (Utilerias.obtenCalendarDesdeBDDateTime(fecha, tiempo)).getTime();
		            } else {
		            	datosConfSidi.fechaInicioPeriodoServicio = null;
		            }
		            
		            //-----
		            fecha = resultado.getDate("F_FECHA_FIN_PERIODO_SERV");
		            tiempo = (Time)resultado.getTime("F_FECHA_FIN_PERIODO_SERV");
		            
		            if (fecha != null && tiempo != null) {
		            	datosConfSidi.fechaFinPeriodoServicio = (Utilerias.obtenCalendarDesdeBDDateTime(fecha, tiempo)).getTime();
		            } else {
		            	datosConfSidi.fechaFinPeriodoServicio = null;
		            }
		            
		            //datosConfSidi.proceso=resultado.getString("PROCESO"); Se elimina en proyecto 946, AGO13
		            
		            //----
		            fecha=resultado.getDate("F_FECHA_INICIO_TARDIAS");
		            tiempo = (Time)resultado.getTime("F_FECHA_INICIO_TARDIAS");
		            if (fecha != null && tiempo != null) {
		            	datosConfSidi.fechaInicioTardias = (Utilerias.obtenCalendarDesdeBDDateTime(fecha, tiempo)).getTime();
		            } else {
		            	datosConfSidi.fechaInicioTardias = null;
		            }
		            
		            datosConfSidi.descripcionPeriodo = resultado.getString("DESCRIPCION_PERIODO"); // Se agregó descripcion periodo 2Abr08. (RRRR)
		            
		            
		            
					datosConfSidi.resultado = ConstantesSiDI.MSG_OK;
				} else {
					datosConfSidi.resultado = -ConstantesSiDI.MSG_OK;
				}


				return datosConfSidi;

			} catch (SQLException sqle) {
				System.err.println(
						"-126"
						+ ConstantesSiDI.ERR
						+ "| Error al obtener datos Conf Sidi "
						+ sqle);
				return null;
			} finally {
				try {
					if (resultado != null)
						resultado.close();
					if (enunciado != null)
						enunciado.close();
				} catch (SQLException e) {
				}
				try {
					cnn.setAutoCommit(false);
					cnn.close();
				} catch (SQLException e) {
				}
			}
		}

	/**
	 * Revisa si hubieron cambios en los campos de un periodo. Creation date:
	 * (26/01/2001 04:54:39 p.m.)
	 * 
	 * @return boolean
	 * @param unDatoConfSidi
	 *            java.lang.Object
	 */
	public boolean equals(Object unDatoConfSidi) {

		if (!(unDatoConfSidi instanceof DatosConfSidi)) {
			return false;
		}

		DatosConfSidi otro = (DatosConfSidi) unDatoConfSidi;

		return unPeriodo.equals(otro.unPeriodo)
				&& codigoCampus.equals(otro.codigoCampus)
				&& esUnPeriodoActivo == otro.esUnPeriodoActivo
				&& checarSedes == otro.checarSedes
				&& tiempoLimiteSesion == otro.tiempoLimiteSesion
				&& esPagoPorUnidades == otro.esPagoPorUnidades
				// Se quita, por eliminacion del relay: && servidorDeCorreo.equals(otro.servidorDeCorreo)
				&& emisorCorreoHorario.equals(otro.emisorCorreoHorario)
				&& correoContactoCampus.equals(otro.correoContactoCampus)
				&& checarPrioridades12 == otro.checarPrioridades12
				&& cupoRebasaCapacidad == otro.cupoRebasaCapacidad
				&& enviaCorreoFinSeleccion == otro.enviaCorreoFinSeleccion
				&& permitirActualizarCorreo == otro.permitirActualizarCorreo
				&& actualizaDatosFijosAlumno == otro.actualizaDatosFijosAlumno
				&& activaParaRE == otro.activaParaRE
				&& cupoLimiteInferior == otro.cupoLimiteInferior
				&& habilitarAcad == otro.habilitarAcad;

	}

	/**
	 * Devuelve en un string la información de un periodo. Creation date:
	 * (05/09/2000 12:33:55 p.m.)
	 * 
	 * @return java.lang.String
	 */
	public String toString() {
		FechaSimple fechaLimInscripcionNueva = Fecha
				.convertirDateAFechaSimple(this.fechaLimInscripcionNueva);
		FechaSimple fechaAuditoriaPago = Fecha
				.convertirDateAFechaSimple(this.fechaAuditoriaPago);

		FechaSimple fechaInicioPeriodoServicio = Fecha
				.convertirDateAFechaSimple(this.fechaInicioPeriodoServicio);
		FechaSimple fechaFinPeriodoServicio = Fecha
				.convertirDateAFechaSimple(this.fechaFinPeriodoServicio);

		return "Periodo:"
				+ unPeriodo
				+ " "
				+ " Descripcion:"
				+ descripcionPeriodo
				+ " "
				+ " Codigo Campus:"
				+ codigoCampus
				+ " "
				+ " Periodo Activo:"
				+ esUnPeriodoActivo
				+ " "
				+ " Chk. Sdes:"
				+ checarSedes
				+ " "
				+ " Tpo. Lim. Ses:"
				+ tiempoLimiteSesion
				+ " "
				//Se quita, por eliminacion del relay:
				/*+ " Servidor correo:"
				+ (servidorDeCorreo.length() > 10 ? servidorDeCorreo.substring(
						0, 10) : servidorDeCorreo) + " " + " Emisor horario:"*/
				+ emisorCorreoHorario + " " + " Correo contacto:"
				+ correoContactoCampus + " " + " Tipo Pago:"
				+ (esPagoPorUnidades ? "unidades " : "horas ") + " Chk pri12:"
				+ (checarPrioridades12) + " Cupo reb cap:"
				+ (cupoRebasaCapacidad) + " " + " Envio correo fin:"
				+ (enviaCorreoFinSeleccion) + " Act correo:"
				+ permitirActualizarCorreo + " " + " Act datos fijos:"
				+ actualizaDatosFijosAlumno + " Activa para reportes cond:"
				+ activaParaRE + " Cupo Lim Inf:" + cupoLimiteInferior
				+ " Fecha Lim Inscr. nueva:"
				+ fechaLimInscripcionNueva.toString()
				+ " Fecha auditoría pago:" + fechaAuditoriaPago.toString()
				+ " Fecha inicio periodo serv:"
				+ fechaInicioPeriodoServicio.toString()
				+ " Fecha fin periodo serv:"
				+ fechaFinPeriodoServicio.toString() + " Mov de inscripcion:"
				+ movimientoInscripcion + " Control tipo materia:"
				+ controlTipoMateria + " Hab acad:" + habilitarAcad
				+ " Hab act form:" + habilitarExtraacad ;
				//+ " Proceso: " + proceso; Se elimina en proyecto 946 AGO13
	}

	/**
	 * Regresa la descripción del tipo de mov de inscripción permitidos y de
	 * control tipo de materia Creation date: (20/10/2005 11:41 AM)
	 * @param cCampo 
	 * @param intMov 
	 * @return No documentado
	 */
	public String obtenDescripcionTipo(char cCampo, int intMov) {
		String strDescripcionTipo = "";
		if (cCampo == campoMovimientoInscripcion) {

			switch (intMov) {

			case 0: {
				strDescripcionTipo = "Cualquier movimiento registro de horario y registro administrativo, servicios y asignación de formas de pago";
				break;
			}
			case 1: {
				strDescripcionTipo = "Sólo se permiten reubicaciones de horario masivas, cancelación de horario, registro administrativo por archivo, recálculo de registro administrativo masivo y cancelación de registro administrativo";
				break;
			}
			case 2: {
				strDescripcionTipo = "Sólo se permite cancelar horario, cancelar registro administrativo y recálculo de registro administrativo masivo";
				break;
			}
			case 3: {
				strDescripcionTipo = "Ningún movimiento de horario ni de registro administrativo, sólo se permite hacer el recálculo de registro administrativo masivo";
				break;
			}
			default: {
				break;
			}

			}
		} else if (cCampo == campoControlTipoMateria) {

			switch (intMov) {

			case 0: {
				strDescripcionTipo = "Sin restricción, pueden modificarse Habilitar materias académicas y actividades formativas";
				break;
			}
			case 1: {
				strDescripcionTipo = "Sólo habilitado para materias académicas";
				break;
			}
			case 2: {
				strDescripcionTipo = "Sólo habilitado para actividades formativas";
				break;
			}

			default: {
				break;
			}
			}
		}

		return strDescripcionTipo;

	}
	
	/**
	 * Obtiene la descripción de un Periodo, leyendo el dato directamente de Banner.
	 * Creation date: (2/12/2001 4:57:01 PM)
	 * @param c1 
	 * @return No documentado
	 */
	public String obtenerPeriodoBanner() {
		String strSQL = "";
		String descResultado = "";
		boolean registroActualizado = false;
		PreparedStatement s1 = null;
		Connection c1 = null;
		strSQL = "SELECT SOAUTILSIDI_ITESM.OBTENER_DESC_PERIODO(?) AS desc_periodo FROM DUAL";

		// Obtener
		try {
			c1 = ManagerConections.getSidiConection();
			
//			if(!checarExiste(c1))
//			{
				// se cierra conexión para poder reutilizar la variable de Connection
				c1.close();
				
				c1 = ManagerConections.getBannerConection();
				s1 = c1.prepareStatement(strSQL);
				s1.setString(1, unPeriodo);
	
				registroActualizado = s1.execute();
				
				if(registroActualizado)
				{
					ResultSet rs = s1.getResultSet();
					while(rs.next())
					{
						if(rs.getString("desc_periodo") != null)
						{
							descResultado = rs.getString("desc_periodo");
						}
						else
						{
							descResultado  = "Periodo No existe en Banner.";
						}
					}
				}
				
				s1.close();
//			}
//			else
//			{
//				descResultado = "Periodo ya existe.";
//			}
			
		} catch (SQLException e) {
			System.out.println(Fecha.obtenFecha()
					+ " Error: No se obtuvo la descripción del periodo de Banner " + e.toString());
		} finally {
			try {
				if (s1 != null)
					s1.close();
				
				if(c1 != null)
					c1.close();
				
			} catch (SQLException e) {
			}

		}
		return descResultado;
	}	

	/**
	 * Actualiza la descripción del periodo en DATOS_CONF_SIDI.
	 * @param c1 
	 * @return fue actualizado o no el campo
	 */
	public int actualizarPeriodoBannerEnSidi(Connection c1) {
		String strSQL = "";
		int registroActualizado = 0;
		PreparedStatement s1 = null;
		strSQL = "update  DATOS_CONF_SIDI set "
				+ "DESCRIPCION_PERIODO=? "
				+ "where CODIGO_CAMPUS=? "
				+ "and PERIODO=?";

		// Actualizar
		try {
			c1.setAutoCommit(false);
			s1 = c1.prepareStatement(strSQL);
			s1.setString(1, descripcionPeriodoBanner);
			s1.setString(2, codigoCampus);
			s1.setString(3, unPeriodo);

			registroActualizado = s1.executeUpdate();
			c1.commit();
			c1.setAutoCommit(false);
			s1.close();
		} catch (SQLException e) {
			System.out
					.println(Fecha.obtenFecha()
							+ " Error: No se actualizo datos conf sidi "
							+ e.toString());
			try {
				c1.rollback();
				System.out.println(Fecha.obtenFecha() + " Rollback "
						+ e.toString());
			} catch (Exception e2) {
				System.out.println(Fecha.obtenFecha() + " Error del Rollback "
						+ e2.toString());
			}
		} finally {
			try {
				if (s1 != null)
					s1.close();
			} catch (SQLException e) {
			}

		}
		return registroActualizado;
	}

}
