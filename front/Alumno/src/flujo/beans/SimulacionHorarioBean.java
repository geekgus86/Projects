package flujo.beans;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.faces.context.FacesContext;

public class SimulacionHorarioBean {
	
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

	private String ligaSimulacionHorario;

	public String getLigaSimulacionHorario() {
		return ligaSimulacionHorario;
	}

	public void setLigaSimulacionHorario(String ligaSimulacionHorario) {
		this.ligaSimulacionHorario = ligaSimulacionHorario;
	}
	
	
	public String getUrlSimulacionHorario()
	{
		return getString("getUrlSimulacionHorario");
	}
}
