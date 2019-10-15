package flujo.beans;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;

import sesion.beans.SesionMB;

import com.sidiAlumno.general.Alumno;
import com.sidiAlumno.general.Encripcion;

public class BoletaPagoMB {

	private String matricula;
	private String pin;
	private String periodo;
	private String fecha;
	private String src;
	private String liga = getString("liga");
	private int permiteSalida = 0;// 0->no 1->si
	
	public BoletaPagoMB(){
		HttpServletRequest request = (HttpServletRequest)FacesContext.getCurrentInstance().getExternalContext().getRequest();
		
		if (request != null) {
			Alumno alumno = (Alumno) request.getSession().getAttribute(
					"usuario");
			setMatricula("A" + alumno.getMatricula());
			setPin(alumno.getPidem());
			setPeriodo(alumno.getPeriodo());
			// setFecha();
			Encripcion encrip = new Encripcion();
			String id = encrip.cifraLlaveHex("p_matricula=" + getMatricula() + "&p_pin=" + getPin() + "&p_term_in=" + getPeriodo() + "&p_liga=" + liga);
			setSrc(getString("boletaPagoMB")+id);
			
			FacesContext context = FacesContext.getCurrentInstance();
			SesionMB bean = (SesionMB) context.getApplication()
					.evaluateExpressionGet(context, "#{sesionMB}",
							SesionMB.class);
			
			bean.calculaDetalleProcesoAlumno();
		}
		
		
	}
	
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
			System.out.println("Error al obtener un parámetro de archivo connectionURL.properties: "+e.toString());
		}
		return valor;
	}

	/**
	 * Valida si la etapa de Boleta Pago ha sido completada
	 * @return 0-No Completado, 1 Completado
	 */
	public int getEsCompleto() {
		HttpServletRequest request = (HttpServletRequest)FacesContext.getCurrentInstance().getExternalContext().getRequest();
		
		if (request != null) {
			FacesContext context = FacesContext.getCurrentInstance();
			SesionMB bean = (SesionMB) context.getApplication()
					.evaluateExpressionGet(context, "#{sesionMB}",
							SesionMB.class);
			
			bean.calculaDetalleProcesoAlumno();
			
			// Se elimina el alumno que se lee de sesión y se deja el alumno actualizado que se obtiene del bean 
			//Alumno alumno = (Alumno) request.getSession().getAttribute("usuario");
			
			// Se obtiene el alumno del bean que esta actualizado con los estatus del menu
			Alumno alumno=bean.getAlumno();
			
			// Si es igual a 2 es que la etapa de Pago ha finalizado
			if(alumno.getEstatusBoletaPago() == 2)
				return 1; // True - La etapa de Boleta de Pago está completa.
			
		}
				
		return 0; // False - La etapa de Boleta de Pago no está completa.
	}

	public String getMatricula() {
		return matricula;
	}



	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}



	public String getPin() {
		return pin;
	}



	public void setPin(String pin) {
		this.pin = pin;
	}



	public String getPeriodo() {
		return periodo;
	}



	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}



	public String getFecha() {
		FacesContext context = FacesContext.getCurrentInstance();
		
		if(context != null) {
			SesionMB bean = (SesionMB) context.getApplication()
					.evaluateExpressionGet(context, "#{sesionMB}",
							SesionMB.class);
			
			bean.calculaDetalleProcesoAlumno();
		}
		
		return fecha;
	}



	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public String getSrc() {
		return src;
	}

	public void setSrc(String src) {
		this.src = src;
	}

	public int getPermiteSalida() {
		permiteSalida = getEsCompleto();
		return permiteSalida;
	}

	public void setPermiteSalida(int permiteSalida) {
		this.permiteSalida = permiteSalida;
	}
}
