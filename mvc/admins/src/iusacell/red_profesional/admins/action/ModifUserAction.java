package iusacell.red_profesional.admins.action;

import java.math.BigDecimal;
import java.util.ArrayList;

import iusacell.red_porfesional.admins.dao.GuardaModifDao;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.swing.JOptionPane;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;

import com.iusa.clases.controllers.DatosAdmin;
import com.iusa.clases.controllers.HibernateUtil;
import com.opensymphony.xwork2.ActionSupport;

public class ModifUserAction extends ActionSupport {
	
	private BigDecimal idAdministrador;
	private String ceC;
	private BigDecimal lvl;
	private String nombreAdmin;
	private String nombre;
	private String a_p;
	private String a_m;
	private String mail;
	private String password;
	private String tel;
	private String fecha;
	private int recibeR;
	private String correo;
	
	Session session;
	
	public ModifUserAction(){
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
	     GuardaModifDao ejecuta = new GuardaModifDao();
	     recibeR=ejecuta.datosUsuario(nombre, a_p, a_m, mail, password, tel);
	     if(recibeR==0){
	     return ERROR;
	     }
	     else{
	    	 JOptionPane.showMessageDialog(null, recibeR, "Cambios Relaizados con Exito!", JOptionPane.WARNING_MESSAGE);
	    return SUCCESS; 
	     }
	     }catch(Exception e){
	    	 return ERROR;
	     }
	     
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

public String getNombre() {
	return nombre;
}

public void setNombre(String nombre) {
	this.nombre = nombre;
}

public String getA_p() {
	return a_p;
}

public void setA_p(String a_p) {
	this.a_p = a_p;
}

public String getA_m() {
	return a_m;
}

public void setA_m(String a_m) {
	this.a_m = a_m;
}

public String getMail() {
	return mail;
}

public void setMail(String mail) {
	this.mail = mail;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

public String getTel() {
	return tel;
}

public void setTel(String tel) {
	this.tel = tel;
}

public String getFecha() {
	return fecha;
}

public void setFecha(String fecha) {
	this.fecha = fecha;
}

public int getRecibeR() {
	return recibeR;
}

public void setRecibeR(int recibeR) {
	this.recibeR = recibeR;
}

public String getCorreo() {
	return correo;
}

public void setCorreo(String correo) {
	this.correo = correo;
}

public Session getSession() {
	return session;
}

public void setSession(Session session) {
	this.session = session;
}


}
