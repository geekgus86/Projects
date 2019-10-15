package iusacell.mdc.arh.util;



import iusacell.mdc.arh.sap.DaoSAP;

import org.apache.log4j.Logger;


public class Login {
	
	static Logger log = Logger.getLogger(Login.class);
	
	public static final String failed_login	= "failed_login";
	public static final String success			= "success";
	public static final String successNuevo			= "successNuevo";
	
	private DaoSAP daoSap;
	
	private String maxNumeroConexiones = ""; 
	private String usuSap = "";
	private String pwSap = "";
	private String idiSap = "";
	private String ipSap = "";
	private String puertoSap = "";
	private String grupoSap = "";
	private String clienteSap = "";
	private String r3Name = "";
	
	public Login(){
		try {
			daoSap = new DaoSAP();
//			Hashtable arrDatosConexionSAP = new Hashtable();
//			Constante constante = new Constante();
//			EncriptaCadenas ec = new EncriptaCadenas("DES", constante.getValid());
	    	//Inicio obtiene los datos necesario para la conexion a SAP
			//"maxNumeroConexiones","usuSap","pwSap","idiSap","ipSap","puertoSap","sapGroup","sapCliente","r3Name"
//			arrDatosConexionSAP = daoSap.getDatosConexionSAP();
//			//QA
			System.out.println("Obteniendo los datos");
//			maxNumeroConexiones = ec.decrypt(arrDatosConexionSAP.get("maxNumeroConexiones").toString()); //Numero máximo de conexiones
//			usuSap = ec.decrypt(arrDatosConexionSAP.get("usuSap").toString());	//Usuario SAP
//			pwSap = ec.decrypt(arrDatosConexionSAP.get("pwSap").toString());		//Password SAP
//			idiSap = ec.decrypt(arrDatosConexionSAP.get("idiSap").toString());	//Idioma SAP
//			ipSap = ec.decrypt(arrDatosConexionSAP.get("ipSap").toString());		//IP SAP
//			puertoSap = ec.decrypt(arrDatosConexionSAP.get("puertoSap").toString());	//Puerto SAP
//			grupoSap =ec.decrypt(arrDatosConexionSAP.get("sapGroup").toString());	//Grupo SAP
//			clienteSap=ec.decrypt(arrDatosConexionSAP.get("sapCliente").toString());	//Cliente SAP
//			r3Name=ec.decrypt(arrDatosConexionSAP.get("r3Name").toString());	//Nombre de sistema SAP
//			
			maxNumeroConexiones = "800"; //Numero máximo de conexiones
			usuSap = "AUTOGESTION";	//Usuario SAP
			pwSap = "00408468";		//Password SAP
			idiSap = "es";	//Idioma SAP
			ipSap = "172.19.236.123";		//IP SAP
			puertoSap = "20";	//Puerto SAP
			grupoSap = "PRODUCCION";	//Grupo SAP
			clienteSap = "800";	//Cliente SAP
			r3Name = "3621";	//Nombre de sistema SAP
			
			System.out.println("muestra los datos");
			System.out.println("Cambio de sap:");
			System.out.println("Datos de base ");
			System.out.println("maxNumeroConexiones: "+maxNumeroConexiones);
			System.out.println("usuSap: "+usuSap);
			System.out.println("pwSap: "+pwSap);
			System.out.println("idiSap: "+idiSap);
			System.out.println("puertoSap: "+puertoSap);
			System.out.println("clienteSap: "+clienteSap);
			System.out.println("grupoSap: "+grupoSap);
			System.out.println("r3Name: "+r3Name);
		} catch (Exception e) {
			System.out.println("Error clase login"+e);
			e.printStackTrace();
		}
    }

	public String getMaxNumeroConexiones() {
		return maxNumeroConexiones;
	}

	public void setMaxNumeroConexiones(String maxNumeroConexiones) {
		this.maxNumeroConexiones = maxNumeroConexiones;
	}

	public String getUsuSap() {
		return usuSap;
	}

	public void setUsuSap(String usuSap) {
		this.usuSap = usuSap;
	}

	public String getPwSap() {
		return pwSap;
	}

	public void setPwSap(String pwSap) {
		this.pwSap = pwSap;
	}

	public String getIdiSap() {
		return idiSap;
	}

	public void setIdiSap(String idiSap) {
		this.idiSap = idiSap;
	}

	public String getIpSap() {
		return ipSap;
	}

	public void setIpSap(String ipSap) {
		this.ipSap = ipSap;
	}

	public String getPuertoSap() {
		return puertoSap;
	}

	public void setPuertoSap(String puertoSap) {
		this.puertoSap = puertoSap;
	}

	public String getGrupoSap() {
		return grupoSap;
	}

	public void setGrupoSap(String grupoSap) {
		this.grupoSap = grupoSap;
	}

	public String getClienteSap() {
		return clienteSap;
	}

	public void setClienteSap(String clienteSap) {
		this.clienteSap = clienteSap;
	}

	public String getR3Name() {
		return r3Name;
	}

	public void setR3Name(String r3Name) {
		this.r3Name = r3Name;
	}

	public DaoSAP getDaoSap() {
		return daoSap;
	}

	public void setDaoSap(DaoSAP daoSap) {
		this.daoSap = daoSap;
	}

	public static final String loginForm = "loginForm";
	
    
}
