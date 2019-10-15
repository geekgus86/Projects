package flujo.beans;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.faces.context.FacesContext;

import com.sidiAlumno.general.EstadoOpcionesFlujo;

import sesion.beans.SesionMB;


public class ControlFlujoMb {
	
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
	
	private boolean muestraComponenteExterno = false;
	
	private String periodoDesc;

	private String colorActividadesPrevias;
	private String colorHorario;
	private String colorBoletaPago;
	private String colorConsultaInscrip;

	private String imagenActividadesPrevias;
	private String imagenHorario;
	private String imagenBoletaPago;
	private String imagenConsultaInscrip;

	private boolean habilitaActividadesPrevias;
	private boolean habilitaHorario;
	private boolean habilitaBoletaPago;
	private boolean habilitaConsultaInscrip;
	
	public ControlFlujoMb() {
	}
	
	public String goToMenuPasosPrevios()
	{
		return getString("goToMenuPasosPrevios");
	}
	
	public String goToSimulacionHorario()
	{
		return getString("goToSimulacionHorario");
	}
	
	public String goToActividadesFormativas()
	{
		return getString("goToActividadesFormativas");
	}
	
	public String goToTutorial()
	{
		return getString("goToTutorial");
	}
	
	public String getUrlTutorial()
	{
		return getString("getUrlTutorial");
	}
	
	public String goToAyuda()
	{
		return getString("goToAyuda");
	}

	public String goToMenuBoletaPago() {
		FacesContext context = FacesContext.getCurrentInstance();
		SesionMB bean = (SesionMB) context.getApplication()
				.evaluateExpressionGet(context, "#{sesionMB}",
						SesionMB.class);
		
		bean.calculaDetalleProcesoAlumno();
		
		if(bean!=null){
			if(bean.getTipoAlumno().equals("C") || bean.getTipoAlumno().equals("N")){
				EstadoOpcionesFlujo estadoOpcionesFlujo =  EstadoOpcionesFlujo.getEstadoOpcionesFlujo("menu_boleta");
				bean.setActivoMenu(estadoOpcionesFlujo.isActivoMenu());
				bean.setActivoPrevios(estadoOpcionesFlujo.isActivoPrevios());
				bean.setActivoHorario(estadoOpcionesFlujo.isActivoHorario());
				bean.setActivoBoleta(estadoOpcionesFlujo.isActivoBoleta());
				bean.setActivoConsulta(estadoOpcionesFlujo.isActivoConsulta());
			}
		}
			
		
		return getString("goToMenuBoletaPago");
	}
	
	public String goToInfoBoletaPago() {
		return getString("goToInfoBoletaPago");
	}
	
	public String goToModifHorario() {
		return getString("goToModifHorario");
	}
	
	public String goToConfirmaInscripcion() {
		return getString("goToConfirmaInscripcion");
	}
	
	public String iniciarAction() {
		return getString("iniciarAction");
	}
	
	public String goToRealizarHorario() {
		return getString("goToRealizarHorario");
	}
	
	public String goToIndex() {
		return getString("goToIndex");
	}
	
	public boolean isMuestraComponenteExterno() {
		return muestraComponenteExterno;
	}

	public void setMuestraComponenteExterno(boolean muestraComponenteExterno) {
		this.muestraComponenteExterno = muestraComponenteExterno;
	}

	public String getPeriodoDesc() {
		return periodoDesc;
	}

	public void setPeriodoDesc(String periodoDesc) {
		this.periodoDesc = periodoDesc;
	}

	public String getColorActividadesPrevias() {
		return colorActividadesPrevias;
	}

	public void setColorActividadesPrevias(String colorActividadesPrevias) {
		this.colorActividadesPrevias = colorActividadesPrevias;
	}

	public String getColorHorario() {
		return colorHorario;
	}

	public void setColorHorario(String colorHorario) {
		this.colorHorario = colorHorario;
	}

	public String getColorBoletaPago() {
		return colorBoletaPago;
	}

	public void setColorBoletaPago(String colorBoletaPago) {
		this.colorBoletaPago = colorBoletaPago;
	}

	public String getColorConsultaInscrip() {
		return colorConsultaInscrip;
	}

	public void setColorConsultaInscrip(String colorConsultaInscrip) {
		this.colorConsultaInscrip = colorConsultaInscrip;
	}

	public String getImagenActividadesPrevias() {
		return imagenActividadesPrevias;
	}

	public void setImagenActividadesPrevias(String imagenActividadesPrevias) {
		this.imagenActividadesPrevias = imagenActividadesPrevias;
	}

	public String getImagenHorario() {
		return imagenHorario;
	}

	public void setImagenHorario(String imagenHorario) {
		this.imagenHorario = imagenHorario;
	}

	public String getImagenBoletaPago() {
		return imagenBoletaPago;
	}

	public void setImagenBoletaPago(String imagenBoletaPago) {
		this.imagenBoletaPago = imagenBoletaPago;
	}

	public String getImagenConsultaInscrip() {
		return imagenConsultaInscrip;
	}

	public void setImagenConsultaInscrip(String imagenConsultaInscrip) {
		this.imagenConsultaInscrip = imagenConsultaInscrip;
	}

	public boolean isHabilitaActividadesPrevias() {
		return habilitaActividadesPrevias;
	}

	public void setHabilitaActividadesPrevias(boolean habilitaActividadesPrevias) {
		this.habilitaActividadesPrevias = habilitaActividadesPrevias;
	}

	public boolean isHabilitaHorario() {
		return habilitaHorario;
	}

	public void setHabilitaHorario(boolean habilitaHorario) {
		this.habilitaHorario = habilitaHorario;
	}

	public boolean isHabilitaBoletaPago() {
		return habilitaBoletaPago;
	}

	public void setHabilitaBoletaPago(boolean habilitaBoletaPago) {
		this.habilitaBoletaPago = habilitaBoletaPago;
	}

	public boolean isHabilitaConsultaInscrip() {
		return habilitaConsultaInscrip;
	}

	public void setHabilitaConsultaInscrip(boolean habilitaConsultaInscrip) {
		this.habilitaConsultaInscrip = habilitaConsultaInscrip;
	}
	
	public String goToPagoAnticipo(){
		//Determinamos el tipo de Alumno para determinar que opciones del menu se pintarán
		FacesContext context = FacesContext.getCurrentInstance();
		SesionMB bean = (SesionMB) context.getApplication()
				.evaluateExpressionGet(context, "#{sesionMB}",
						SesionMB.class);
		if(bean!=null){
			if(bean.getTipoAlumno().equals("C") || bean.getTipoAlumno().equals("N")){
				EstadoOpcionesFlujo estadoOpcionesFlujo =  EstadoOpcionesFlujo.getEstadoOpcionesFlujo(EstadoOpcionesFlujo.PAGO_ANTICIPO);
				bean.setActivoMenu(estadoOpcionesFlujo.isActivoMenu());
				bean.setActivoPrevios(estadoOpcionesFlujo.isActivoPrevios());
				bean.setActivoHorario(estadoOpcionesFlujo.isActivoHorario());
				bean.setActivoBoleta(estadoOpcionesFlujo.isActivoBoleta());
				bean.setActivoConsulta(estadoOpcionesFlujo.isActivoConsulta());
			}
		}
		return getString("goToPagoAnticipo");
	}
}
