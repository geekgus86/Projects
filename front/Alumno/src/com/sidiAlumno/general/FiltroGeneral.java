package com.sidiAlumno.general;

import java.io.IOException;

import javax.faces.context.FacesContext;
import javax.faces.event.PhaseEvent;
import javax.faces.event.PhaseId;
import javax.faces.event.PhaseListener;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import mx.itesm.security.Credencial;
import sesion.beans.SesionMB;

import com.sidiAlumno.general.exception.BusinessSessionException;
import com.sidiAlumno.sesion.business.tx.TxAlumno;

public class FiltroGeneral implements PhaseListener {

	public void beforePhase(PhaseEvent event) {
	}

	public void afterPhase(PhaseEvent event) {

		if (FacesContext.getCurrentInstance() != null) {
			if (FacesContext.getCurrentInstance().getExternalContext() != null) {
				if (FacesContext.getCurrentInstance().getExternalContext()
						.getRequest() != null) {
					FacesContext fc = event.getFacesContext();

					HttpServletRequest req = (HttpServletRequest) FacesContext
							.getCurrentInstance().getExternalContext()
							.getRequest();

					SesionMB bean = (SesionMB) fc.getApplication()
							.evaluateExpressionGet(fc, "#{sesionMB}",
									SesionMB.class);

					// llemos la información del bean y del request para
					// comparar

					if (bean != null) {
						
//						bean.setEsPaginaHorario(false);
//
//						if (req.getRequestURI().equalsIgnoreCase(
//								"/Alumno/faces/horario.xhtml") || req.getRequestURI().equalsIgnoreCase(
//										"/Alumno/faces/menuBoletaPago.xhtml")) {
//							bean.setEsPaginaHorario(true);
//						}
//						
						if (req.getQueryString() != null && req.getRequestURI().contains("index.xhtml")) {
							String id = req.getQueryString().split("=")[1];
							TxAlumno txAlumno = new TxAlumno();

							Alumno alumno;
							try {
								alumno = txAlumno.getDatosAlumno(
										Credencial.desencriptaMatricula(id),
										Credencial.desencriptaPeriodo(id),
										Credencial.desencriptaCampus(id));

								System.out
										.println("ALUMNO DESPUES DE SER SETEADO "
												+ alumno);

								if (alumno != null) {

									System.out.println("MATRICULA DEL ALUMNO "
											+ alumno.getMatricula());

									bean.setPeriodo(alumno.getPeriodo());
									bean.setCampus(alumno.getCampus());
									bean.setClavePerfil(alumno.getMatricula());
									bean.setUsuario(alumno.getNombre()
											+ " "
											+ (alumno.getaPaterno() == null ? ""
													: alumno.getaPaterno())
											+ " "
											+ (alumno.getaMaterno() == null ? ""
													: alumno.getaMaterno()));
									bean.setCarrera(alumno.getCod_carrera());
									bean.setConcentracion(alumno
											.getConcentracion());
									bean.setModalidad(alumno.getModalidad());

									// Seteamos el tipo de Alumno

									alumno.setTipoAlumno(bean
											.estableceTipoAlumno(alumno
													.getCod_adminision()));
									
									bean.setTipoAlumno(alumno.getTipoAlumno());
									
									HttpSession sesion = req.getSession();
									sesion.setAttribute("usuario", alumno);
									sesion.setMaxInactiveInterval(30 * 60);
									
									bean.setAlumno(alumno);
									
									//Seinicializan las variables en true temporalmente en lo que se mete lógica de pago anticipo
									EstadoOpcionesFlujo estadoOpcionesFlujo =  EstadoOpcionesFlujo.getEstadoOpcionesFlujo(EstadoOpcionesFlujo.DEFAULT);
									bean.setActivoMenu(estadoOpcionesFlujo.isActivoMenu());
									bean.setActivoPrevios(estadoOpcionesFlujo.isActivoPrevios());
									bean.setActivoHorario(estadoOpcionesFlujo.isActivoHorario());
									bean.setActivoBoleta(estadoOpcionesFlujo.isActivoBoleta());
									bean.setActivoConsulta(estadoOpcionesFlujo.isActivoConsulta());
									
								}

							} catch (BusinessSessionException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}


						}else{
							//Verifica si el atributo de usuario es nulo
							if(req.getSession().getAttribute("usuario") == null){
								
								String campus = "";
								String perfil = "";
								String uri = "";
								
								Cookie[] cookies = req.getCookies();
								
								if (cookies != null)
									for (Cookie ck : cookies) {
										if ("campusSiDI".equals(ck.getName())) {
											campus = ck.getValue();
										}
										if ("perfilSiDI".equals(ck.getName())) {
											perfil= ck.getValue();
										}
									}
								
								
								if (campus != null && perfil != null) {
									uri = "/sidiweb/Principal/entrada?perfil=" + perfil + "&campus="
											+ campus;
								} else {
									uri = "/sidiweb/Principal/entrada";
								}
								
								
								try {
									FacesContext.getCurrentInstance().getExternalContext().redirect(uri);
								} catch (IOException e) {
									e.printStackTrace();
								}	
							}
						}

					}

				}

			}

		}

	}

	public PhaseId getPhaseId() {
		return PhaseId.RESTORE_VIEW;
	}

}
