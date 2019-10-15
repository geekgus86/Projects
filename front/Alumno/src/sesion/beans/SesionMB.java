package sesion.beans;


import java.io.IOException;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mx.itesm.security.Credencial;
import mx.itesm.sistema.inscripciones.comunes.pojo.ConstantesComunes;

import com.sidiAlumno.general.Alumno;
import com.sidiAlumno.general.ConstantesSiDI;
import com.sidiAlumno.general.ImagenesColorEstatusProceso;
import com.sidiAlumno.general.exception.BusinessSessionException;
import com.sidiAlumno.general.validaStatus.EstatusProcesoInscripcion;
import com.sidiAlumno.general.validaStatus.ResultadoEstatusProcesoInscripcion;
import com.sidiAlumno.sesion.ManagerConections;
import com.sidiAlumno.sesion.business.tx.TxAlumno;
public class SesionMB {

	private String usuario;
	private String clavePerfil;
	private String campus;
	private String periodo;
	private String carrera;
	private String concentracion;
	private String modalidad;
	private String nivel;
	private Alumno alumno;
	private String mensajeError;
	private String tipoAlumno;
	


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
	private boolean esPaginaHorario;
	private String campoCerrarSesion;
	
	private boolean activoMenu = true;
	private boolean activoPrevios = true;
	private boolean activoHorario = true;
	private boolean activoBoleta = true;
	private boolean activoConsulta = true;
	private boolean activoRegreso = false;
	
	public static final String CAMBIO_DE_NIVEL = "C";
	public static final String NUEVO_INGRESO = "N";
	public static final String OTRO = "O";
	
	private String importe;
	private String cantidad;
	private String codigoTienda;
	private String llaveTienda;
	private String claveTienda;
	private String folioTienda;
	private String tipoMoneda;
	private String claveServicio;
	private String nombrePublicacion;
	private String tipoTransaccion;
	private String idioma;
	private String target;
	
	
	public String getCampoCerrarSesion() {
		cerrarSesionSinLogin();
		return campoCerrarSesion;
	}

	public void setCampoCerrarSesion(String campoCerrarSesion) {
		this.campoCerrarSesion = campoCerrarSesion;
	}

	@SuppressWarnings("static-access")
	public SesionMB() 
	{
		
		HttpServletRequest request = (HttpServletRequest) FacesContext
				.getCurrentInstance().getExternalContext().getRequest();
		if (request == null || request.getParameter("id") == null) {
			System.out.println("EL REQUEST O EL ID SON NULOS  ");
			System.out.println("REQUEST " + request);
			System.out.println("ID  " + request.getParameter("id"));
			setMensajeError(ConstantesComunes.MENSAJE_USUARIO_SIN_SESION);
			FacesContext.getCurrentInstance().getExternalContext()
					.getSessionMap().put("sesionMB", null);
		} else {
			
			
			System.out.println("EL REQUEST Y EL ID NO SON NULOS  ");
			System.out.println("REQUEST " + request);
			System.out.println("ID  " + request.getParameter("id"));
			// TODO
			// http://stackoverflow.com/questions/4128436/query-string-manipulation-in-java
			//String id = request.getQueryString().split("=")[1];
			
			String paso=(request.getQueryString().substring(3,request.getQueryString().length())).trim();
			String [] sacoValor = paso.split("&");
			String id ="";
			if(sacoValor.length>1){
				id = sacoValor[0] ;
			}else{
				id=paso;
			}
			
			System.out.println("ID DESPUES DEL GETQUERYSTRING " + id);
						
			Credencial cre = new Credencial();
			// String id = request.getParameter("id");

			TxAlumno txAlumno = new TxAlumno();
			
			//System.out.println("ALUMNO ANTES DE SER SETEADO " + alumno);
			
			System.out.println("DESENCRIPTA MATRICULA " + cre.desencriptaMatricula(id));
			System.out.println("DESENCRIPTA PERIODO " + cre.desencriptaPeriodo(id));
			System.out.println("DESENCRIPTA CAMPUS " + cre.desencriptaCampus(id));
			
			try {
				alumno = txAlumno.getDatosAlumno(
						cre.desencriptaMatricula(id),
						cre.desencriptaPeriodo(id), cre.desencriptaCampus(id));
				
				//alumno.setInmendiato(cre.desencriptarInmediato(id));
				//alumno.setLejano(cre.desencriptarLejano(id));
				
				System.out.println("ALUMNO DESPUES DE SER SETEADO " + alumno);
				
				
				if (alumno != null) {
					
					System.out.println("MATRICULA DEL ALUMNO " + alumno.getMatricula());
					
					setPeriodo(alumno.getPeriodo());
					setCampus(alumno.getCampus());
					setClavePerfil(alumno.getMatricula());
					setUsuario( alumno.getNombre() + " " +
								(alumno.getaPaterno() == null ? "" : alumno.getaPaterno()) + " " +
								(alumno.getaMaterno() == null ? "" : alumno.getaMaterno()));
					setCarrera(alumno.getCod_carrera());
					setConcentracion(alumno.getConcentracion());
					setModalidad(alumno.getModalidad());
					
					//Seteamos el tipo de Alumno
					
					alumno.setTipoAlumno(estableceTipoAlumno(alumno.getCod_adminision()));

					HttpSession sesion = request.getSession();
					sesion.setAttribute("usuario", alumno);
					sesion.setMaxInactiveInterval(30 * 60);

//					calculaDetalleProcesoAlumno();
					
					//leeEstatus();

					// recuperando Bean
//					FacesContext context = FacesContext.getCurrentInstance();
//					SesionMB bean = (SesionMB) context.getApplication()
//							.evaluateExpressionGet(context, "#{sesionMB}",
//									SesionMB.class);
//					if (bean != null) {
//
//						bean.setPeriodo(alumno.getPeriodo());
//						bean.setCampus(alumno.getCampus());
//						bean.setClavePerfil(alumno.getMatricula());
//						bean.setUsuario(alumno.getNombre() + " "
//								+ alumno.getaPaterno() + " "
//								+ alumno.getaMaterno());
//						bean.setCarrera(alumno.getCarrera());
//						bean.setConcentracion(alumno.getConcentracion());
//						bean.setModalidad(alumno.getModalidad());
//					}
//
//					String uri = "index.xhtml";
//					try {
//						FacesContext.getCurrentInstance().getExternalContext()
//								.redirect(uri);
//					} catch (IOException e) {
//						e.printStackTrace();
//					}
					
					/*
					try{
						Cookie estadoCuenta= null;
						String cookieValue = mx.itesm.utilerias.Encriptacion.encrypt("8wyT6aRbk","{\"Matricula\":\"a"+alumno.getMatricula()+"\",\"PIDM\":\""+alumno.getPidem()+"\",\"Correo\":\""+alumno.getCorreo() +"\"}");
						System.out.println("valor de cookie encriptado: " + cookieValue);
						System.out.println("valor de cookie plano: " +  mx.itesm.utilerias.Encriptacion.decrypt("8wyT6aRbk",cookieValue ));
						estadoCuenta = new Cookie("estadoCuenta", cookieValue);
						
						HttpServletResponse response = (HttpServletResponse) FacesContext
								.getCurrentInstance().getExternalContext().getResponse();
						response.addCookie(estadoCuenta);
								}catch(Exception ex){ex.printStackTrace();}
								*/
					sesion = request.getSession();
					alumno = (Alumno) sesion.getAttribute("usuario");
					
					calculaDetalleProcesoAlumno();
					System.out.println("ALUMNO EN ATRIBUTO DE SESSION " + alumno);
					System.out.println("MATRICULA ALUMNO EN ATRIBUTO DE SESSION " + alumno.getMatricula());
					
					if(sacoValor.length>1){
						String [] paramVal=sacoValor[1].split("=");
						sesion.setAttribute(paramVal[0], paramVal[1]);
					}
					
				}
			} catch (BusinessSessionException ex) {
				System.out.println("EXCEPCION BUSINESS " + ex.getMessage());
				ex.printStackTrace();
			}

		}
	}
	
	public void calculaDetalleProcesoAlumno() {
		
		HttpServletRequest request = (HttpServletRequest)FacesContext.getCurrentInstance().getExternalContext().getRequest();
		
		if(request == null)
		{
			return;
		}
		
		Alumno alumno = (Alumno) request.getSession().getAttribute("usuario");
		
		if(alumno != null) {
			
			leeEstatus(alumno);
			
			ImagenesColorEstatusProceso configActivPerevias = ImagenesColorEstatusProceso.getConfigActPrevias(alumno);
			
			colorActividadesPrevias = configActivPerevias.getColor();
			imagenActividadesPrevias = configActivPerevias.getImagen();
			habilitaActividadesPrevias = configActivPerevias.isDisabled();

			ImagenesColorEstatusProceso configHorario = ImagenesColorEstatusProceso.getConfigHorario(alumno);
			
			colorHorario = configHorario.getColor();
			imagenHorario = configHorario.getImagen();
			habilitaHorario = configHorario.isDisabled();

			ImagenesColorEstatusProceso configBoletaPago = ImagenesColorEstatusProceso.getConfigBoletaPago(alumno);
			
			colorBoletaPago = configBoletaPago.getColor();
			imagenBoletaPago = configBoletaPago.getImagen();
			habilitaBoletaPago = configBoletaPago.isDisabled();

			ImagenesColorEstatusProceso configConsultaInscr = ImagenesColorEstatusProceso.getConfigConsultaInsc(alumno);
			
			colorConsultaInscrip = configConsultaInscr.getColor();
			imagenConsultaInscrip = configConsultaInscr.getImagen();
			habilitaConsultaInscrip = configConsultaInscr.isDisabled();
			
			request.getSession().setAttribute("usuario", alumno);
			
		}
		else {
			System.out.println("usuario nulo");
		}
	}
	
	public String cerrarSesionSinLogin() {
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance()
				.getExternalContext().getSession(false);
		session.setAttribute("usuario", null);
		if (session != null) {
			session.invalidate();
		}
		return "";
	}
	
	public String estableceTipoAlumno(String paramCodigoAdmision){
		String tipoAlumno = OTRO;
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
					tipoAlumno = CAMBIO_DE_NIVEL;

					// Validamos que si es transferencia con cambio de nivel
				} else if (strCodigoAdmisionMayus.startsWith("E")
						|| strCodigoAdmisionMayus.startsWith("F")
						|| strCodigoAdmisionMayus.startsWith("J")
						|| strCodigoAdmisionMayus.startsWith("O")
						|| strCodigoAdmisionMayus.startsWith("U")
						|| strCodigoAdmisionMayus.startsWith("W")) {
					System.out
							.println("El alumno es Transferencia con cambio de nivel ");
					tipoAlumno = CAMBIO_DE_NIVEL;

				} else if (strCodigoAdmisionMayus.startsWith("1")
						|| strCodigoAdmisionMayus.startsWith("2")
						|| strCodigoAdmisionMayus.startsWith("3")
						|| strCodigoAdmisionMayus.startsWith("4")
						|| strCodigoAdmisionMayus.startsWith("A")
						|| strCodigoAdmisionMayus.startsWith("C")
						|| strCodigoAdmisionMayus.startsWith("G")
						|| strCodigoAdmisionMayus.startsWith("K")
						|| strCodigoAdmisionMayus.startsWith("N")) {
					System.out
					.println("El alumno es Primer ingreso al sistema ");
					tipoAlumno = NUEVO_INGRESO;
				}
				return tipoAlumno;
	}
	
	public String cerrarSesion() {

		String uri = "";
		String campus = "";
		String perfil = "";
		Alumno alumnoSesion = null;

		HttpSession session = (HttpSession) FacesContext.getCurrentInstance()
				.getExternalContext().getSession(false);

		HttpServletRequest request = (HttpServletRequest) FacesContext
				.getCurrentInstance().getExternalContext().getRequest();

		Cookie[] cookies = request.getCookies();
		Cookie java = null;
		Cookie campusCk = null;
		Cookie perfilCk = null;
		
		if (cookies != null)
			for (Cookie ck : cookies) {
				if ("campusSiDI".equals(ck.getName())) {
					campus = ck.getValue();
					campusCk = ck;
				}
				if ("perfilSiDI".equals(ck.getName())) {
					perfil= ck.getValue();
					perfilCk = ck;
				}
				
				if ("JSESSIONID".equals(ck.getName())) {
					java= ck;
				}
				
				
			}

		java.setValue("");
		java.setMaxAge(0);
		perfilCk.setValue("");
		perfilCk.setMaxAge(0);
		campusCk.setValue("");
		campusCk.setMaxAge(0);

		HttpServletResponse response = (HttpServletResponse) FacesContext
				.getCurrentInstance().getExternalContext().getResponse();
		response.addCookie(java);
		response.addCookie(perfilCk);
		response.addCookie(campusCk);
		
		if (session != null) {

			// Obtenemos el usuario de la sesión

			if (session.getAttribute("usuario") != null) {

				alumnoSesion = (Alumno) session.getAttribute("usuario");
				session.setAttribute("usuario", null);
				session.invalidate();
				
			}

		}

		
				if (campus != null && perfil != null) {
					uri = "/sidiweb/Principal/entrada?perfil=" + perfil + "&campus="
							+ campus +"#no-back-button";
				} else {
					uri = "/sidiweb/Principal/entrada#no-back-button";
				}

		

		try {
			FacesContext.getCurrentInstance().getExternalContext().redirect(uri);
			//ExternalContext contexto = FacesContext.getCurrentInstance().getExternalContext();
			//contexto.dispatch(uri);
			//FacesContext context = FacesContext.getCurrentInstance();
			//context.getApplication().getNavigationHandler().handleNavigation(context, null, uri);

		} catch (Exception e) {
			e.printStackTrace();
		}
		// Redirect a login de sidi
		return uri;
	}
	
	public void cerrarSesion2(){
		String uri = "";
		String campus = "";
		String perfil = "";
		Alumno alumnoSesion = null;

		HttpSession session = (HttpSession) FacesContext.getCurrentInstance()
				.getExternalContext().getSession(false);

		HttpServletRequest request = (HttpServletRequest) FacesContext
				.getCurrentInstance().getExternalContext().getRequest();

		Cookie[] cookies = request.getCookies();
		
		if (cookies != null)
			for (Cookie ck : cookies) {
				if ("campusSiDI".equals(ck.getName())) {
					campus = ck.getValue();
				}
				if ("perfilSiDI".equals(ck.getName())) {
					perfil= ck.getValue();
				}
			}

		if (session != null) {

			// Obtenemos el usuario de la sesión

			if (session.getAttribute("usuario") != null) {

				alumnoSesion = (Alumno) session.getAttribute("usuario");
				session.setAttribute("usuario", null);
				session.invalidate();
			}

		}

		
		if (campus != null && perfil != null) {
			uri = "/sidiweb/Principal/entrada?perfil=" + perfil + "&campus="
					+ campus +"#no-back-button";
		} else {
			uri = "/sidiweb/Principal/entrada#no-back-button";
		}
		
		try {
			
			String contexto = FacesContext.getCurrentInstance().getExternalContext().getContext().toString();
			System.out.println(contexto);
			FacesContext.getCurrentInstance().getExternalContext().redirect(uri);
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void leeEstatus(Alumno alumno) {
		
		EstatusProcesoInscripcion estatusProcesoInscripcion = new EstatusProcesoInscripcion();

		ResultadoEstatusProcesoInscripcion resultadoEstatusProcesoInscripcion = estatusProcesoInscripcion
				.estatusInscripcionBanner(
						Long.parseLong(alumno.getPidem()),
						alumno.getPeriodo(),
						ManagerConections.getBannerConection());

		if (resultadoEstatusProcesoInscripcion.getEstatusProcesoInscripcion().equalsIgnoreCase("0")
				|| resultadoEstatusProcesoInscripcion.getEstatusProcesoInscripcion().equalsIgnoreCase("1")
				|| resultadoEstatusProcesoInscripcion.getEstatusProcesoInscripcion().equalsIgnoreCase("2")) {
			alumno.setEstatusHorario(1);
			alumno.setEstatusBoletaPago(0);
			alumno.setEstatusConfirmaInscr(0);
		} else if (resultadoEstatusProcesoInscripcion.getEstatusProcesoInscripcion().equalsIgnoreCase("3")
						|| resultadoEstatusProcesoInscripcion.getEstatusProcesoInscripcion().equalsIgnoreCase("4")) {
			alumno.setEstatusHorario(2);
			alumno.setEstatusBoletaPago(1);
			alumno.setEstatusConfirmaInscr(0);
		} else if (resultadoEstatusProcesoInscripcion.getEstatusProcesoInscripcion().equalsIgnoreCase("5") || resultadoEstatusProcesoInscripcion.getEstatusProcesoInscripcion().equalsIgnoreCase("6")) {
			alumno.setEstatusHorario(2);
			alumno.setEstatusBoletaPago(2);
			alumno.setEstatusConfirmaInscr(1);
		}
	}

	public String getImporte() {
		return importe;
	}

	public void setImporte(String importe) {
		this.importe = importe;
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

	public String getFolioTienda() {
		return folioTienda;
	}

	public void setFolioTienda(String folioTienda) {
		this.folioTienda = folioTienda;
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

	public String getMensajeError() {
		return mensajeError;
	}

	public void setMensajeError(String mensajeError) {
		this.mensajeError = mensajeError;
	}

	public String getPeriodo() {
		return periodo;
	}

	public String getPeriodoDesc() {
		return alumno.getPeriodoDesc();
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	public String getCampus() {
		return campus;
	}

	public void setCampus(String campus) {
		this.campus = campus;
	}

	public String getNivel() {
		return nivel;
	}

	public void setNivel(String nivel) {
		this.nivel = nivel;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getClavePerfil() {
		return clavePerfil;
	}
	public String getClavePerfilCompleto() {
		
		if(clavePerfil != null && !clavePerfil.startsWith(ConstantesSiDI.INICIAL_MATRICULA)) {
			return ConstantesSiDI.INICIAL_MATRICULA + clavePerfil;
		}
		return clavePerfil;
	}

	public void setClavePerfil(String clavePerfil) {
		this.clavePerfil = clavePerfil;
	}

	public String getCarrera() {
		return carrera;
	}

	public void setCarrera(String carrera) {
		this.carrera = carrera;
	}

	public String getModalidad() {
		return modalidad;
	}

	public void setModalidad(String modalidad) {
		this.modalidad = modalidad;
	}

	public String getConcentracion() {
		return concentracion;
	}

	public void setConcentracion(String concentracion) {
		this.concentracion = concentracion;
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
		
		calculaDetalleProcesoAlumno();
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

	public Alumno getAlumno() {
		return alumno;
	}

	public void setAlumno(Alumno alumno) {
		this.alumno = alumno;
	}

	public boolean isEsPaginaHorario() {
		return esPaginaHorario;
	}

	public void setEsPaginaHorario(boolean esPaginaHorario) {
		this.esPaginaHorario = esPaginaHorario;
	}

	public boolean isActivoMenu() {
		return activoMenu;
	}

	public void setActivoMenu(boolean activoMenu) {
		this.activoMenu = activoMenu;
	}

	public boolean isActivoPrevios() {
		return activoPrevios;
	}

	public void setActivoPrevios(boolean activoPrevios) {
		this.activoPrevios = activoPrevios;
	}

	public boolean isActivoHorario() {
		return activoHorario;
	}

	public void setActivoHorario(boolean activoHorario) {
		this.activoHorario = activoHorario;
	}

	public boolean isActivoBoleta() {
		return activoBoleta;
	}

	public void setActivoBoleta(boolean activoBoleta) {
		this.activoBoleta = activoBoleta;
	}

	public boolean isActivoConsulta() {
		return activoConsulta;
	}

	public void setActivoConsulta(boolean activoConsulta) {
		this.activoConsulta = activoConsulta;
	}

	public String getTipoAlumno() {
		return tipoAlumno;
	}

	public void setTipoAlumno(String tipoAlumno) {
		this.tipoAlumno = tipoAlumno;
	}

	public boolean isActivoRegreso() {
		return activoRegreso;
	}

	public void setActivoRegreso(boolean activoRegreso) {
		this.activoRegreso = activoRegreso;
	}
	

}
