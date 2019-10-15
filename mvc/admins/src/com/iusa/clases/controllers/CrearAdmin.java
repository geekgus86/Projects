package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.iusa.clases.models.*;


import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;


import com.opensymphony.xwork2.ActionSupport;

public class CrearAdmin extends ActionSupport{

	protected String nombre;
	protected String cec;
	protected String email;
	protected String nivelAdmin;
	protected String ubicacion;
	protected String region;
	protected String estatus;
	public String message;
	
	
	private String nombreAdmin;
	private BigDecimal levelAdmin;
	private String emailAdmin;
	private String nivelAux = "";
	
	private  String corr="",p="";
	
	Session session;
	
	public CrearAdmin(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
	    
	    user = escapeChars((String) sesion.getAttribute("usuario"));
	    
	    String secureNombre = escapeChars(nombre);
	    String secureCec = escapeChars(cec);
	    String secureEmail = escapeChars(email);
	    String secureNivelAdmin = escapeChars(nivelAdmin);
	    String secureUbicacion = escapeChars(ubicacion);
	    String secureregion = escapeChars(region);
	    String secureEsatus = escapeChars(estatus);
	    
		
		Transaction tr = session.beginTransaction();
		try{
			
			
			
			if(user!=null){
				String sql_admin ="SELECT \"admins\".\"cec\", \"admins\".\"nombre\", \"admins\".\"email\",\"admins\".\"nivel\", \"admins\".\"ubicacion\",\"admins\".\"region\" FROM \"admins\"  WHERE \"admins\".\"email\" = :user  ";
				
				Query A = session.createSQLQuery(sql_admin);
				A.setParameter("user", user);
				
				A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List dA = A.list();

				for (Object object : dA) {
			         Map row = (Map) object;
			        
			         nombreAdmin = (String) row.get("nombre");
			         emailAdmin = (String) row.get("email");
			         levelAdmin = (BigDecimal) row.get("nivel");
			        
			         	
			     }
				
				
				
				if(levelAdmin.intValueExact() == 1){
					nivelAux = "Administrador DSI";
				}else if(levelAdmin.intValueExact() == 2){
					nivelAux = "Super Administrador";
				}else if(levelAdmin.intValueExact() == 3){
					nivelAux = "Administrador";
				}else if(levelAdmin.intValueExact() == 4){
					nivelAux = "Calificador";
				}
				
				
			}
			
			
			
		int secureIntLvl = Integer.parseInt(secureNivelAdmin);
		
		BigDecimal secureBigRegion = new BigDecimal(secureregion);
		
		Admin a=new Admin();
		a.setNombre(secureNombre);
		a.setCec(secureCec);
		a.setEmail(secureEmail);
		a.setNivel(secureIntLvl);
		a.setUbicacion(secureUbicacion);
		a.setRegion(secureBigRegion);
		a.setEstatus(secureEsatus);
		session.save(a);
		
		
		
		
	        String sqlmail = "SELECT \"correo_iusa\".\"cuenta\",\"correo_iusa\".\"password\" FROM \"correo_iusa\" WHERE \"correo_iusa\".\"id\"=:idm";
	        Query querymail = session.createSQLQuery(sqlmail).setParameter("idm", 1);
	        querymail.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List data2 = querymail.list();
	        for (Object object : data2) {
	         Map row = (Map) object;
	         corr=(String)row.get("cuenta");
	         p=(String)row.get("password");
	         }
		
		
		 tr.commit();
		  
		}catch(Exception e){
			
			tr.rollback();
		}
		
		
		
		Calendar fechaInstancia = new GregorianCalendar();
		
		String dia2 = Integer.toString(fechaInstancia.get(Calendar.DATE));   
		String mes2 = Integer.toString(fechaInstancia.get(Calendar.MONTH)+1);  
		String annio2 = Integer.toString(fechaInstancia.get(Calendar.YEAR)); 
		
		String fechaCreacion = dia2+"-"+mes2+"-"+annio2;
		
		message="<p style='text-align:justify;'>El día <strong style='color:DarkGreen;'>"+fechaCreacion+"</strong></p>  se realizo la creacion de un Usuario tipo Administador con los sigueintes Datos:</p> <p>Nombre Administrador: "+secureNombre+" </p> <p>Nivel: "+secureNivelAdmin+"</p> <p>E-mail: "+secureEmail+"</p><br/> <p></p><br/> <p style='text-align:justify;'>El usuario que realizo esta operacion tiene los sigueintes datos:</p> <p style='text-align:justify;'>Nombre de usuario:  <strong style='color:crimson;'>"+nombreAdmin+"</strong></p><p style='text-align:justify;'>E-mail: <strong style='color:crimson;'>"+emailAdmin+"</strong></p><p style='text-align:justify;'>Nivel administrativo: <strong style='color:crimson;'>"+nivelAux+"</strong></p>";
		System.out.print(message);
		MailConfirmacion m=new MailConfirmacion("cyaaltva@tvazteca.com",message,"Se ha creado un Administrador -- Aplicativo BolsaIusacell",corr,p);
		m.sendMail();
		
		return SUCCESS;
	}
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getCec() {
		return cec;
	}
	public void setCec(String cec) {
		this.cec = cec;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNivelAdmin() {
		return nivelAdmin;
	}
	public void setNivelAdmin(String nivel) {
		this.nivelAdmin = nivel;
	}


	public String getUbicacion() {
		return ubicacion;
	}


	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}


	public String getRegion() {
		return region;
	}


	public void setRegion(String region) {
		this.region = region;
	}

	public String getNombreAdmin() {
		return nombreAdmin;
	}

	public void setNombreAdmin(String nombreAdmin) {
		this.nombreAdmin = nombreAdmin;
	}

	public BigDecimal getLevelAdmin() {
		return levelAdmin;
	}

	public void setLevelAdmin(BigDecimal levelAdmin) {
		this.levelAdmin = levelAdmin;
	}

	public String getEmailAdmin() {
		return emailAdmin;
	}

	public void setEmailAdmin(String emailAdmin) {
		this.emailAdmin = emailAdmin;
	}

	public String getEstatus() {
		return estatus;
	}

	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}
	
}
