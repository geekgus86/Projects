package com.sidiAlumno.general.servletsRecepcion;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.tempuri.ResultadoConsultaPedido;

import resources.XMLConstructorAndDestructor;

import com.sidiAlumno.general.Alumno;
import com.sidiAlumno.general.ConfigPreins;
import com.sidiAlumno.general.Encripcion;
import com.sidiAlumno.negocio.ControlRespuestaGestor;
import com.sidiAlumno.sesion.business.tx.TxRespGes;
import com.sidiAlumno.sesion.business.tx.TxConfPreinscripcion;

/**
 * Servlet implementation class avisoServlet
 */
public class avisoServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
	public static final String CODIGO_TIENDA_SIDI = "PRESIDI";
	public static final String LLAVE_TIENDA_SIDI = "SIDIPREI";

    /**
     * @see HttpServlet#HttpServlet()
     */
    public avisoServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        this.doPost(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
        	System.out.println("<-----------------AQUI COMIENZAN LOS LOGS DEL REGRESO DEL CHECKOUT----------------->");
            String matricula = request.getParameter("matricula");
            System.out.println(matricula);
            String nombre = request.getParameter("nombre");
            System.out.println(nombre);
            String campus = request.getParameter("campus");
            System.out.println(campus);
            String montoInicial = request.getParameter("montoInicial");
            System.out.println(montoInicial);
            String cantidad = request.getParameter("cantidad");
            System.out.println(cantidad);
            String cveTienda= request.getParameter("cveTienda");
            System.out.println(cveTienda);
            String tipoMoneda = request.getParameter("tipoMoneda");
            System.out.println(tipoMoneda);
            String servicio= request.getParameter("servicio");
            System.out.println(servicio);
            String pedido= request.getParameter("pedido");
            System.out.println(pedido);
            String folioTienda = request.getParameter("folioTienda");
            System.out.println(folioTienda);
            String cveFormaPago= request.getParameter("cveFormaPago");
            System.out.println(cveFormaPago);
            String descFormaPago = request.getParameter("descFormaPago");
            System.out.println(descFormaPago);
            String tipoTransaccion = request.getParameter("tipoTransaccion");
            System.out.println(tipoTransaccion);
            String estatus = request.getParameter("estatus");
            System.out.println(estatus);
            String q = request.getParameter("q");
            System.out.println(q);
            
            System.out.println("<-----------------AQUI COMIENZAN LOS LOGS DE DESENCRIPTADO DEL CHECKOUT----------------->");
            Encripcion encripHex = new Encripcion();
            String matriculaDes=encripHex.descifraLlaveHex(matricula);
            System.out.println("matriculaDes trae este valor: "+matriculaDes);
            String nombreDes=encripHex.descifraLlaveHex(nombre);
            System.out.println("nombreDes trae este valor: "+nombreDes);
            String campusDes=encripHex.descifraLlaveHex(campus);
            System.out.println("campusDes trae este valor: "+campusDes);
            BigDecimal montoInicialDes;
            try{
            	montoInicialDes = new BigDecimal(encripHex.descifraLlaveHex(montoInicial));
            	 System.out.println("montoInicialDes trae este valor: "+montoInicialDes);
            }catch(Exception e){
            	montoInicialDes = new BigDecimal(0);
            	System.out.println("montoInicialDes trae este valor: "+montoInicialDes+ "y marco el error: "+e.toString());
            }
            int cantidadDes;
            try{
	            cantidadDes = Integer.parseInt(encripHex.descifraLlaveHex(cantidad));
	            System.out.println("cantidadDes trae este valor: "+cantidadDes);
            }catch(Exception e){
            	cantidadDes = 0;
	            System.out.println("cantidadDes trae este valor: "+cantidadDes+" y marco el error: "+e.toString());
            }
            int cveTiendaDes;
            try{
	            cveTiendaDes = Integer.parseInt(encripHex.descifraLlaveHex(cveTienda));
	            System.out.println("cveTiendaDes trae este valor: "+cveTiendaDes);
            }catch(Exception e){
            	cveTiendaDes = 0;
 	            System.out.println("cveTiendaDes trae este valor: "+cveTiendaDes+" y marco el error: "+e.toString());
            }
            String tipoMonedaDes = encripHex.descifraLlaveHex(tipoMoneda);
            System.out.println("tipoMonedaDes trae este valor: "+tipoMonedaDes);
            int servicioDes;
            try{
	            servicioDes = Integer.parseInt(encripHex.descifraLlaveHex(servicio));
	            System.out.println("servicioDes trae este valor: "+servicioDes);
            }catch(Exception e){
            	servicioDes = 0;
	            System.out.println("servicioDes trae este valor: "+servicioDes+" y marco el error: "+e.toString());
            }
            int pedidoDes;
            try{
	            pedidoDes = Integer.parseInt(encripHex.descifraLlaveHex(pedido));
	            System.out.println("pedidoDes trae este valor: "+pedidoDes);
            }catch(Exception e){
            	pedidoDes = 0;
	            System.out.println("pedidoDes trae este valor: "+pedidoDes+" y marco el error: "+e.toString());
            }
            String folioTiendaDes = encripHex.descifraLlaveHex(folioTienda);
            System.out.println("folioTiendaDes trae este valor: "+folioTiendaDes);
            int cveFormaPagoDes;
            try{
	            cveFormaPagoDes = Integer.parseInt(encripHex.descifraLlaveHex(cveFormaPago));
	            System.out.println("cveFormaPagoDes trae este valor: "+cveFormaPagoDes);
            }catch(Exception e){
            	cveFormaPagoDes = 0;
	            System.out.println("cveFormaPagoDes trae este valor: "+cveFormaPagoDes+" y marco el error: "+e.toString());
            }
            String descFormaPagoDes = encripHex.descifraLlaveHex(descFormaPago);
            System.out.println("descFormaPagoDes trae este valor:  "+descFormaPagoDes);
            String tipoTransaccionDes = encripHex.descifraLlaveHex(tipoTransaccion);
            System.out.println("tipoTransaccionDes trae este valor: "+tipoTransaccionDes);
            String estatusDes = encripHex.descifraLlaveHex(estatus); 
            System.out.println("estatusDes trae este valor: "+estatusDes);
            int qDes;
            try{
	            //qDes =Integer.parseInt(encripHex.descifraLlaveHex(q));
            	qDes =Integer.parseInt(q);
	            System.out.println("qDes trae este valor: "+qDes);
            }catch(Exception e){
            	qDes = 0;
	            System.out.println("qDes trae este valor: "+qDes+" y marco el error: "+e.toString());
            }
            
            System.out.println("<-----------------AQUI TERMINAN LOS LOGS DE DESENCRIPTADO DEL CHECKOUT----------------->");
            
            TxRespGes saveResp = new TxRespGes();
            
            Alumno alumno = null;
    		if (request != null) {
    			 alumno = (Alumno) request.getSession().getAttribute(
    					"usuario");
    			}
    		
            String periodo=alumno.getPeriodo();
            System.out.println("periodo trae este valor: "+periodo);
            
            Date fechaActual = new Date();
		    String fechaSistema=String.valueOf(fechaActual);
		     
            String fecha=fechaSistema;
            System.out.println("fecha trae este valor: "+fecha);
            
            boolean respBD=saveResp.getGuardarPedido(matriculaDes, nombreDes, campusDes, tipoMonedaDes, folioTiendaDes, descFormaPagoDes, tipoTransaccionDes, estatusDes, periodo, montoInicialDes, cantidadDes, cveTiendaDes, servicioDes, pedidoDes, cveFormaPagoDes, qDes,fecha);    
            
            if(respBD){
	            if(descFormaPagoDes.equals("Depósito bancario nacional (México)") || descFormaPagoDes.equals("Depósito bancario internacional")){
	            	//Si el tipo de Transaccion es Ficha de Deposito que vaya a la página de pagoFichaB
	            	response.sendRedirect("/Alumno/faces/pagoFichaB.xhtml");
	            	System.out.println("<-----------------AQUI TERMINAN LOS LOGS DEL REGRESO DEL CHECKOUT----------------->");
	        	}else{
	        		
		            if(estatusDes.equals("Pagado")){
		            	//Preguna a web Service si se pago
		            	//Si pago se manda a exito pago
		            	//Si no pago se manda a error
		            	XMLConstructorAndDestructor verPed = new XMLConstructorAndDestructor();
		            	ResultadoConsultaPedido resp=verPed.consultarPedido(String.valueOf(cveTiendaDes), CODIGO_TIENDA_SIDI, LLAVE_TIENDA_SIDI, String.valueOf(pedidoDes));
		            	System.out.println("int respuesta de confirmacion de pedido: "+resp);
		            	//if(resp==0 || resp==-1){
		            	if(!resp.getDescripcionEstatus().trim().equalsIgnoreCase("Pagado")){
		            		response.sendRedirect("/Alumno/faces/ErrorPago.xhtml");
		            		System.out.println("<-----------------AQUI TERMINAN LOS LOGS DEL REGRESO DEL CHECKOUT----------------->");
		            	}else{
		            		if(mostrarHorarioPreinsc(alumno.getCod_nivel(), alumno.getPeriodo(), alumno.getCod_campus()))
		            		{
		            			response.sendRedirect("/Alumno/faces/ExitoPago.xhtml");
		            		} else {
		            			response.sendRedirect("/Alumno/faces/finProcesoPago.xhtml");
		            		}
		            		System.out.println("<-----------------AQUI TERMINAN LOS LOGS DEL REGRESO DEL CHECKOUT----------------->");
		            	}
		
		            }else{
		            	//Manda a error
		            	response.sendRedirect("/Alumno/faces/ErrorPago.xhtml");
		            	System.out.println("<-----------------AQUI TERMINAN LOS LOGS DEL REGRESO DEL CHECKOUT----------------->");
		            }
	        	}
            }else{
            	System.out.println("No se almaceno en la B.D");
                response.sendRedirect("/Alumno/faces/ErrorPago.xhtml");
                System.out.println("<-----------------AQUI TERMINAN LOS LOGS DEL REGRESO DEL CHECKOUT----------------->");
            }
        } catch (Exception e) {
            System.out.println("Hubo un error al tratar de guardar la respuesta del gestor de pagos "+e);
            response.sendRedirect("/Alumno/faces/ErrorPago.xhtml");
            System.out.println("<-----------------AQUI TERMINAN LOS LOGS DEL REGRESO DEL CHECKOUT----------------->");
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
}
