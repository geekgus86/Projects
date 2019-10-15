package flujo.beans;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.faces.context.FacesContext;
import javax.mail.SendFailedException;
import javax.servlet.http.HttpServletRequest;

import sesion.beans.SesionMB;

import com.sidiAlumno.general.Alumno;
import com.sidiAlumno.general.Encripcion;
import com.sidiAlumno.general.EnviaProcesaHorario;
import com.sidiAlumno.general.EstadoOpcionesFlujo;

public class HorarioMB {
	
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
	
	private String url = getString("HorarioMBurl");
	private String matricula;
	private String pdim;
	private String periodo;
	private String liga = "2";
	private boolean muestraHorario;
	private String src = getString("HorarioMBsrc");
	private String src2 = getString("HorarioMBsrc2");
	private String src3 = "";
	private String src4 = getString("goToTutorialPreinsc");
	private Alumno alumno;
	
	public HorarioMB(){
		
		HttpServletRequest request = (HttpServletRequest)FacesContext.getCurrentInstance().getExternalContext().getRequest();
		
		if (request != null) {
			alumno = (Alumno) request.getSession().getAttribute(
					"usuario");
			setMatricula("A" + alumno.getMatricula());
			setPdim(alumno.getPidem());
			setPeriodo(alumno.getPeriodo());
		

			Encripcion encrip = new Encripcion();
			String id = encrip.cifraLlaveHex("p_matricula=" + getMatricula() + "&p_pin=" + getPdim() + "&p_term_in=" + getPeriodo() + "&p_liga=" + getLiga());

			src2 = getString("HorarioMBsrc2_2") + id;
			
			FacesContext context = FacesContext.getCurrentInstance();
			SesionMB bean = (SesionMB) context.getApplication()
					.evaluateExpressionGet(context, "#{sesionMB}",
							SesionMB.class);
			
			bean.calculaDetalleProcesoAlumno();
			
			goToECW();
		}
	}

	public String getSrc3() {
		return src3;
	}

	public void setSrc3(String src3) {
		this.src3 = src3;
	}

	public String sendMail() {
		EnviaProcesaHorario objeto = new EnviaProcesaHorario(alumno.getCod_campus(), periodo, matricula, pdim, alumno);
		
		try {
			objeto.envioSelec(alumno.getCorreo());
		} catch (SendFailedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "consultaInscripcion";
	}
	
	public String goToImpresion()
	{
		setMuestraHorario(true);
		return "consInscripVistaImprimir";
	}
	
	public void goToECW() //consulta estado de cuenta para el boton pagar en Consulta de inscripcion - 24/04/15 
	{
		HttpServletRequest request = (HttpServletRequest)FacesContext.getCurrentInstance().getExternalContext().getRequest();
		Alumno alumno = null;
		if (request != null) {
			 alumno = (Alumno) request.getSession().getAttribute(
					"usuario");
			}
		
		Encripcion encript = new Encripcion();
		String cifrado = encript.cifraLlaveHex(alumno.getPidem()+"|"+"A"+alumno.getMatricula()+"|"+alumno.getCorreo());
		
		this.src3 = getString("goToEstadoCuenta")+cifrado;
	}

	public String goToHorario()
	{
		setMuestraHorario(true);
		return getString("goToHorario");
	}

	public String goToConsultaHorario()
	{
		
		FacesContext context = FacesContext.getCurrentInstance();
		SesionMB bean = (SesionMB) context.getApplication()
				.evaluateExpressionGet(context, "#{sesionMB}",
						SesionMB.class);
		
		if(bean!=null){
			bean.calculaDetalleProcesoAlumno();
			if(bean.getTipoAlumno().equals("C") || bean.getTipoAlumno().equals("N")){
				EstadoOpcionesFlujo estadoOpcionesFlujo =  EstadoOpcionesFlujo.getEstadoOpcionesFlujo("consulta_inscripcion");
				bean.setActivoMenu(estadoOpcionesFlujo.isActivoMenu());
				bean.setActivoPrevios(estadoOpcionesFlujo.isActivoPrevios());
				bean.setActivoHorario(estadoOpcionesFlujo.isActivoHorario());
				bean.setActivoBoleta(estadoOpcionesFlujo.isActivoBoleta());
				bean.setActivoConsulta(estadoOpcionesFlujo.isActivoConsulta());
			}
		}
		
		
		return getString("goToConsultaHorario");
	}
	
	public boolean isMuestraHorario() {
		return muestraHorario;
	}
	
	public void setMuestraHorario(boolean muestraHorario) {
		this.muestraHorario = muestraHorario;
	}
	
	public String getUrl() {
		return url;
	}
	
	public void setUrl(String url) {
		this.url = url;
	}
	
	public String getMatricula() {
		return matricula;
	}
	
	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}
	
	public String getPdim() {
		return pdim;
	}
	
	public void setPdim(String pdim) {
		this.pdim = pdim;
	}
	
	public String getSrc() {
		return src;
	}
	
	public String getSrc4() {
		return src4;
	}

	public void setSrc4(String src4) {
		this.src4 = src4;
	}

	public String getSrc2() {
		return src2;
	}
	public void setSrc(String src) {
		this.src = src;
	}
	
	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	public String getLiga() {
		return liga;
	}

	public void setLiga(String liga) {
		this.liga = liga;
	}
}
