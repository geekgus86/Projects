package sesion.beans;

import java.io.IOException;

import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import mx.itesm.security.Credencial;
import mx.itesm.sistema.inscripciones.comunes.pojo.ConstantesComunes;

import com.sidiAlumno.general.Alumno;
import com.sidiAlumno.general.ImagenesColorEstatusProceso;
import com.sidiAlumno.general.exception.BusinessSessionException;
import com.sidiAlumno.sesion.business.tx.TxAlumno;

public class IndexRQMB {
	private String usuario;
	private String clavePerfil;
	private String campus;
	private String periodo;
	private String carrera;
	private String concentracion;
	private String modalidad;
	private String nivel;
	private String mensajeError;

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
	
	@SuppressWarnings("static-access")
	public IndexRQMB() {
		HttpServletRequest request = (HttpServletRequest) FacesContext
				.getCurrentInstance().getExternalContext().getRequest();
		if (request == null || request.getParameter("id") == null) {
			setMensajeError(ConstantesComunes.MENSAJE_USUARIO_SIN_SESION);
			FacesContext.getCurrentInstance().getExternalContext()
					.getSessionMap().put("sesionMB", null);
		} else {
			// TODO
			// http://stackoverflow.com/questions/4128436/query-string-manipulation-in-java
			String id = request.getQueryString().split("=")[1];
			Credencial cre = new Credencial();

			TxAlumno txAlumno = new TxAlumno();
			try {
				Alumno alumno = txAlumno.getDatosAlumno(
						cre.desencriptaMatricula(id),
						cre.desencriptaPeriodo(id), cre.desencriptaCampus(id));
				if (alumno != null) {
					setPeriodo(alumno.getPeriodo());
					setCampus(alumno.getCampus());
					setClavePerfil(alumno.getMatricula());
					setUsuario( alumno.getNombre() + " " +
								(alumno.getaPaterno() == null ? "" : alumno.getaPaterno()) + " " +
								(alumno.getaMaterno() == null ? "" : alumno.getaMaterno()));
					setCarrera(alumno.getCarrera());
					setConcentracion(alumno.getConcentracion());
					setModalidad(alumno.getModalidad());

					HttpSession sesion = request.getSession();
					sesion.setAttribute("usuario", alumno);
					sesion.setMaxInactiveInterval(30 * 60);

					calculaDetalleProcesoAlumno();

					// recuperando Bean
					FacesContext context = FacesContext.getCurrentInstance();
					SesionMB bean = (SesionMB) context.getApplication()
							.evaluateExpressionGet(context, "#{sesionMB}",
									SesionMB.class);
					if (bean != null) {

						bean.setPeriodo(alumno.getPeriodo());
						bean.setCampus(alumno.getCampus());
						bean.setClavePerfil(alumno.getMatricula());
						bean.setUsuario(  alumno.getNombre() + " "
										+ (alumno.getaPaterno() == null ? "" : alumno.getaPaterno()) + " "
										+ (alumno.getaMaterno() == null ? "" : alumno.getaMaterno()) );
						bean.setCarrera(alumno.getCod_carrera());
						bean.setConcentracion(alumno.getConcentracion());
						bean.setModalidad(alumno.getModalidad());
					}

					String uri = "index.xhtml";
					try {
						FacesContext.getCurrentInstance().getExternalContext()
								.redirect(uri);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			} catch (BusinessSessionException ex) {
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
			ImagenesColorEstatusProceso configActivPrevias = ImagenesColorEstatusProceso.getConfigActPrevias(alumno);
			
			colorActividadesPrevias = configActivPrevias.getColor();
			imagenActividadesPrevias = configActivPrevias.getImagen();
			habilitaActividadesPrevias = configActivPrevias.isDisabled();

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


			// recuperando Bean
			FacesContext context = FacesContext.getCurrentInstance();
			SesionMB bean = (SesionMB) context.getApplication()
					.evaluateExpressionGet(context, "#{sesionMB}",
							SesionMB.class);
			if (bean != null) {
				bean.setColorActividadesPrevias(colorActividadesPrevias);
				bean.setImagenActividadesPrevias(imagenActividadesPrevias);
				bean.setHabilitaActividadesPrevias(habilitaActividadesPrevias);

				bean.setColorHorario(colorHorario);
				bean.setImagenHorario(imagenHorario);
				bean.setHabilitaHorario(habilitaHorario);

				bean.setColorBoletaPago(colorBoletaPago);
				bean.setImagenBoletaPago(imagenBoletaPago);
				bean.setHabilitaBoletaPago(habilitaBoletaPago);

				bean.setColorConsultaInscrip(colorConsultaInscrip);
				bean.setImagenConsultaInscrip(imagenConsultaInscrip);
				bean.setHabilitaConsultaInscrip(habilitaConsultaInscrip);

			}
		}
		else {
			System.out.println("usuario nulo");
		}
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

	
	

}
