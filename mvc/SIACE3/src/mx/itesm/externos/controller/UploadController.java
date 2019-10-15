package mx.itesm.externos.controller;

import java.io.IOException;
import java.io.File;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import mx.itesm.externos.dao.Conexion;
import mx.itesm.externos.dao.LogDAO;
import mx.itesm.externos.dao.PersonasFisicasDAO;
import mx.itesm.externos.model.Log;
import mx.itesm.externos.model.PersonaFisicaMasivo;
import mx.itesm.externos.model.Usuario;

/**
 * Servlet implementation class UploadController
 */
@WebServlet("/UploadController")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB
maxFileSize = 1024 * 1024 * 10, // 10MB
maxRequestSize = 1024 * 1024 * 50)
// 50MB
public class UploadController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String SAVE_DIR = "uploadFiles";
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UploadController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		String error = null;
		
		String appPath = request.getServletContext().getRealPath("");

		String savePath = appPath + File.separator + SAVE_DIR;

		try {
			File fileSaveDir = new File(savePath);
			if (!fileSaveDir.exists()) {
				fileSaveDir.mkdir();
			}

			SimpleDateFormat dt = new SimpleDateFormat("ddMMyyhhmmss");
			Part part = request.getPart("file");
			String name = "Clientes" + dt.format(new Date()) + ".txt";
			String filePath = savePath + File.separator + name;
			part.write(filePath);

			FileInputStream fstream = new FileInputStream(filePath);
			DataInputStream entrada = new DataInputStream(fstream);
			// Creamos el Buffer de Lectura
			BufferedReader buffer = new BufferedReader(new InputStreamReader(
					entrada));
			String strLinea;
			// Leer el archivo linea por linea
			ArrayList<PersonaFisicaMasivo> Rechazados = new ArrayList<PersonaFisicaMasivo>();
			ArrayList<PersonaFisicaMasivo> Aceptados = new ArrayList<PersonaFisicaMasivo>();
			ArrayList<PersonaFisicaMasivo> curp = new ArrayList<PersonaFisicaMasivo>();
			ArrayList<PersonaFisicaMasivo> rfc = new ArrayList<PersonaFisicaMasivo>();
			PersonasFisicasDAO pfDAO = new PersonasFisicasDAO();
			String evidencia = "";
			while ((strLinea = buffer.readLine()) != null  ) {
				// Imprimimos la línea por pantalla
				PersonaFisicaMasivo pf = new PersonaFisicaMasivo();
				if(!strLinea.equalsIgnoreCase("")){
				pf = pf.casteaLinea(strLinea);
				evidencia += strLinea+ "--";
				boolean bandera = false;
				if(Integer.parseInt(pf.getDoc_vacio())<=1){
					error= "El documento no cumple con el formato correcto, favor de verificar el formato";
					throw new NullPointerException();
				}
				if(pf.getPiv_curp()==null){
					System.out.println("El curp viene nulo");
					error = "El curp viene vacio y/o esta mal definido en el formato del documento";
					throw new NullPointerException(); 
				}else{
					bandera = pf.validarCURP(pf.getPiv_curp());
					if (!bandera) {
						Rechazados.add(pf);
						curp.add(pf);
						rfc.add(pf);
					}
				}
				
				if(pf.getPiv_rfc()==null){
					System.out.println("El RFC viene nulo");
					error = "El RFC viene vacio y/o esta mal definido en el formato del documento";
					throw new NullPointerException(); 
				}else{
					bandera = pf.validarRfc(pf.getPiv_rfc());
					if (!bandera) {
						Rechazados.add(pf);
						curp.add(pf);
						rfc.add(pf);
					}
				}
				
				if (bandera) {
					Conexion con = new Conexion();
					String salida[] = pfDAO.InsertaPersona(pf, con);
					if(salida[0]==null || salida[1]==null){
						error = "Error de conexion hacia MDM, solicite soporte con el administrador del sistema";
						throw new NullPointerException();
					}
					if (salida[0].equalsIgnoreCase("OP_EXITOSA")) {
						Aceptados.add(pf);
					} else {
						pf.setPov_estatus(salida[0]);
						Rechazados.add(pf);
						curp.add(pf);
						rfc.add(pf);
					}
					
					System.out.println(salida);
				
				}
			  }	
			}
			

			// Cerramos el archivo
			entrada.close();
			File f = new File(filePath);
			f.delete();

			/*
			 * PersonaFisicaMasivo pfm = new PersonaFisicaMasivo();
			 * pfm.setPiv_clave_candidato("15051301");
			 * pfm.setPiv_nombre("Jose Manuel");
			 * pfm.setPiv_apellido_paterno("Perez");
			 * pfm.setPiv_apellido_materno("Ruiz"); pfm.setPiv_genero("M");
			 * pfm.setPiv_fecha_nacimiento("01/01/1988");
			 * pfm.setPiv_curp("VEBV881110HVZGRC07");
			 * pfm.setPiv_rfc("VEBV881110114"); pfm.setPiv_imss("12345678901");
			 * pfm.setPiv_clave_pais_nacimiento("0001");
			 * pfm.setPiv_clave_estado_nacimiento("029");
			 * pfm.setPiv_clave_pais_nacionalidad("0001");
			 * pfm.setPiv_clave_tipo_domicilio("BU");
			 * pfm.setPiv_calle1_domicilio("Av 5 entre calles 12 y 14");
			 * pfm.setPiv_calle2_domicilio("Cuitlahuac Veracruz");
			 * pfm.setPiv_colonia_domicilio("La Concordia");
			 * pfm.setPiv_codigo_postal_domicilio("94910");
			 * pfm.setPiv_clave_pais_domicilio("0001");
			 * 
			 * PersonasFisicasDAO pfDao = new PersonasFisicasDAO(); Conexion
			 * conex = new Conexion(); String salida = pfDao.InsertaPersona(pfm,
			 * conex);
			 */

			// System.out.println(salida);
			try{
			Log log = new Log();
			LogDAO logdao = new LogDAO();
			
			Usuario user = (Usuario)request.getSession().getAttribute("user");
			
			if(!user.getNomina().equals("?")){
				log.setClave_usuario(user.getNomina());
			}else{
				Acceso obtn = new Acceso();
				String valCookie=obtn.mailUserCookie(request);
				log.setClave_usuario(valCookie);
			}
			log.setTipo_de_moviento("C.Masiva");
			log.setEstatus_operacion("1");
			log.setEvidencia(evidencia);
			
			logdao.insertaLog(log);
			}catch(Exception ex){
				System.out.println("Error en la carga del archivo: "+ex.toString());
				}
			request.setAttribute("aceptados", Aceptados);
			request.setAttribute("rechazados", Rechazados);
			request.setAttribute("curp", curp);
			request.setAttribute("rfc", rfc);
			
			RequestDispatcher rd = request.getRequestDispatcher("resultados.jsp");
			rd.forward(request, response);

		} catch (Exception ex) {
			ex.printStackTrace();
			RequestDispatcher rd = request.getRequestDispatcher("error.jsp");
			System.out.println(ex.toString());
			if(error==null){
				request.setAttribute("error", ex.toString());
			}else{
				request.setAttribute("error", error);
			}
			rd.forward(request, response);
		}

		/*
		 * request.setAttribute("message",
		 * "Upload has been done successfully!");
		 * getServletContext().getRequestDispatcher("/message.jsp").forward(
		 * request, response);
		 */
	}

}
