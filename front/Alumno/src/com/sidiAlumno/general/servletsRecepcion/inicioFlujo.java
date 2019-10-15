package com.sidiAlumno.general.servletsRecepcion;

import java.io.IOException;

import javax.faces.context.FacesContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;




//import org.tempuri.ConsultaPedido;
import org.tempuri.ResultadoConsultaPedido;
import org.tempuri.WebServicesGestorPagoTiendasSoapProxy;

import mx.itesm.security.Credencial;

import com.sidiAlumno.general.Alumno;
import com.sidiAlumno.general.Archivo;
import com.sidiAlumno.general.ConfigPreins;
import com.sidiAlumno.general.ImagenesColorEstatusProceso;
import com.sidiAlumno.general.RespuestaGestor;
import com.sidiAlumno.general.exception.BusinessSessionException;
import com.sidiAlumno.sesion.business.tx.TxAlumno;
import com.sidiAlumno.sesion.business.tx.TxConfPreinscripcion;
import com.sidiAlumno.sesion.business.tx.TxRespGes;
import com.sidiAlumno.sesion.business.tx.TxArchivo;

import resources.*;
import sesion.beans.SesionMB;

/**
 * Servlet implementation class inicioFlujo
 */
public class inicioFlujo extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private Alumno alumno;
	private RespuestaGestor resGP;
	private Archivo archivoGP;
	
	public static final String CAMBIO_DE_NIVEL = "C";
	public static final String NUEVO_INGRESO = "N";
	public static final String OTRO = "O";
	
	
	public static final String PROCESO_PREINSCRIPCION_A_PAGAR = "PP";
	public static final String PROCESO_PREINSCRIPCION_HORARIO = "PH";
	public static final String PROCESO_INSCRIPCION = "I";
	public static final String PROCESO_INSCRIPCION_ADELANTADA = "IA";
	
	public static final String CVE_TIENDA_SIDI = "29";
	public static final String CODIGO_TIENDA_SIDI = "PRESIDI";
	public static final String LLAVE_TIENDA_SIDI = "SIDIPREI";
	
	
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public inicioFlujo() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings("static-access")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{		
		if (request == null || request.getParameter("id") == null) {
			FacesContext.getCurrentInstance().getExternalContext()
					.getSessionMap().put("sesionMB", null);
		} 
		else 
		{	
			String paso=(request.getQueryString().substring(3,request.getQueryString().length())).trim();
			String [] sacoValor = paso.split("&");
			String id ="";
			if(sacoValor.length>1){
				id = sacoValor[0] ;
			}else{
				id=paso;
			}

			Credencial cre = new Credencial();
			TxAlumno txAlumno = new TxAlumno();
			
			try {
				alumno = txAlumno.getDatosAlumno(
						cre.desencriptaMatricula(id),
						cre.desencriptaPeriodo(id), cre.desencriptaCampus(id));
				
				
				if (alumno != null) {
					
					
					alumno.setTipoAlumno(estableceTipoAlumno(alumno.getCod_adminision()));
	
					HttpSession sesion = request.getSession();
					sesion.setAttribute("usuario", alumno);
					sesion.setMaxInactiveInterval(30 * 60);
	
					sesion = request.getSession();
					alumno = (Alumno) sesion.getAttribute("usuario");
					
					String tipoPeriodo = (String) sesion.getAttribute("tipoPeriodo");
					String proceso = determinarProceso(alumno, Integer.parseInt(tipoPeriodo));
					
					String url = "id="+id;
					
					// Se va por el flujo normal
					if(proceso.equals(PROCESO_INSCRIPCION) || proceso.equals(PROCESO_INSCRIPCION_ADELANTADA))
					{	
	                	response.sendRedirect("/Alumno/faces/index.xhtml?"+url);
					}
					else // Flujo de preinscripcion
					{						
						
						if(proceso.equals(PROCESO_PREINSCRIPCION_A_PAGAR))
						{
							deshabilitarMenu();
							response.sendRedirect("/Alumno/faces/pagoAnticipo.xhtml?"+url);
						}
						else
						{
							if(proceso.equals(PROCESO_PREINSCRIPCION_HORARIO))
							{
								sesion.setAttribute("Preinscripcion", PROCESO_PREINSCRIPCION_HORARIO);							
								
								if(mostrarHorarioPreinsc(alumno.getCod_nivel(), alumno.getPeriodo(), alumno.getCod_campus()))
								{
									response.sendRedirect("/Alumno/faces/PreInshorario.xhtml");
								} else {
									response.sendRedirect("/Alumno/faces/finProcesoPago.xhtml");
								}
							}
						}
					}
			
				}
			} catch (BusinessSessionException ex) {
				System.out.println("BusinessSessionException: " + ex.getMessage());
				ex.printStackTrace();
			}
		}
	}
	
	/**
	 * Método regresa si se debe o no mmostrar el horario de Preinscripción
	 * @param nivel
	 * @param periodo 
	 * @param campus
	 * @return true: Mostrar el horario
	 * @author Yestrada
	 * @since Junio 2015
	 */
    public boolean mostrarHorarioPreinsc(String nivel, String periodo, String campus)
    {
    	TxConfPreinscripcion confPreins = new TxConfPreinscripcion();    	
    	ConfigPreins config = confPreins.getConfPreins(nivel, periodo, campus);
    	
    	return config.getConfigHorario();
    }
	

	public void deshabilitarMenu()
	{	
		SesionMB bean = new SesionMB();
		
		bean.setHabilitaActividadesPrevias(false);
		bean.setHabilitaHorario(false);
		bean.setHabilitaBoletaPago(false);
		bean.setHabilitaConsultaInscrip(false);
		
		bean.setActivoMenu(false);
		bean.setActivoPrevios(false);
		bean.setActivoHorario(false);
		bean.setActivoBoleta(false);
		bean.setActivoConsulta(false);
	}
	
	/**
	 * Se determina que tipo de alumno: Cambio de nivel(C), Nuevo ingreso(N), Otro(O)
	 * @paramCodigoAdmision Regresa un string
	 */
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
	
	/*
	 * Determinar el tipo de proceso de inscripcion que se realizará
	 * Proceso de: Inscripcion (I), Inscripción Adelantada (IA) o Preinscripción a pagar (PA), Preinscripcion Horario (PH)
	 */
	public String determinarProceso(Alumno alumno, int tipoPeriodo){
		
		//Valido si el alumno es de tipo preinscripción
		String tipoAlumno = alumno.getTipoAlumno();

		if(tipoPeriodo==1){ // Si el periodo seleccionado es de Preinscripción
			if(tipoAlumno=="N" || tipoAlumno=="C")	// Si el alumno es de preinscripción (N-Nvo Ingreso, C-Cambio de Nivel)	
			{
				//Buscar si el alumno ha pagado
				if(alumnoConPago(alumno))
					return PROCESO_PREINSCRIPCION_HORARIO;	
				else
				{
					//Revisar si tiene ya una inscripción
					if(alumno.getInscrito_en_Banner())
					{
						return PROCESO_INSCRIPCION_ADELANTADA;
					}
					//Mostrar pantalla de Anticipo de Pago
					return PROCESO_PREINSCRIPCION_A_PAGAR;
				}
			}
		}
		return PROCESO_INSCRIPCION;
	}
	
	/**
	 * Busca si el aluno cuenta con algun pago
	 */
	public boolean alumnoConPago(Alumno alumno)
	{
		TxRespGes txRespGestor = new TxRespGes();
		try
		{
			resGP = txRespGestor.getObtenerPedido(
					alumno.getMatricula(),
					alumno.getPeriodo(),
					alumno.getCod_campus());
			
			if(resGP==null){
				resGP.setPedido(0);
			}
		
			int idPedido = resGP.getPedido();
			System.out.println("IDPedido Obtenido en alumnoConPago: "+idPedido);
			
			if(idPedido!=0)// Si se realizó un pago (exitoso) desde el SIDI
			{
				// Busco el pedido en el Gestor de Pagos por medio de un WS-ConsultaPedido			
				try{
					double monto = 0;
					XMLConstructorAndDestructor xmlPedido = new XMLConstructorAndDestructor();
					ResultadoConsultaPedido res = xmlPedido.consultarPedido(CVE_TIENDA_SIDI, CODIGO_TIENDA_SIDI, LLAVE_TIENDA_SIDI, String.valueOf(idPedido));
					System.out.println("El monto del pedido idPEdido es:"+monto);
					if(res.getDescripcionEstatus().trim().equalsIgnoreCase("pagado"))
						return true;
					else
						return false;
				}
				catch(Exception e)
				{
					System.out.println("Exception al consultar el Pedido: " + e.getMessage());
				}
			}
			else // Si no se ha realizado ningun pago desde el SIDI
			{
				//Busco en el archivo de alumnos que pagaron 
				TxArchivo txArchivo = new TxArchivo();
				archivoGP = txArchivo.getObtenerDatosArchivo(
						alumno.getMatricula(),
						alumno.getPeriodo(),
						alumno.getCod_campus(),
						alumno.getCod_nivel());
				
				// Si existe al menos un registro
				if(archivoGP.getNumRegistro()>0)
					return true;
				else
					return false;
				
			}
		}catch (Exception ex) {
			System.out.println("Exception: " + ex.getMessage());
			ex.printStackTrace();
		}
		
		return false;
	}

}
