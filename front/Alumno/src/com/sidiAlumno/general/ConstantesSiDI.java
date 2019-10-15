package com.sidiAlumno.general;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.Properties;

import javax.faces.context.FacesContext;

public class ConstantesSiDI {
	
	public static String getString(String key) {
		String valor = "";
		try {
			
			FacesContext context = FacesContext.getCurrentInstance();
			InputStream inputStream = context.getExternalContext().getResourceAsStream("/WEB-INF/connectionURL.properties");
			Properties properties = new Properties();  
            properties.load(inputStream);
			valor = properties.getProperty(key);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("Error al obtener un paramentro de archivo connectionURL.properties: "+e.toString());
		}
		return valor;
	}

	public static final String CHARSET = getString("CHARSET"); // ISO Latin alphabet

	public static String JNDI_CIDI = getString("JNDI_CIDI");
	public static String JNDI_PC = getString("JNDI_PC");
	public static String JNDI_BANNER = getString("JNDI_BANNER");

	public static int ESTATUS_INACTIVO = 0;
	public static int ESTATUS_ACTIVO = 1;
	public static int ESTATUS_LISTO = 2;
	public static int ESTATUS_ERROR = -1;

	public static final short MSG_OK = 1;
	
	public static String INICIAL_MATRICULA = "A";
	
	public static String colorActividadesPrevias;
	public static String colorHorario;
	public static String colorBoletaPago;
	public static String colorConsultaInscrip;

	public static String imagenActividadesPrevias;
	public static String imagenHorario;
	public static String imagenBoletaPago;
	public static String imagenConsultaInscrip;

	public static final String regExpPeriodo = "(\\d{4})[0-9][0-9]";
	public static final int MINIMO_PASSWORD = 4;
	public static final int MINIMO_MATRICULA = 4;
	public static final int MINIMO_MATERIA = 2;
	public static final int MINIMO_CLAVE_ACTIVACION_NDS = 6;
	public static final int LARGO_CLAVE_ACTIVACION_NDS = 10;
	public static final int LARGO_MATRICULA = 8;
	public static final int LARGO_PASSWORD = 8;
	public static final int LARGO_PASSWORD_ENCRIPTADO = 13;
	public static final int LARGO_CARRERA = 6;
	public static final int LARGO_PERIODO = 6;
	public static final int LARGO_PAQUETE = 10;
	public static final int LARGO_MATERIA = 9;
	public static final int LARGO_ATRIBUTO = 4;
	public static final int LARGO_MAYOR = 3;
	public static final int LARGO_MINOR = 4;
	public static final int LARGO_GRUPO = 3;
	public static final char GRUPO_ACTIVO = 'A';
	public static final char GRUPO_INACTIVO = 'I';
	public static final char GRUPO_BORRADO = 'B';
	public static final char GRUPO_INDEFINIDO = '?';
	public static final char GUION_BAJO_PARA_CLAVE_MATERIA = '_';
	public static final String CRSE_NUMB_ATRIBUTOS = "0000";
	public static final char CARACTER_ATIPICO = '&';
	public static final char FORMA_PRESENCIAL = 'P';
	public static final char FORMA_REMOTA = 'R';
	public static final byte DIA_DOMINGO = 0;
	public static final byte DIA_LUNES = 1;
	public static final byte DIA_MARTES = 2;
	public static final byte DIA_MIERCOLES = 3;
	public static final byte DIA_JUEVES = 4;
	public static final byte DIA_VIERNES = 5;
	public static final byte DIA_SABADO = 6;
	public static final byte DIAS_SEMANA = 7;
	public static final byte MEDIAS_HORAS_DIA = 48;
	
	/*
	 * soporte actual 1 año (max diferencia entre primero de enero y el ultimo
	 * dia con clase
	 */
	// public static final short MAX_NUMERO_DIAS = 366*2; para dos años.
	public static final short MAX_NUMERO_DIAS = 366 + 183; // Para año y medio,
	// iniciando desde enero. Si se requiere más tiempo, 2 años por ej., se usa la línea anterior.
	
	public static final int MENOR = -1;
	public static final int IGUAL = 0;
	public static final int MAYOR = 1;

	public static final short PRIORIDAD_IDIOMAS = 0;
	public static final byte SEMESTRE_OCHO = 8;
	public static final byte SEMESTRE_NUEVE = 9;
	public static final String SEDE_DEL_CAMPUS = "   ";
	public static final int LARGO_SEDE = 3;
	public static final int LARGO_ID_USUARIO = 8;
	public static final int TIPO_U_ALUMNO = 100;
	public static final int TIPO_U_USUARIO = 200;
	public static final int SI_VAL = 1;
	public static final int NO_VAL = -1;
	public static final int NO_MAX_INTENTOS = 3;
	public static final int USUARIO_VALIDO = 1;
	public static final int USUARIO_NO_VALIDO = 0;
	public static final int MAX_MATERIAS = 16;
	public static final int MAX_UNIDADES = 70;
	public static final int MAX_SOBRECARGA = 40;
	public static final int MAX_CAMBIOS_HORARIO = 16;
	public static final int MAX_CAMBIOS_PREFERENCIAS_EXTRAACADEMICAS = 16;
	public static final int MAX_CAMBIOS_HORARIO_COCUR = 16;
	public static char PAGO_X_UNIDADES = 'U';
	public static char PAGO_X_HORAS = 'H';
	public static String REUBICACION_ALTA = "A";
	public static String REUBICACION_BAJA = "B";
	public static String CONFIGURACION_DEMO = "D";
	public static String CONFIGURACION_ESPECIAL = "E";
	public static String CONFIGURACION_REUBICACION = "R";
	public static String CONFIGURACION_SELECCION = "S";

	public static final String CLAVE_MATERIA_COMODIN = "********";
	public static final String CARRERA_COMODIN = "      "; // seis espacios
	public static final String MATERIA_ACADEMICA = "N";
	public static final String MATERIA_EXTRAACADEMICA = "E";
	public static final String DIRIMAGENES = getString("DIRIMAGENES");

	// ////// Lista de las claves de ATRIBUTO tal como deben estar en la base
	/*
	 * public static final int ATRIBUTO_ASESORIA = 99; public static final int
	 * ATRIBUTO_REUBICA = 98; public static final int ATRIBUTO_CUPO = 97; public
	 * static final int ATRIBUTO_ESCOLARES = 96; public static final int
	 * ATRIBUTO_TESORERIA = 95; public static final int ATRIBUTO_BECAS = 94;
	 * public static final int ATRIBUTO_SUPER = 93; public static final int
	 * ATRIBUTO_CONSULTA = 92; public static final int ATRIBUTO_AYUDANTE = 91;
	 */

	// ////// Lista de las claves de programas tal como deben estar en la base
	// (Faltan varios)
	public static final int CVE_PROG_SELEC = 1;
	public static final int CVE_PROG_ASESORIA_MANUAL = 2;
	public static final int CVE_PROG_CONTROL_POBLACIONES = 3;
	public static final int CVE_PROG_CONSULTA_GRUPO = 4;
	public static final int CVE_PROG_MANTENIMIENTO_PERFILES = 5;
	public static final int CVE_PROG_ADMIN_DATOS_ALUMNO = 6;
	public static final int CVE_PROG_REGISTRA_SEDE_ALUMNO = 7;
	public static final int CVE_PROG_REGISTRA_BECA_ALUMNO = 8;
	public static final int CVE_PROG_BORRA_BECA_ALUMNO = 9;
	public static final int CVE_PROG_REGISTRA_PAGO_ALUMNO = 10;
	public static final int CVE_PROG_REGISTRA_MAX_MATERIAS = 11;
	public static final int CVE_PROG_COPIA_REGISTRO_ALUMNO = 12;
	public static final int CVE_PROG_MONITOR_POB_GRUPO = 13;
	public static final int CVE_PROG_CANCELA_INSCRIPCION = 14;
	public static final int CVE_PROG_REPOBLA = 15;
	public static final int CVE_PROG_ADMIN_DATOS_USUARIO = 16;
	public static final int CVE_PROG_VALIDACION_PAGO = 17;
	public static final int CVE_PROG_MANEJO_LOG = 18;
	public static final int CVE_PROG_REGISTRA_TURNOS_INSCRIPCION = 19;
	public static final int CVE_PROG_CONS_DATOS_ADMINISTRATIVOS = 20;
	public static final int CVE_PROG_ASESORIA_POR_ARCHIVO = 21;
	public static final int CVE_PROG_REGISTRA_USUARIOS = 22;
	public static final int CVE_PROG_REUBICA = 23;
	public static final int CVE_PROG_AUTORIZA_TRES_SEMESTRES = 24;
	public static final int CVE_PROG_INSCRIBE_PAQUETES = 25;
	public static final int CVE_PROG_LEE_REGISTRO_ALUMNO = 26;
	public static final int CVE_PROG_LEE_REUBICACIONES = 27;
	public static final int CVE_PROG_CONSULTA_PAQUETE = 28;
	public static final int CVE_PROG_IMPRESION_HORARIO = 29;
	public static final int CVE_PROG_CONSULTA_HORARIO = 30;
	public static final int CVE_PROG_SORTEO_TURNOS_INSCRIPCION = 31;
	public static final int CVE_PROG_CONSULTA_ERRORES = 32;
	public static final int CVE_PROG_RECEPCION = 33;
	public static final int CVE_PROG_SOBRECARGAS = 34;
	public static final int CVE_PROG_AUTORIZACION_3SEMESTRES_POR_MATR = 35;
	public static final int CVE_PROG_REPORTES = 36;
	public static final int CVE_PROG_CONFIGURA_SIDI = 37;
	public static final String ERR = "Err";
	public static final String WAR = "War";
	public static final String QRY = "Qry";
	public static final String LOG = "Log";
	public static final String TODOS = "TODOS";
	public static final String DEPARTAMENTO = "DEPARTAMENTO";
	public static final String INICIO_SEDE = "S:";
	public static final String INICIO_NIVEL = "N:";
	public static final String CADENA_PASSWORD_INVALIDO = "*** Password invalido ***";
	public static final String ADMINISTRADOR_SIDI = "admonsidi";
	public static final String versionMayorSiDI = "ABR14";
	public static final String versionMayorGenDatos = "SEP12";
	public static final int ETAPA_CERO = 0;
	public static final int ETAPA_RECEPCION = 1;
	public static final int ETAPA_PAGO = 2;
	public static final int ETAPA_ASESORIA = 3;
	public static final int ETAPA_INSCRIPCION = 4;
	public static final int ETAPA_DATOS_PERSONAL = 5;

	public static final int TOTAL_DE_COLORES = 40;
	public static final String CODIGO_SIN_IMPRESORA = "-";

	public static final int MATRICULA_COOKIE = 0;
	public static final int PERIODO_COOKIE = 1;
	public static final int CAMPUS_COOKIE = 2;
	public static final int UDS_SELECCIONADAS_COOKIE = 3;
	public static final int HRS_SELECCIONADAS_COOKIE = 4;
	public static final int CARRERA_COOKIE = 5;
	public static final int PERFIL_COOKIE = 6;

	public static final String NOMBRE_MATRICULA_COOKIE_DEFAULT = "matriculaSiDI";
	public static final String NOMBRE_PERIODO_COOKIE_DEFAULT = "periodoSiDI";
	public static final String NOMBRE_CAMPUS_COOKIE_DEFAULT = "campusSiDI";
	public static final String NOMBRE_UDS_SELECCIONADAS_COOKIE_DEFAULT = "unidadesSelSiDI";
	public static final String NOMBRE_HRS_SELECCIONADAS_COOKIE_DEFAULT = "horasSelSiDI";
	public static final String NOMBRE_CARRERA_COOKIE_DEFAULT = "carreraSiDI";
	public static final String NOMBRE_PERFIL_COOKIE_DEFAULT = "perfilSiDI";

	public static final int URL_ENMEDIO = 1;
	public static final int URL_FINAL = 2;
	public static final String IP_LOCAL = getString("IP_LOCAL");
	public static final String LOCAL_HOST = getString("LOCAL_HOST");
	public static final int NUMERO_NEGATIVO_GENERICO = -10000;

	/* Para el tipo de grupo si es en linea, virtual o presencial */

	public static final int GRUPO_EN_LINEA = 10;
	public static final int GRUPO_VIRTUAL = 20;
	public static final int GRUPO_PRESENCIAL = 30;

	public static final String TIPO_ALUMNO_REGULAR = "AR";
	public static final String TIPO_ALUMNO_PI_A_OTRAS_UNIVERSIDADES = "PIA";
	public static final String TIPO_ALUMNO_PI_DE_OTRAS_UNIVERSIDADES = "PID";

	public final static char tipoDatoString = 'V';
	public final static char tipoDatoInt = 'N';
	public final static char tipoDatoFloat = 'F';
	public final static char tipoDatoDate = 'D';
	public final static char tipoDatoBoolean = 'B';
	public final static char tipoDatoBigDecimal = 'G';

	public final static String PERFIL_APLICACIONES_TERMINAL = "SIDI";
	
	public static final int MAXIMO_TIEMPO_URL_VALIDA = 60;

	public static final String MENSAJE_GENERICO_BUSSINES_SESSION_EXCEPTION = "Error de negio al acceder a la base de datos";
}
