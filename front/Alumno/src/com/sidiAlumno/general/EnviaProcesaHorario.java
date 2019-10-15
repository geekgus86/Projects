package com.sidiAlumno.general;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.Properties;
import java.util.StringTokenizer;

import javax.faces.context.FacesContext;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.SendFailedException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import mx.itesm.security.Credencial;
/**
 * ConsultaDeHorario proceso
 * Aplicación que muestra el horario de un alumno inscrito, esta aplicación puede ser utilizada por alumnos
 * o por un usuario asesor.
 * Si el usuario es un alumno, este puede enviarse el horario por correo.
 * Creation date: (08/03/2001 01:10:07 p.m.)
 * @author: Francisco Cervantes Parra
 */
public class EnviaProcesaHorario {
	
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
	
	String versionMenor = " 7-0517a";
	//private String valSesGRUPOS_SELECCIONADOS = "VAL_SES_GRUPOS_SELECCIONADOS";
	public String campus;
	public String periodo;
	public String matricula;
	public Alumno alumno;
	private boolean bHayErrorAlEnviarCorreo;
	private String pidm;

	
	public EnviaProcesaHorario(String campus, String periodo, String matricula, String pidm, Alumno alumno){
		super();
		this.campus = campus;
		this.periodo = periodo;
		this.matricula = matricula;
		this.pidm = pidm;
		this.alumno = alumno;
		bHayErrorAlEnviarCorreo=false;
	}
		
	public void envioSelec(String correoDestino) throws SendFailedException {
	Alumno alumno = this.alumno;

	System.out.println("==================== COMIENZA ENVIO DE CORREO a alummno "+alumno.getMatricula()+"==========================");
	DatosConfSidi dcs = DatosConfSidi.obtenDatosConfSidi(campus, periodo);

	// Se quita, por eliminacion del relay:
	//String mailServer = dcs.servidorDeCorreo; //"campus.rzs.itesm.mx";
	String from = dcs.emisorCorreoHorario ;//"fcparra@campus.rzs.itesm.mx";
	String to = correoDestino;//request.getParameter("cuentaDeCorreo");
	
	if(to==null || to.indexOf('@')<2) {
		return;
	}
	
	// Bandera que sirve para indicar si hubo un error al enviar el correo. En este caso no se invalidará la sesión.
	bHayErrorAlEnviarCorreo = false;

	try {
		// Get system properties
		Properties props = System.getProperties();
		// Setup mail server
		props.put("mail.smtp.host", "");
		// Get session
		Session session = Session.getDefaultInstance(props, null);
		
		// Define message
		MimeMessage message = new MimeMessage(session);
		message.setFrom(new InternetAddress(from, "Sistema de inscripciones"));
		if (to.indexOf(',') == -1)
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
		else {
			StringTokenizer ctas = new StringTokenizer(to, ",");
			for (;ctas.hasMoreTokens();) 
				message.addRecipient(Message.RecipientType.TO, new InternetAddress(ctas.nextToken()));
		}
		
		String texto = recuperaHtml();
		System.out.println("el correo es");
		System.out.println(texto);
		message.setText(texto, "utf-8", "html");
		message.setSubject("Tu horario de clases del periodo "+ alumno.getPeriodoDesc());
		message.setContent(texto,  "text/html; charset=utf-8");

		// Set Reply-to
		if(dcs.correoContactoCampus != null && dcs.correoContactoCampus.indexOf('@') != -1) {
			StringTokenizer ctasReply = new StringTokenizer(dcs.correoContactoCampus, ",");
			Address[] replyTo = new InternetAddress[ctasReply.countTokens()];
			for (int i=0;ctasReply.hasMoreTokens();i++) 
				replyTo[i] = new InternetAddress(ctasReply.nextToken());
			message.setReplyTo(replyTo);
		}

	    message.saveChanges();		
		// Send message
		Transport.send(message);

		return;
	} catch  (Throwable e) {
		System.err.println("Error al enviar correo, matrícula: " + alumno.getMatricula() + " error: " + e);
		System.out.println("Error al enviar correo, matrícula: " + alumno.getMatricula() + " error: " + e);
		bHayErrorAlEnviarCorreo = true;
		throw new SendFailedException(e.getMessage());
	}
	finally {

		System.out.println("==================== TERMINA ENVIO DE CORREO a alummno "+alumno.getMatricula()+"==========================");
	}
}
	@SuppressWarnings("static-access")
	private String recuperaHtml() throws Exception {

		String urlConsultaHorario = getString("urlConsultaHorario");

		Credencial credencial = new Credencial();
		
		credencial.setPeriodo(alumno.getPeriodo());
		credencial.setCampus(alumno.getCod_campus());
		credencial.setMatricula(alumno.getMatricula().contains("A")?alumno.getMatricula():"A"+alumno.getMatricula());
		credencial.setAutenticacion_tipo("LDAP");
		credencial.setPassword("");
		java.util.Date fec = new java.util.Date();
		credencial.setFecha(fec.getTime());
		StringBuilder salida = new StringBuilder();
		String id = credencial.generaId();
		System.out.println("El ID enviado es "+id);
		try {
			URL url = new URL(urlConsultaHorario+id);
			URLConnection urlConn = url.openConnection();  
			BufferedReader reader;
			reader = new BufferedReader(new InputStreamReader(
					urlConn.getInputStream(), "UTF-8"));
			String inputLine;
			while ((inputLine = reader.readLine()) != null)
				salida.append(inputLine);
			
			reader.close();
		} catch (IOException e) {
			System.out.println("hubo un error en obtener el horario para el correo "+e.getMessage());
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return salida.toString();
	}
	
	public boolean isBHayErrorAlEnviarCorreo() {
		return bHayErrorAlEnviarCorreo;
	}
	
	public void setBHayErrorAlEnviarCorreo(boolean hayErrorAlEnviarCorreo) {
		bHayErrorAlEnviarCorreo = hayErrorAlEnviarCorreo;
	}

	public String getPidm() {
		return pidm;
	}

	public void setPidm(String pidm) {
		this.pidm = pidm;
	}
}
