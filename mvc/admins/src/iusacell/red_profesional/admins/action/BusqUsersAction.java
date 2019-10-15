package iusacell.red_profesional.admins.action;

import java.math.BigDecimal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.controllers.DatosAdmin;
import com.iusa.clases.controllers.HibernateUtil;
import com.opensymphony.xwork2.ActionSupport;

public class BusqUsersAction extends ActionSupport {
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	Session session;
	
	public BusqUsersAction(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
public String execute(){

		String user;
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        user= escapeChars((String) sesion.getAttribute("usuario"));
        
        Transaction trans = session.beginTransaction();
        
        
        DatosAdmin DA = new DatosAdmin();
	     DA.execute();
	     idAdministrador = DA.getIdAdministrador();
	     correo = DA.getCorreo();
	     lvl = DA.getLvl();
	     nombreAdmin = DA.getNombreAdmin();
        
        return SUCCESS;   
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
