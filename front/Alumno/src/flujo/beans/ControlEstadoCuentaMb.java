package flujo.beans;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Properties;

import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;

import com.sidiAlumno.general.Encripcion;
import com.sidiAlumno.general.Alumno;


public class ControlEstadoCuentaMb {

	private String urlAtras;
	
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
	
	private boolean muestraEstadoCuenta;
	private String src="";
	public static final String ACCESO_MENU = "1";
	public static final String ACCESO_HORARIO = "2";
	private String muestraAcceso = "";
	
	
	
	public boolean isMuestraEstadoCuenta() {
		return muestraEstadoCuenta;
	}
	public void setMuestraEstadoCuenta(boolean muestraEstadoCuenta) {
		this.muestraEstadoCuenta = muestraEstadoCuenta;
	}
	public String getSrc() {
		return src;
	}
	public void setSrc(String src) {
		this.src = src;
	}
	
	/**
	 * Método que envía al sitio de Estado de Cuenta Web (ECW) mandando encriptados el pidm, matrícula y correo electrónico.
	 * El acceso es para Menu.
	 * @return String
	 */
	public String goToEstadoCuenta() {
		//Aqui irá la lógica para obtener los datos que se requieran para ECW si son necesarios
		muestraEstadoCuenta = true;
		 Map<String,String> params = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
		 String accesoMenu = params.get("accesoMenu");
		if(accesoMenu.equals("normal")){
			muestraAcceso = ACCESO_MENU;
		}else{
			muestraAcceso = ACCESO_HORARIO;
		}
		HttpServletRequest request = (HttpServletRequest)FacesContext.getCurrentInstance().getExternalContext().getRequest();
		Alumno alumno = null;
		if (request != null) {
			 alumno = (Alumno) request.getSession().getAttribute(
					"usuario");
			}
		
		Encripcion encript = new Encripcion();
		String cifrado = encript.cifraLlaveHex(alumno.getPidem()+"|"+"A"+alumno.getMatricula()+"|"+alumno.getCorreo());
		
		this.src = getString("goToEstadoCuenta")+cifrado;
		

		String url = FacesContext.getCurrentInstance().getViewRoot().getViewId();
        return "/consultaEdoCuenta.xhtml?faces-redirect=true&urlAtras=" + url;
		//return "estadoCuenta";
	}
	
    public String irAtras() {
        return urlAtras + "?faces-redirect=true";
    }

    public String getUrlAtras() {
        return urlAtras;
    }

    public void setUrlAtras(String urlAtras) {
        this.urlAtras = urlAtras;
    }
	
	public String goToMenuPasosPrevios() {
		//Aqui irá la lógica para obtener los datos que se requieran para ECW si son necesarios
		muestraEstadoCuenta = false;
		this.src = "";
		return "menuPasosPrevios";
	}
	
	public String goToconsultaInscripcion() { //Flujo para consultaInscripcion 03/06/2015
		//Aqui irá la lógica para obtener los datos que se requieran para ECW si son necesarios
		muestraEstadoCuenta = false;
		this.src = "";
		return "consultaInscripcion";
	}
	
	
	public String goToAdeudoCuenta() {
		//Aqui irá la lógica para obtener los datos que se requieran para ECW si son necesarios
		muestraEstadoCuenta = false;
		this.src = "";
		return "adeudoCuenta";
	}
	public String getMuestraAcceso() {
		return muestraAcceso;
	}
	public void setMuestraAcceso(String muestraAcceso) {
		this.muestraAcceso = muestraAcceso;
	}
	
	
}
