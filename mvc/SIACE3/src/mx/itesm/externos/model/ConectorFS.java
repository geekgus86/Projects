package mx.itesm.externos.model;



import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.OutputStream;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Properties;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;

import javax.net.ssl.X509TrustManager;



/**************************************************
 * 
 * @author Benzalez
 * @date Octubre 2013
 * 
 **************************************************/
public class ConectorFS {
	// Archivos properties
	private Properties cuentas = new Properties();

	/** Constante Nombre del Archivo Properties **/
	private static final String ARCHIVO_SERVIDORES = "/server.properties";
	private static final String HTTPS_URL = "HTTPS_URL";
	private static final String HTTPS_ADSF = "HTTPS_ADSF";
	private static final String HTTP_URL = "HTTP_URL";
    // Nombre del usuario

	public static final String USERNAME = "USERNAME_PORTAL";
	// Contraseña del usuario
	public static final String PASSWORD = "PASSWORD_PORTAL";
	// Nombre del servicio al que se va a ingresar
	public static final String SERVICE = "SERVICE_INTERFAZ";
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


	static {
		try {		
			TrustManager[] trustAllCerts = new TrustManager[]{
				new X509TrustManager() {     
		        public java.security.cert.X509Certificate[] getAcceptedIssuers() { 
		            return null;
		        } 
		        public void checkClientTrusted( 
		            java.security.cert.X509Certificate[] certs, String authType) {
		            } 

		        public void checkServerTrusted( 
		            java.security.cert.X509Certificate[] certs, String authType) {
		        }

			}};

			SSLContext sc = SSLContext.getInstance("SSL");

			//HostNameImpl hv = new HostNameImpl();
			sc.init(null, trustAllCerts, new java.security.SecureRandom());

			HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
			//HttpsURLConnection.setDefaultHostnameVerifier(hv);

		} catch (Exception localException) {

		}

	}

	

	public void creaToken() throws Exception

	{
		String url = cuentas.getProperty( HTTPS_ADSF ).trim()+"/adfs/services/trust/2005/UsernameMixed";
		System.out.println("URL Token: "+url);

		HttpURLConnection urlConn = null;
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
				//"<a:MessageID>urn:uuid:09d87a39-8671-4d34-b3ab-d731efcdbe13</a:MessageID>"+
				"<a:ReplyTo>"+
					"<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>"+
				"</a:ReplyTo>"+
				"<a:To s:mustUnderstand=\"1\">"+cuentas.getProperty( HTTPS_ADSF ).trim()+"/adfs/services/trust/2005/UsernameMixed</a:To>"+
				"<o:Security s:mustUnderstand=\"1\" xmlns:o=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">"+
					//"<o:UsernameToken u:Id=\"uuid-24d94c60-77af-4492-a2b5-d2c8587e20e2-1\">"+
				"<o:UsernameToken>"+
						"<o:Username>" + cuentas.getProperty( USERNAME ).trim() + "</o:Username>"+
						"<o:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">"+ cuentas.getProperty( PASSWORD ).trim() + "</o:Password>"+
					"</o:UsernameToken>"+
				"</o:Security>"+
			"</s:Header>"+

			"<s:Body>"+
				"<t:RequestSecurityToken xmlns:t=\"http://schemas.xmlsoap.org/ws/2005/02/trust\">"+
					"<wsp:AppliesTo xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\">"+
						"<a:EndpointReference>"+
							"<a:Address>"+cuentas.getProperty( HTTPS_URL ).trim()+"/_trust/</a:Address>"+
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

		}catch(Exception ex){

			throw new Exception("\nError en la funcion getToken: " + ex.toString() + "\nURL: " + url + "\nQuery: " + query + "\nToken: " + token );

		}finally{

			if (urlConn != null)

				urlConn.disconnect();

		}

	}



	public void creaCookie() throws Exception

	{

		String webPage = cuentas.getProperty( HTTP_URL ).trim()+"/_trust/";
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

			throw new Exception("\nError en la funcion creaCookie: " + ex.toString()+"\nURL cookie: " + webPage + "\nCookie: "+ cookie);

		}finally{

			if(urlConnection!=null)

				urlConnection.disconnect();

		}

	}



	public String consultaWebService(String mailUserPortal, String service) throws Exception

	{
		cuentas.load( ConectorFS.class.getResourceAsStream( ARCHIVO_SERVIDORES ) );
		String urlws = cuentas.getProperty( HTTP_URL ).trim()+"/_vti_bin/mx.itesm.miespacio/Seguridad.svc/ValidaUsuario?usuario="+mailUserPortal+"&servicioid="+service;

		System.out.println("URL WS: " + urlws);
		// https://miespaciotest.sistematec.mx/_vti_bin/mx.itesm.miespacio/Seguridad.svc/ValidaUsuario?usuario=mailUserPortal&servicioid=service
		// https://miespacio.sistematec.mx/_vti_bin/mx.itesm.miespacio/Seguridad.svc/ValidaUsuario?usuario=mailUserPortal&servicioid=service
		URL url = new URL(urlws);

		HttpURLConnection urlConnection = null;
		try{
			urlConnection = (HttpURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");
			urlConnection.setRequestProperty("Accept", "application/xml");
			urlConnection.setRequestProperty("Cookie", getCookie());
			// "FedAuth=77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48U1A+MGUudHxhZGZzcHJvZHxwb3J0YWxlc0BzdmNzLml0ZXNtLm14LDBlLnR8YWRmc3Byb2R8cG9ydGFsZXNAc3Zjcy5pdGVzbS5teCwxMzA0MTAyNTk4NDQ1NjM0MTUsRmFsc2UsTUdZRzJDMFJXcUs4SUpTaStvbmpuMDhWSUlmc1BCVTZIbVdkTVV2SHVITTdqajlqVjJYbUdPd1JRbHk3emgvYUZiTEk1anArYVdFQ0FrVDVFbkRTTVFDanhKNHUydnZtV0xVaEVnRGRRMStDWjJkZFdjbG5VRkEwT2dRWUZyZDdSa1dQRXhQMms2T1RKNTNyRTR2bzJxQllSbkh0dEhaVVM3c1hNNUJtTC9kSERLaTFadzRXbTNnUGorZTVSTG94R1Rhb2xxZ3NNa0RGM1l2TWNpU2tQN1dNT1Y3K0JscTJWNy8zRnF1QlIxTTUzMnlPSlE1dnEyZUlrUlJiRGNORi9hS0tBbTBzMkNBOVYzTTJORStQZW5ML2xlRzVDNjIwNVhBWWd1YnNFc0lvaTZOWHo4Z1Q2UStvUGsyME96aXJwVUs4c1JHcitMOTZXcnoxeUNHOU93PT0saHR0cHM6Ly9taWVzcGFjaW8uaXRlc20ubXgvPC9TUD4=; path=/; secure; HttpOnly"
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

			throw new Exception("\nError en la funcion consulta Web Services: " + ex.toString()+"\nURL WS: " + urlws + "\nXML: " + xml);

		}

		finally {

			if(urlConnection!=null)

				urlConnection.disconnect();

		}

	}

}