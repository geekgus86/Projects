package flujo.beans;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.faces.context.FacesContext;


public class HorarioInscripcionBean {
	
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

	private String fecHoraPresencial;
	private String fecHoraRemota;
	private String fecHoraActFormativas;

	private String datosFecHoraActual;
	private String datosZonaHoraria;
	
	private String url;
	
	public String goToHorarioInscripcion() {
		
		
		
		url = getString("goToHorarioInscripcion");

		//consulta o recuperacuperación de los datos del alumno
		
		//consulta para recuperar turnos (fecha y hora) 
		
		//Asignarlos al bean de horario de inscripción

		fecHoraPresencial = "las 5 de la tarde";
		fecHoraRemota = "las 5 de la tarde";
		fecHoraActFormativas = "las 5 de la tarde";
		datosFecHoraActual = "hora actual";
		datosZonaHoraria = "zona horaria actual";
		
		return "horarioInscripcion";
	}
	
	
	public String getFecHoraPresencial() {
		return fecHoraPresencial;
	}
	public void setFecHoraPresencial(String fecHoraPresencial) {
		this.fecHoraPresencial = fecHoraPresencial;
	}
	public String getFecHoraRemota() {
		return fecHoraRemota;
	}
	public void setFecHoraRemota(String fecHoraRemota) {
		this.fecHoraRemota = fecHoraRemota;
	}
	public String getFecHoraActFormativas() {
		return fecHoraActFormativas;
	}
	public void setFecHoraActFormativas(String fecHoraActFormativas) {
		this.fecHoraActFormativas = fecHoraActFormativas;
	}
	public String getDatosFecHoraActual() {
		return datosFecHoraActual;
	}
	public void setDatosFecHoraActual(String datosFecHoraActual) {
		this.datosFecHoraActual = datosFecHoraActual;
	}
	public String getDatosZonaHoraria() {
		return datosZonaHoraria;
	}
	public void setDatosZonaHoraria(String datosZonaHoraria) {
		this.datosZonaHoraria = datosZonaHoraria;
	}


	public String getUrl() {
		return url;
	}


	public void setUrl(String url) {
		this.url = url;
	}

}
