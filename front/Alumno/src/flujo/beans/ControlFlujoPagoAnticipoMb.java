package flujo.beans;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mx.itesm.sistema.inscripciones.comunes.pojo.ConstantesComunes;
import sesion.beans.SesionMB;

import com.sidiAlumno.general.Alumno;
import com.sidiAlumno.general.ConfigPreins;
import com.sidiAlumno.general.Encripcion;
import com.sidiAlumno.general.EstadoOpcionesFlujo;
import com.sidiAlumno.general.exception.BusinessSessionException;
import com.sidiAlumno.general.servletsRecepcion.inicioFlujo;
import com.sidiAlumno.sesion.business.tx.TransaccionValidaAnticipoTx;
import com.sidiAlumno.sesion.business.tx.TxConfPreinscripcion;
import com.sidiAlumno.sesion.business.tx.TxPagoCveServicio;

public class ControlFlujoPagoAnticipoMb {

	private String matricula;
	private String codigoCampus;
	private String periodo;
	private String nivel;
	private String paramCodigoAdmision;
	private HttpSession sesion;
	private String mensajeError;
	private Alumno alumno;
	private boolean tipoAlumnoAnticipo;
	private TransaccionValidaAnticipoTx transaccionValidaAnticipoTx;
	private String cantidad;
	private String codigoTienda;
	private String llaveTienda;
	private String claveTienda;
	private String tipoMoneda;
	private String claveServicio;
	private String nombrePublicacion;
	private String tipoTransaccion;
	private String idioma;
	private String urlRegreso;
	private String urlAviso;
	private String importe;
	private String campus;
	private String nombre;
	private String folioTienda;
	private String email;
	private String url;
	private String importBD;
	
	
	
	
	/** Metodo que no se ocupa
	 * @deprecated
	 */
	public String validarAlumnoPagoAnticipo() {
		String paginaNavega = "";

		// Se obtienen los datos de sessión necesarios para la consulta

		// obtenemos los datos del alumno
		tipoAlumnoAnticipo = false;

		transaccionValidaAnticipoTx = new TransaccionValidaAnticipoTx();

		// En vez de ir a la base de datos recuperamos la clave de admisión del
		// objeto de sessión del Alumno
		HttpServletRequest request = (HttpServletRequest) FacesContext
				.getCurrentInstance().getExternalContext().getRequest();
		
		
		
		if (request == null) {
			setMensajeError(ConstantesComunes.MENSAJE_USUARIO_SIN_SESION);
			return "PaginaError";
		} else {
			sesion = request.getSession();
			alumno = (Alumno) sesion.getAttribute("usuario");

			if (alumno != null) {
				paramCodigoAdmision = alumno.getCod_adminision();
				this.codigoCampus = alumno.getCod_campus();
				this.periodo = alumno.getPeriodo();
				this.nivel = alumno.getCod_nivel();

			}
		}

		String strCodigoAdmisionMayus = paramCodigoAdmision.toUpperCase();

		// Validamos que si es Reingreso con cambio de Nivel
		if (strCodigoAdmisionMayus.startsWith("6")
				|| strCodigoAdmisionMayus.startsWith("D")
				|| strCodigoAdmisionMayus.startsWith("H")
				|| strCodigoAdmisionMayus.startsWith("L")
				|| strCodigoAdmisionMayus.startsWith("M")
				|| strCodigoAdmisionMayus.startsWith("P")
				|| strCodigoAdmisionMayus.startsWith("Q")) {
			System.out.println("El alumno es Reingreso con cambio de Nivel ");
			tipoAlumnoAnticipo = true;

			// Validamos que si es transferencia con cambio de nivel
		} else if (strCodigoAdmisionMayus.startsWith("E")
				|| strCodigoAdmisionMayus.startsWith("F")
				|| strCodigoAdmisionMayus.startsWith("J")
				|| strCodigoAdmisionMayus.startsWith("O")
				|| strCodigoAdmisionMayus.startsWith("U")
				|| strCodigoAdmisionMayus.startsWith("W")) {
			System.out
					.println("El alumno es Transferencia con cambio de nivel ");
			tipoAlumnoAnticipo = true;

		}

		// Si el tipo de alumno es de reingreso o transferencia de cambio de
		// nivel validamos fecha
		if (tipoAlumnoAnticipo) {
			// Si esta dentro de la fecha se valida adeudo
			if (validaFecha()) {
				} else {
				paginaNavega = "flujoNormal";
			}
			// En caso de no ser el tipo de alumno de reingreso o transferencia
			// de cambio de nivel seguimos el flujo normal
		} else {
			paginaNavega = "flujoNormal";
		}

		return paginaNavega;

	}
	
	
	/** Metodo que no se ocupa
	 * @deprecated
	 */
	public String obtenerCuota() {
		try {
			System.out.println(transaccionValidaAnticipoTx
					.consultaCuotaColegiatura(codigoCampus, periodo));
		} catch (BusinessSessionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}

	/** Metodo que no se ocupa
	 * @deprecated
	 */
	public boolean validaFecha() {
		
		return true;
	}
	
	/**
	 * Método que envía a la página de Horario para una preinscripción
	 * @since Junio 2015
	 */
	public void enviaHorarioPre(){
		HttpServletResponse response = (HttpServletResponse) FacesContext
				.getCurrentInstance().getExternalContext().getResponse();
		try {
			response.sendRedirect(getString("enviaHorarioPre"));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * Método que regresa a la página de inicial de preinscripción
	 * @since Junio 2015
	 */
	public void regresaPre(){
	
		HttpServletResponse response = (HttpServletResponse) FacesContext
				.getCurrentInstance().getExternalContext().getResponse();
			try{
				response.sendRedirect(getString("regresaPre"));
			}catch(Exception e){
				System.out.println("Ocurrio un error con el regreso "+email.toString());
			}

	}
	
	/**
	 * Método que valida si el alumno ya pago (o no ha pagado=tiene un adeudo)
	 * @return
	 */
	public String validaAdeudo() {
			
				FacesContext context = FacesContext.getCurrentInstance();
				SesionMB bean = (SesionMB) context.getApplication()
						.evaluateExpressionGet(context, "#{sesionMB}",
								SesionMB.class);
				SimpleDateFormat dt = new SimpleDateFormat("ddMMyyhhmmss");
				
				TxConfPreinscripcion confIns = new TxConfPreinscripcion();
				TxPagoCveServicio pagoCveServicio = new TxPagoCveServicio();
				Alumno alumnoBean;
				ConfigPreins configBean;
				alumnoBean=bean.getAlumno();
				configBean=confIns.getConfPreins(alumnoBean.getCod_nivel(), alumnoBean.getPeriodo(), alumnoBean.getCod_campus());
				
				if(bean!=null){
					//Determinamos el tipo de Alumno para determinar que opciones del menu se pintarán
					if(alumnoBean.getTipoAlumno().equals("C") || alumnoBean.getTipoAlumno().equals("N")){
						EstadoOpcionesFlujo estadoOpcionesFlujo =  EstadoOpcionesFlujo.getEstadoOpcionesFlujo("pago_anticipado_pagar");
						bean.setActivoMenu(estadoOpcionesFlujo.isActivoMenu());
						bean.setActivoPrevios(estadoOpcionesFlujo.isActivoPrevios());
						bean.setActivoHorario(estadoOpcionesFlujo.isActivoHorario());
						bean.setActivoBoleta(estadoOpcionesFlujo.isActivoBoleta());
						bean.setActivoConsulta(estadoOpcionesFlujo.isActivoConsulta());
						//bean.setImporte(getString("importe"));
						bean.setImporte(String.valueOf(configBean.getMontoAnticipoColeg()));
						bean.setCantidad(getString("cantidad"));
						bean.setCodigoTienda(getString("codigoTienda"));
						bean.setLlaveTienda(getString("llaveTienda")); 	  	
						bean.setClaveTienda(getString("claveTienda"));
						bean.setFolioTienda(bean.getAlumno().getMatricula()+dt.format(new Date()));
						bean.setTipoMoneda(getString("tipoMoneda"));
						//bean.setClaveServicio(getString("claveServicio"));
						bean.setClaveServicio(pagoCveServicio.getCveServicio(alumnoBean.getCod_campus(),alumnoBean.getCod_nivel()));
						System.out.println("Clave de Servicio (Pago Anticipado): "+ bean.getClaveServicio()
								+ "\n Alumno: "+ alumnoBean.getMatricula()
								+ "\n Campus: "+ alumnoBean.getCod_campus()
								+ "\n Periodo: "+ alumnoBean.getPeriodo()
								+ "\n Nivel: "+ alumnoBean.getCod_nivel()
						);
						bean.setNombrePublicacion(getString("nombrePublicacion"));
						bean.setTipoTransaccion(getString("tipoTransaccion"));
						bean.setIdioma(getString("idioma"));		
						
						Encripcion encrip = new Encripcion();
						setCantidad(encrip.cifraLlaveHex(bean.getCantidad()));
						setCodigoTienda(encrip.cifraLlaveHex(bean.getCodigoTienda()));
						setLlaveTienda(encrip.cifraLlaveHex(bean.getLlaveTienda()));
						setClaveTienda(encrip.cifraLlaveHex(bean.getClaveTienda()));
						setTipoMoneda(encrip.cifraLlaveHex(bean.getTipoMoneda()));
						setClaveServicio(encrip.cifraLlaveHex(bean.getClaveServicio()));
						setNombrePublicacion(encrip.cifraLlaveHex(bean.getNombrePublicacion()));;
						setTipoTransaccion(encrip.cifraLlaveHex(bean.getTipoTransaccion()));
						setIdioma(encrip.cifraLlaveHex(bean.getIdioma()));
						setFolioTienda(encrip.cifraLlaveHex(bean.getFolioTienda()));
						setImporte(encrip.cifraLlaveHex(bean.getImporte()));
						setImportBD(String.valueOf(configBean.getMontoAnticipoColeg()));
						HttpServletRequest request = (HttpServletRequest)FacesContext.getCurrentInstance().getExternalContext().getRequest();
						
						setUrl(getString("validaAdeudo"));
						setUrlRegreso(encrip.cifraLlaveHex(getString("urlRegreso")));
						setUrlAviso(encrip.cifraLlaveHex(getString("urlAviso")));
						
						if (request != null) {
							alumno = (Alumno) request.getSession().getAttribute(
									"usuario");
							setMatricula(encrip.cifraLlaveHex("A" + alumno.getMatricula()));
							setNombre(encrip.cifraLlaveHex(alumno.getNombre() + " " + alumno.getaPaterno() + " " + alumno.getaMaterno()));
							setCampus(encrip.cifraLlaveHex(alumno.getCod_campus()));
							setEmail(encrip.cifraLlaveHex(alumno.getCorreo()));
					}
				}
			}

		return "pagarAnticipo";
	}
	
	
	public static String getString(String key) {
		String valor = "";
		try {
			
			FacesContext context = FacesContext.getCurrentInstance();
			InputStream inputStream = context.getExternalContext().getResourceAsStream("/WEB-INF/checkout.properties");
			Properties properties = new Properties();  
            properties.load(inputStream);
			valor = properties.getProperty(key);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return valor;
	}
	
	
	public String inscripcion(){
		
		//Determinamos el tipo de Alumno para determinar que opciones del menu se pintarán
		FacesContext context = FacesContext.getCurrentInstance();
		SesionMB bean = (SesionMB) context.getApplication()
				.evaluateExpressionGet(context, "#{sesionMB}",
						SesionMB.class);
		HttpServletRequest request = (HttpServletRequest) FacesContext
				.getCurrentInstance().getExternalContext().getRequest();
		
		Alumno alumnoBean=bean.getAlumno();
		
		inicioFlujo check = new inicioFlujo();
		
		if(bean!=null){
			if(alumnoBean.getTipoAlumno().equals("C") || alumnoBean.getTipoAlumno().equals("N")){
				EstadoOpcionesFlujo estadoOpcionesFlujo =  EstadoOpcionesFlujo.getEstadoOpcionesFlujo("horario");
				bean.setActivoMenu(estadoOpcionesFlujo.isActivoMenu());
				bean.setActivoPrevios(estadoOpcionesFlujo.isActivoPrevios());
				bean.setActivoHorario(estadoOpcionesFlujo.isActivoHorario());
				bean.setActivoBoleta(estadoOpcionesFlujo.isActivoBoleta());
				bean.setActivoConsulta(estadoOpcionesFlujo.isActivoConsulta());
				
				if(check.alumnoConPago(alumnoBean)){
					request.setAttribute("actvRegreso","No");
					bean.setActivoRegreso(false);
				}
				else
				{
					//Revisar si tiene ya una inscripción
					if(alumnoBean.getInscrito_en_Banner())
					{
						request.setAttribute("actvRegreso","No");
						bean.setActivoRegreso(false);
					
					}else{
					//Mostrar pantalla de Anticipo de Pago
						request.setAttribute("actvRegreso","Si");
						bean.setActivoRegreso(true);
					}
				}
			}
		}
		
		return "index"; 
	}
	
	public String regresar(){
		return "regresar";
	}
	
	public String pagar(){
		return "pagar";
	}
	
	public String checkout() 
	{
		return "checkout";
	}
	
	public String finalizar(){
		return "finalizar";
	}
	
	public boolean validaHold(){
		return true;
	}

	public String goToPagoAnticipo() {

		return "pagoAnticipo";
	}

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}

	public String getCodigoCampus() {
		return codigoCampus;
	}

	public void setCodigoCampus(String codigoCampus) {
		this.codigoCampus = codigoCampus;
	}

	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	public String getMensajeError() {
		return mensajeError;
	}

	public void setMensajeError(String mensajeError) {
		this.mensajeError = mensajeError;
	}

	public Alumno getAlumno() {
		return alumno;
	}

	public void setAlumno(Alumno alumno) {
		this.alumno = alumno;
	}

	public boolean isTipoAlumnoAnticipo() {
		return tipoAlumnoAnticipo;
	}

	public void setTipoAlumnoAnticipo(boolean tipoAlumnoAnticipo) {
		this.tipoAlumnoAnticipo = tipoAlumnoAnticipo;
	}

	public String getNivel() {
		return nivel;
	}

	public void setNivel(String nivel) {
		this.nivel = nivel;
	}


	public String getCantidad() {
		return cantidad;
	}


	public void setCantidad(String cantidad) {
		this.cantidad = cantidad;
	}


	public String getCodigoTienda() {
		return codigoTienda;
	}


	public void setCodigoTienda(String codigoTienda) {
		this.codigoTienda = codigoTienda;
	}


	public String getLlaveTienda() {
		return llaveTienda;
	}


	public void setLlaveTienda(String llaveTienda) {
		this.llaveTienda = llaveTienda;
	}


	public String getClaveTienda() {
		return claveTienda;
	}


	public void setClaveTienda(String claveTienda) {
		this.claveTienda = claveTienda;
	}


	public String getTipoMoneda() {
		return tipoMoneda;
	}


	public void setTipoMoneda(String tipoMoneda) {
		this.tipoMoneda = tipoMoneda;
	}


	public String getClaveServicio() {
		return claveServicio;
	}


	public void setClaveServicio(String claveServicio) {
		this.claveServicio = claveServicio;
	}


	public String getNombrePublicacion() {
		return nombrePublicacion;
	}


	public void setNombrePublicacion(String nombrePublicacion) {
		this.nombrePublicacion = nombrePublicacion;
	}


	public String getTipoTransaccion() {
		return tipoTransaccion;
	}


	public void setTipoTransaccion(String tipoTransaccion) {
		this.tipoTransaccion = tipoTransaccion;
	}


	public String getIdioma() {
		return idioma;
	}


	public void setIdioma(String idioma) {
		this.idioma = idioma;
	}


	public String getUrlRegreso() {
		return urlRegreso;
	}


	public void setUrlRegreso(String urlRegreso) {
		this.urlRegreso = urlRegreso;
	}


	public String getUrlAviso() {
		return urlAviso;
	}


	public void setUrlAviso(String urlAviso) {
		this.urlAviso = urlAviso;
	}


	public String getImporte() {
		return importe;
	}


	public void setImporte(String importe) {
		this.importe = importe;
	}
	

	public String getCampus() {
		return campus;
	}



	public void setCampus(String campus) {
		this.campus = campus;
	}



	public String getNombre() {
		return nombre;
	}



	public void setNombre(String nombre) {
		this.nombre = nombre;
	}



	public String getFolioTienda() {
		return folioTienda;
	}



	public void setFolioTienda(String folioTienda) {
		this.folioTienda = folioTienda;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getUrl() {
		return url;
	}



	public void setUrl(String url) {
		this.url = url;
	}



	public String getImportBD() {
		return importBD;
	}



	public void setImportBD(String importBD) {
		this.importBD = importBD;
	}
	
	

}
