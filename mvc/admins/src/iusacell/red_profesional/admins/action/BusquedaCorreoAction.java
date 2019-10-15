package iusacell.red_profesional.admins.action;

import iusacell.red_porfesional.admins.dao.ConsultaEmplDao;
import iusacell.red_porfesional.admins.impl.ConsultaEmplDaoImpl;
import iusacell.red_profesional.admins.form.UsuarioForm;

import java.math.BigDecimal;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;

import com.iusa.clases.controllers.DatosAdmin;
import com.iusa.clases.controllers.HibernateUtil;
import com.opensymphony.xwork2.ActionSupport;

public class BusquedaCorreoAction extends ActionSupport {
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	private String mail;
	private ArrayList<UsuarioForm> recibeInfo;
	
Session session;
	
	public BusquedaCorreoAction(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		String user;
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        user= escapeChars((String) sesion.getAttribute("usuario"));
        
        DatosAdmin DA = new DatosAdmin();
	     DA.execute();
	     idAdministrador = DA.getIdAdministrador();
	     correo = DA.getCorreo();
	     lvl = DA.getLvl();
	     nombreAdmin = DA.getNombreAdmin();
	     try{
	     ConsultaEmplDao ejecuta = new ConsultaEmplDao();
	     recibeInfo=ejecuta.infoUsers(mail);
	     if(recibeInfo==null){
	     return ERROR;
	     }
	     else{
	    return SUCCESS; 
	     }
	     }catch(Exception e){
	    	 return ERROR;
	     }
	     
	}
	
	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public ArrayList<UsuarioForm> getRecibeInfo() {
		return recibeInfo;
	}

	public void setRecibeInfo(ArrayList<UsuarioForm> recibeInfo) {
		this.recibeInfo = recibeInfo;
	}

	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}

	public BigDecimal getIdAdministrador() {
		return idAdministrador;
	}

	public void setIdAdministrador(BigDecimal idAdministrador) {
		this.idAdministrador = idAdministrador;
	}

	public String getCeC() {
		return ceC;
	}

	public void setCeC(String ceC) {
		this.ceC = ceC;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public BigDecimal getLvl() {
		return lvl;
	}

	public void setLvl(BigDecimal lvl) {
		this.lvl = lvl;
	}

	public String getNombreAdmin() {
		return nombreAdmin;
	}

	public void setNombreAdmin(String nombreAdmin) {
		this.nombreAdmin = nombreAdmin;
	}

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}


}
