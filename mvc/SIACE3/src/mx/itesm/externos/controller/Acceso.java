package mx.itesm.externos.controller;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Enumeration;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;


import org.w3c.dom.*;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import mx.itesm.externos.model.Usuario;


/**
 * Servlet implementation class Acceso
 */
@WebServlet("/Acceso")
public class Acceso extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Acceso() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    private String cookie;
	private String token;
	private String xml;
	
	private String query;	
	
	public String getCookie() throws Exception {
		if(cookie == null)
			creaCookie();
		return cookie;
	}

	public void setCookie(String cookie) {
		this.cookie = cookie;
	}


	public String getToken() throws Exception {
		if(token == null)
			creaToken();
		return token;
	}


	public void setToken(String token) {
		this.token = token;
	}


	public String getXml() {
		return xml;
	}

	public void setXml(String xml) {
		this.xml = xml;
	}
    
    
    /**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			procesa(request,response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("Error al procesar el request por post"+e.getMessage());
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			procesa(request,response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("Error al procesar el request por get"+e.getMessage());
		}
		
	}
	
	public void procesa(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		String xmlResultado = consultaWebService(mailUserCookie(request), "MDM_MASIVO");
				Usuario usuarioEnSesion = new Usuario();
		usuarioEnSesion = xmlToUsuario(xmlResultado);
		System.out.println("usuario en sesion: "+ usuarioEnSesion.getEmail());
	    
		/*if(usuarioEnSesion.getEmail().equals("?")){
			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/index.jsp");
			dispatcher.forward(request, response);
			//response.sendRedirect("index.jsp");
		}else{
			HttpSession sesion = request.getSession();
			sesion.setAttribute("user", usuarioEnSesion);
			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/upload.jsp");
			dispatcher.forward(request, response);
			//response.sendRedirect("upload.jsp");
		}*/
		 String mail=mailUserCookie(request);
		 if(mail==null){
				RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/index.jsp");
				dispatcher.forward(request, response);
			}else{
				HttpSession sesion = request.getSession();
				sesion.setAttribute("user", usuarioEnSesion);
				RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/upload.jsp");
				dispatcher.forward(request, response);
			}
	}
	
	
	//Crea un token apuntando hacia al ADFS usando un usr y un psw 
	public void creaToken() throws Exception
	{
		String url = "https://fs.itesm.mx/adfs/services/trust/2005/UsernameMixed";
		
		System.out.println("URL Token: "+url);
		
		HttpURLConnection urlConn = null;
		String query = null;
		try{
			
			URL mUrl = new URL(url);

			urlConn = (HttpURLConnection) mUrl.openConnection();
		

			urlConn.addRequestProperty("Content-Type", "application/soap+xml; charset=utf-8");

			urlConn.setDoOutput(true);
			urlConn.setRequestMethod("POST");
			
			query =
			"<s:Envelope xmlns:s=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:a=\"http://www.w3.org/2005/08/addressing\" xmlns:u=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">"+
				"<s:Header>"+
				"<a:Action s:mustUnderstand=\"1\">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action>"+
				
				"<a:ReplyTo>"+
					"<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>"+
				"</a:ReplyTo>"+
				"<a:To s:mustUnderstand=\"1\">https://fs.itesm.mx/adfs/services/trust/2005/UsernameMixed</a:To>"+
				"<o:Security s:mustUnderstand=\"1\" xmlns:o=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">"+
					
				"<o:UsernameToken>"+
						"<o:Username>L03020578</o:Username>"+
						"<o:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">Pa$$w0rd</o:Password>"+
					"</o:UsernameToken>"+
				"</o:Security>"+
			"</s:Header>"+
			"<s:Body>"+
				"<t:RequestSecurityToken xmlns:t=\"http://schemas.xmlsoap.org/ws/2005/02/trust\">"+
					"<wsp:AppliesTo xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\">"+
						"<a:EndpointReference>"+
							"<a:Address>https://miespacio.itesm.mx/_trust/</a:Address>"+
						"</a:EndpointReference>"+
					"</wsp:AppliesTo>"+
					"<t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType>"+
					"<t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType>"+
				"</t:RequestSecurityToken>"+
			"</s:Body>"+
			"</s:Envelope>";
			
			System.out.println(query);
			
			System.out.println(Integer.toString(query.length()));
			
			if (query != null) {
				urlConn.setRequestProperty("Content-Length", Integer.toString(query.length()));
				urlConn.getOutputStream().write(query.getBytes());
			}
			
			urlConn.connect();
			
			System.out.println(urlConn.getResponseCode());
			InputStream xml = urlConn.getInputStream();
			
			BufferedReader inputReader = new BufferedReader(new InputStreamReader(xml));
			
		    String sb = "";
		    String inline = "";
		   
		    while ((inline = inputReader.readLine()) != null) {
		     sb= sb.concat(inline);
		    }
		  
		    setToken(sb.substring(sb.indexOf("<t:RequestSecurityTokenResponse"), sb.indexOf("</s:Body>")));

		    System.out.println(getToken().length());
		    System.out.println("Token generado: "+getToken());
		    
		}catch(Exception ex){
			//throw new Exception("\nError en la funcion getToken: " + ex.toString() + "\nURL: " + url + "\nQuery: " + query + "\nToken: " + token );
			System.out.println("\nError en la funcion getToken: " + ex.toString() + "\nURL: " + url + "\nQuery: " + query + "\nToken: " + token);
		}finally{
			if (urlConn != null)
				urlConn.disconnect();
		}
	}
	//Crea la cookie con el token recuperado
	public void creaCookie() throws Exception
	{
		String webPage = "https://miespacio.itesm.mx/_trust/";
		
		System.out.println("URL Cookie: " + webPage);
		
		HttpURLConnection urlConnection = null;
		
		try{
			String token = "wa=wsignin1.0&wresult="
							+URLEncoder.encode(getToken(),"UTF-8")+
							"&wctx=https%3A%2F%2Fmiespacio.itesm.mx%2F_layouts%2F15%2FAuthenticate.aspx%3FSource%3D%252F";
			System.out.println(token.length());
			System.out.println(URLEncoder.encode(getToken(),"UTF-8"));
			
			URL url = new URL(webPage);
			urlConnection = (HttpURLConnection) url.openConnection();
			
			urlConnection.setRequestMethod("POST");
			urlConnection.setDoOutput(true);
			urlConnection.setInstanceFollowRedirects(false);
			urlConnection.setRequestProperty("Content-Length", Integer.toString(token.length()));
			OutputStream output = new BufferedOutputStream(urlConnection.getOutputStream());   
		    output.write(token.getBytes());
		    output.flush(); 
		    output.close();
	
			urlConnection.connect();

			setCookie(urlConnection.getHeaderField("Set-Cookie"));
			
			System.out.println(urlConnection.getResponseCode());
		}catch(Exception ex){
			//throw new Exception("\nError en la funcion creaCookie: " + ex.toString()+"\nURL cookie: " + webPage + "\nCookie: "+ cookie);
			System.out.println("\nError en la funcion creaCookie: " + ex.toString()+"\nURL cookie: " + webPage + "\nCookie: "+ cookie);
		}finally{
			if(urlConnection!=null)
				urlConnection.disconnect();
		}
	}
	
	//Cnsultamos el XML con la cookie y el token
	public String consultaWebService(String mailUserPortal, String service) throws Exception
	{
		
		
		String urlws = "http://miespacio.itesm.mx/_vti_bin/mx.itesm.miespacio/Seguridad.svc/ValidaUsuario?usuario="+mailUserPortal+"&servicioid="+service;
		
		System.out.println("URL WS: " + urlws);
		
		URL url = new URL(urlws);
		
		HttpURLConnection urlConnection = null;
		
		try{
			urlConnection = (HttpURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");
			urlConnection.setRequestProperty("Accept", "application/xml");
			urlConnection.setRequestProperty("Cookie", getCookie());
			
			InputStream xml = urlConnection.getInputStream();
			
			BufferedReader inputReader = new BufferedReader(new InputStreamReader(xml));
		    String sb = "";
		    String inline = "";
		   
		    while ((inline = inputReader.readLine()) != null) {
		    	sb = sb.concat(inline);
		    }
		    
		    setXml(sb.toLowerCase());
		    
		    System.out.println("Token: "+getToken());
		    System.out.println("Cookie: "+getCookie());
		    System.out.println("XML: "+getXml());
		    
		    return getXml();
		}catch(Exception ex) {
			ex.printStackTrace();
			System.out.println("\nError en la funcion consulta Web Services: " + ex.toString()+"\nURL WS: " + urlws + "\nXML: " + xml);
			throw new Exception("\nError en la funcion consulta Web Services: " + ex.toString()+"\nURL WS: " + urlws + "\nXML: " + xml);
		}
		finally {
			if(urlConnection!=null)
				urlConnection.disconnect();
		}
	}
	
	// metodo que lee el valor de la cookie de SharePoint para autenticar
		public String mailUserCookie(HttpServletRequest request){
			String mailUser = null;
			Cookie[] cookies = request.getCookies();

			if (cookies != null) {
			 for (Cookie cookie : cookies) {
			   if (cookie.getName().equals("MailUserPortal")) {
			     mailUser = cookie.getValue();
			     System.out.println("Valor de la cookie: "+ mailUser);
			    }
			  }
			}
			//mailUserPortal Harcodeado para pruebas locales, comentar el pprd o produccion
		    mailUser = "BFE069DB7B7FDED51A7F81DF8CE3CAD865ACE581CD142C6D8AF2DE9F5B9F467A100B55372F280E5B97E17A9870C010D9";
		
			return mailUser;
		}
		
	
	//Convierte el xml recibido al objeto usuario
	public Usuario xmlToUsuario(String xMLResponse) {
		
		   try {
			   Usuario usr = new Usuario();
		        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		        DocumentBuilder db = dbf.newDocumentBuilder();
		        InputSource is = new InputSource();
		        is.setCharacterStream(new StringReader(xMLResponse));

		        Document doc = db.parse(is);
		        NodeList nodes = doc.getElementsByTagName("usuario");

		        System.out.println("Elementos encontrados: "+nodes.getLength());
		        for (int i = 0; i < nodes.getLength(); i++) {
		           Element element = (Element) nodes.item(i);
		           
		           NodeList apellidoMaterno = element.getElementsByTagName("apellidomaterno");
		           Element line = (Element) apellidoMaterno.item(0);
		           usr.setApellidoMaterno(getCharacterDataFromElement(line));
		           
		           NodeList apellidoPaterno = element.getElementsByTagName("apellidopaterno");
		           line = (Element) apellidoPaterno.item(0);
		           usr.setApellidoPaterno(getCharacterDataFromElement(line));
		           
		           NodeList areaPersonal = element.getElementsByTagName("areapersonal");
		           line = (Element) areaPersonal.item(0);
		           usr.setAreaPersonal(getCharacterDataFromElement(line));
		           
		           NodeList curp = element.getElementsByTagName("curp");
		           line = (Element) curp.item(0);
		           usr.setCurp(getCharacterDataFromElement(line));
		           
		           NodeList claveArea = element.getElementsByTagName("clavearea");
		           line = (Element) claveArea.item(0);
		           usr.setClaveArea(getCharacterDataFromElement(line));
		           
		           NodeList claveCampus = element.getElementsByTagName("clavecampus");
		           line = (Element) claveCampus.item(0);
		           usr.setClaveCampus(getCharacterDataFromElement(line));
		           
		           NodeList claveCategoria = element.getElementsByTagName("clavecategoria");
		           line = (Element) claveCategoria.item(0);
		           usr.setClaveCategoria(getCharacterDataFromElement(line));
		           
		           NodeList claveCoas = element.getElementsByTagName("clavecoas");
		           line = (Element) claveCoas.item(0);
		           usr.setClaveCoas(getCharacterDataFromElement(line));
		           
		           NodeList claveContrato = element.getElementsByTagName("clavecontrato");
		           line = (Element) claveContrato.item(0);
		           usr.setClaveContrato(getCharacterDataFromElement(line));
		           
		           NodeList claveDivisionPersonal = element.getElementsByTagName("clavedivisionpersonal");
		           line = (Element) claveDivisionPersonal.item(0);
		           usr.setClaveDivisionPersonal(getCharacterDataFromElement(line));
		           
		           NodeList claveFuncionOrganizativa = element.getElementsByTagName("clavefuncionorganizativa");
		           line = (Element) claveFuncionOrganizativa.item(0);
		           usr.setClaveFuncionOrganizativa(getCharacterDataFromElement(line));
		           
		           NodeList claveInstitucion = element.getElementsByTagName("claveinstitucion");
		           line = (Element) claveInstitucion.item(0);
		           usr.setClaveInstitucion(getCharacterDataFromElement(line));
		           
		           NodeList clavePuesto = element.getElementsByTagName("clavepuesto");
		           line = (Element) clavePuesto.item(0);
		           usr.setClavePuesto(getCharacterDataFromElement(line));
		           
		           NodeList claveRecinto = element.getElementsByTagName("claverecinto");
		           line = (Element) claveRecinto.item(0);
		           usr.setClaveRecinto(getCharacterDataFromElement(line));
		           
		           NodeList claveRectoria = element.getElementsByTagName("claverectoria");
		           line = (Element) claveRectoria.item(0);
		           usr.setClaveRectoria(getCharacterDataFromElement(line));
		           
		           NodeList claveSubDivisionPersonal = element.getElementsByTagName("clavesubdivisionpersonal");
		           line = (Element) claveSubDivisionPersonal.item(0);
		           usr.setClaveSubDivisionPersonal(getCharacterDataFromElement(line));
		           
		           NodeList claveUnidadOrg = element.getElementsByTagName("claveunidadorg");
		           line = (Element) claveUnidadOrg.item(0);
		           usr.setClaveUnidadOrg(getCharacterDataFromElement(line));
		           
		           NodeList descCampus = element.getElementsByTagName("desccampus");
		           line = (Element) descCampus.item(0);
		           usr.setDescCampus(getCharacterDataFromElement(line));
		           
		           NodeList descContrato = element.getElementsByTagName("desccontrato");
		           line = (Element) descContrato.item(0);
		           usr.setDescContrato(getCharacterDataFromElement(line));
		           
		           NodeList descPuesto = element.getElementsByTagName("descpuesto");
		           line = (Element) descPuesto.item(0);
		           usr.setDescPuesto(getCharacterDataFromElement(line));
		           
		           NodeList descRectoria = element.getElementsByTagName("descrectoria");
		           line = (Element) descRectoria.item(0);
		           usr.setDescRectoria(getCharacterDataFromElement(line));
		           
		           NodeList descUnidadOrg = element.getElementsByTagName("descunidadorg");
		           line = (Element) descUnidadOrg.item(0);
		           usr.setDescUnidadOrg(getCharacterDataFromElement(line));
		           
		           NodeList email = element.getElementsByTagName("email");
		           line = (Element) email.item(0);
		           usr.setEmail(getCharacterDataFromElement(line));
		           
		           NodeList estatus = element.getElementsByTagName("estatus");
		           line = (Element) estatus.item(0);
		           usr.setEstatus(getCharacterDataFromElement(line));
		           
		           NodeList fechaGraciaAcad = element.getElementsByTagName("fechagraciaacad");
		           line = (Element) fechaGraciaAcad.item(0);
		           usr.setFechaGraciaAcad(getCharacterDataFromElement(line));
		           
		           NodeList fechaGraciaAdmv = element.getElementsByTagName("fechagraciaadmv");
		           line = (Element) fechaGraciaAdmv.item(0);
		           usr.setFechaGraciaAdmv(getCharacterDataFromElement(line));
		           
		           NodeList fechaInactivaInmediata = element.getElementsByTagName("fechainactivainmediata");
		           line = (Element) fechaInactivaInmediata.item(0);
		           usr.setFechaInactivaInmediat(getCharacterDataFromElement(line));
		           
		           NodeList fechaNacimiento = element.getElementsByTagName("fechanacimiento");
		           line = (Element) fechaNacimiento.item(0);
		           usr.setFechaNacimiento(getCharacterDataFromElement(line));
		           
		           NodeList grupoPersonal = element.getElementsByTagName("grupopersonal");
		           line = (Element) grupoPersonal.item(0);
		           usr.setGrupoPersonal(getCharacterDataFromElement(line));
		           
		           NodeList IDPersona = element.getElementsByTagName("idpersona");
		           line = (Element) IDPersona.item(0);
		           usr.setIDPersona(getCharacterDataFromElement(line));
		           
		           NodeList imss = element.getElementsByTagName("imss");
		           line = (Element) imss.item(0);
		           usr.setImss(getCharacterDataFromElement(line));
		           
		           NodeList nombre = element.getElementsByTagName("nombre");
		           line = (Element) nombre.item(0);
		           usr.setNombre(getCharacterDataFromElement(line));
		           
		           NodeList nomina = element.getElementsByTagName("nomina");
		           line = (Element) nomina.item(0);
		           usr.setNomina(getCharacterDataFromElement(line));
		           
		           NodeList numeroPersonal = element.getElementsByTagName("numeropersonal");
		           line = (Element) numeroPersonal.item(0);
		           usr.setNumeroPersonal(getCharacterDataFromElement(line));
		           
		           NodeList pidm = element.getElementsByTagName("pidm");
		           line = (Element) pidm.item(0);
		           usr.setPidm(getCharacterDataFromElement(line));
		           
		           NodeList puestoAcademicos = element.getElementsByTagName("puestoacademicos");
		           line = (Element) puestoAcademicos.item(0);
		           usr.setPuestoAcademicos(getCharacterDataFromElement(line));
		           
		           NodeList rfc = element.getElementsByTagName("rfc");
		           line = (Element) rfc.item(0);
		           usr.setrfc(getCharacterDataFromElement(line));
		           
		           NodeList Return = element.getElementsByTagName("return");
		           line = (Element) Return.item(0);
		           usr.setReturn(getCharacterDataFromElement(line));
		           
		           NodeList sociedad = element.getElementsByTagName("sociedad");
		           line = (Element) sociedad.item(0);
		           usr.setSociedad(getCharacterDataFromElement(line));
		        
		        }
		        return usr;
		    }
		    catch (Exception e) {
		        e.printStackTrace();
		        System.out.println("Error en el metodo xmltoUsuario: "+e.toString());
		    }
		return null;
	}
	public static String getCharacterDataFromElement(Element e) {
	    Node child = e.getFirstChild();
	    if (child instanceof CharacterData) {
	       CharacterData cd = (CharacterData) child;
	       return cd.getData();
	    }
	    return "?";
	  }


	
	

	

}
